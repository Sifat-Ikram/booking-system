"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = getAllBookings;
exports.createBooking = createBooking;
exports.deleteBooking = deleteBooking;
exports.getAvailableSlots = getAvailableSlots;
const bookingService = __importStar(require("../services/booking.service"));
const booking_validator_1 = require("../utils/booking.validator");
// Get all bookings with optional query filters
async function getAllBookings(req, res) {
    try {
        const query = booking_validator_1.getBookingsQuerySchema.parse(req.query);
        const bookings = await bookingService.getBookings(query.resource, query.date);
        res.json(bookings);
    }
    catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: "Failed to fetch bookings." });
    }
}
// Create a new booking
async function createBooking(req, res) {
    try {
        const validatedData = booking_validator_1.createBookingSchema.parse(req.body);
        const booking = await bookingService.createBooking(validatedData);
        res.status(201).json(booking);
    }
    catch (err) {
        console.error("Error creating booking:", err);
        if (err.message.includes("conflict")) {
            return res.status(409).json({ error: err.message });
        }
        res.status(400).json({ error: err.message });
    }
}
//delete
async function deleteBooking(req, res) {
    try {
        // Validate route params using Zod
        const { id } = booking_validator_1.deleteBookingParamsSchema.parse(req.params);
        const numericId = parseInt(id);
        const result = await bookingService.deleteBooking(numericId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ errors: error.errors });
        }
        if (error.message === "Booking not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// Get available slots for a resource on a specific date
async function getAvailableSlots(req, res) {
    try {
        const { resource, date } = booking_validator_1.getAvailableSlotsQuerySchema.parse(req.query);
        const slots = await bookingService.getAvailableSlots(resource, date);
        return res.status(200).json(slots);
    }
    catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Invalid query parameters.",
                errors: error.errors,
            });
        }
        console.error("Error getting available slots:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
