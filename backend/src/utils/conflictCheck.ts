import { Booking } from "@prisma/client";

const BUFFER_MINUTES = 10;

function addMinutes(date: Date, mins: number): Date {
  return new Date(date.getTime() + mins * 60000);
}

function subtractMinutes(date: Date, mins: number): Date {
  return new Date(date.getTime() - mins * 60000);
}

export function isConflicting(
  newStart: Date,
  newEnd: Date,
  existingBookings: Booking[]
): boolean {
  for (const booking of existingBookings) {
    const bufferedStart = subtractMinutes(booking.startTime, BUFFER_MINUTES);
    const bufferedEnd = addMinutes(booking.endTime, BUFFER_MINUTES);

    // Check if new booking overlaps the buffered booking time
    const overlap = newStart < bufferedEnd && newEnd > bufferedStart;
    if (overlap) return true;
  }
  return false;
}
