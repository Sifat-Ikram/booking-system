import { z } from "zod";

// Helper: ISO datetime string validator
const isoDateTimeString = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid datetime format",
});

// Booking creation schema
export const createBookingSchema = z.object({
  resource: z.string().min(1, "Resource is required"),
  startTime: isoDateTimeString,
  endTime: isoDateTimeString,
  requestedBy: z.string().min(1, "Requested By is required"),
});

// Query params schema for GET /bookings
export const getBookingsQuerySchema = z.object({
  resource: z.string().optional(),
  date: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
});

// Query params schema for GET /available-slots
export const getAvailableSlotsQuerySchema = z.object({
  resource: z.string().min(1, "Resource is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

//delete
export const deleteBookingParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, {
    message: "Booking ID must be a numeric string.",
  }),
});
