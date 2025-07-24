"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = getBookings;
exports.createBooking = createBooking;
exports.deleteBooking = deleteBooking;
exports.getAvailableSlots = getAvailableSlots;
const db_1 = __importDefault(require("../config/db"));
const conflictCheck_1 = require("../utils/conflictCheck");
// Get all bookings with optional resource and date filtering
async function getBookings(resource, date) {
    const where = {};
    if (resource)
        where.resource = resource;
    if (date) {
        const dayStart = new Date(`${date}T00:00:00`);
        const dayEnd = new Date(`${date}T23:59:59`);
        // Find bookings that overlap any part of the day
        where.OR = [
            { startTime: { gte: dayStart, lte: dayEnd } },
            { endTime: { gte: dayStart, lte: dayEnd } },
            { AND: [{ startTime: { lte: dayStart } }, { endTime: { gte: dayEnd } }] },
        ];
    }
    return db_1.default.booking.findMany({ where, orderBy: { startTime: "asc" } });
}
// Create a booking with validation and conflict check
async function createBooking(data) {
    const { resource, startTime, endTime, requestedBy } = data;
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (end <= start) {
        throw new Error("End time must be after start time.");
    }
    const duration = (end.getTime() - start.getTime()) / (1000 * 60);
    if (duration < 15) {
        throw new Error("Booking must be at least 15 minutes.");
    }
    const existing = await db_1.default.booking.findMany({ where: { resource } });
    if ((0, conflictCheck_1.isConflicting)(start, end, existing)) {
        throw new Error("Time conflict with existing booking (including buffer).");
    }
    return db_1.default.booking.create({
        data: {
            resource,
            startTime: start,
            endTime: end,
            requestedBy,
        },
    });
}
// Delete booking by id
async function deleteBooking(id) {
    const booking = await db_1.default.booking.findUnique({ where: { id } });
    if (!booking) {
        throw new Error("Booking not found");
    }
    await db_1.default.booking.delete({ where: { id } });
    return { message: "Booking deleted successfully" };
}
// Get available slots with buffer and fixed slot length (30 min)
async function getAvailableSlots(resource, date) {
    const SLOT_MINUTES = 30;
    const MIN_SLOT_DURATION_MINUTES = 15;
    const startOfDay = new Date(`${date}T08:00:00`);
    const endOfDay = new Date(`${date}T18:00:00`);
    const existingBookings = await db_1.default.booking.findMany({
        where: {
            resource,
            startTime: { lt: endOfDay },
            endTime: { gt: startOfDay },
        },
    });
    const slots = [];
    let slotStart = new Date(startOfDay);
    while (true) {
        const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60 * 1000);
        if (slotEnd > endOfDay)
            break;
        if ((slotEnd.getTime() - slotStart.getTime()) / 60000 <
            MIN_SLOT_DURATION_MINUTES)
            break;
        const hasConflict = (0, conflictCheck_1.isConflicting)(slotStart, slotEnd, existingBookings);
        if (!hasConflict) {
            slots.push({
                startTime: slotStart.toISOString(),
                endTime: slotEnd.toISOString(),
            });
        }
        // Move to next slot
        slotStart = new Date(slotStart.getTime() + SLOT_MINUTES * 60 * 1000);
    }
    return slots;
}
