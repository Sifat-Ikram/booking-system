"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConflicting = isConflicting;
const BUFFER_MINUTES = 10;
function addMinutes(date, mins) {
    return new Date(date.getTime() + mins * 60000);
}
function subtractMinutes(date, mins) {
    return new Date(date.getTime() - mins * 60000);
}
function isConflicting(newStart, newEnd, existingBookings) {
    for (const booking of existingBookings) {
        const bufferedStart = subtractMinutes(booking.startTime, BUFFER_MINUTES);
        const bufferedEnd = addMinutes(booking.endTime, BUFFER_MINUTES);
        // Check if new booking overlaps the buffered booking time
        const overlap = newStart < bufferedEnd && newEnd > bufferedStart;
        if (overlap)
            return true;
    }
    return false;
}
