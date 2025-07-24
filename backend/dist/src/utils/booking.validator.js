"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingParamsSchema = exports.getAvailableSlotsQuerySchema = exports.getBookingsQuerySchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
// Helper: ISO datetime string validator
const isoDateTimeString = zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid datetime format",
});
// Booking creation schema
exports.createBookingSchema = zod_1.z.object({
    resource: zod_1.z.string().min(1, "Resource is required"),
    startTime: isoDateTimeString,
    endTime: isoDateTimeString,
    requestedBy: zod_1.z.string().min(1, "Requested By is required"),
});
// Query params schema for GET /bookings
exports.getBookingsQuerySchema = zod_1.z.object({
    resource: zod_1.z.string().optional(),
    date: zod_1.z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});
// Query params schema for GET /available-slots
exports.getAvailableSlotsQuerySchema = zod_1.z.object({
    resource: zod_1.z.string().min(1, "Resource is required"),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});
//delete
exports.deleteBookingParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, {
        message: "Booking ID must be a numeric string.",
    }),
});
