import prisma from "../config/db";
import { isConflicting } from "../utils/conflictCheck";

// Get all bookings with optional resource and date filtering
export async function getBookings(resource?: string, date?: string) {
  const where: any = {};

  if (resource) where.resource = resource;

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

  return prisma.booking.findMany({ where, orderBy: { startTime: "asc" } });
}

// Create a booking with validation and conflict check
export async function createBooking(data: {
  resource: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
}) {
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

  const existing = await prisma.booking.findMany({ where: { resource } });

  if (isConflicting(start, end, existing)) {
    throw new Error("Time conflict with existing booking (including buffer).");
  }

  return prisma.booking.create({
    data: {
      resource,
      startTime: start,
      endTime: end,
      requestedBy,
    },
  });
}

// Delete booking by id
export async function deleteBooking(id: number) {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    throw new Error("Booking not found");
  }

  await prisma.booking.delete({ where: { id } });

  return { message: "Booking deleted successfully" };
}

// Get available slots with buffer and fixed slot length (30 min)
export async function getAvailableSlots(resource: string, date: string) {
  const SLOT_MINUTES = 30;
  const BUFFER_MINUTES = 10;

  const startOfDay = new Date(`${date}T08:00:00`);
  const endOfDay = new Date(`${date}T18:00:00`);

  const existingBookings = await prisma.booking.findMany({
    where: {
      resource,
      startTime: { lt: endOfDay },
      endTime: { gt: startOfDay },
    },
  });

  const slots = [];
  let slotStart = new Date(startOfDay);

  while (slotStart < endOfDay) {
    const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60 * 1000);

    if (slotEnd > endOfDay) break;

    const hasConflict = isConflicting(slotStart, slotEnd, existingBookings);

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
