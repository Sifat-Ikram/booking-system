import prisma from "../config/db";
import { isConflicting } from "../utils/conflictCheck";

export async function getBookings(resource?: string, date?: string) {
  const where: any = {};
  if (resource) where.resource = resource;
  if (date) {
    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);
    where.startTime = { lte: dayEnd };
    where.endTime = { gte: dayStart };
  }

  return prisma.booking.findMany({ where, orderBy: { startTime: "asc" } });
}

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
