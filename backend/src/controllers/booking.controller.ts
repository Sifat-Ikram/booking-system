import { Request, Response } from "express";
import * as bookingService from "../services/booking.service";
import {
  createBookingSchema,
  getBookingsQuerySchema,
  getAvailableSlotsQuerySchema,
  deleteBookingParamsSchema,
} from "../utils/booking.validator";

// Get all bookings with optional query filters
export async function getAllBookings(req: Request, res: Response) {
  try {
    const { resource, date } = req.query;
    const query = getBookingsQuerySchema.parse(req.query);
    const bookings = await bookingService.getBookings(
      query.resource,
      query.date
    );
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
}

// Create a new booking
export async function createBooking(req: Request, res: Response) {
  try {
    const validatedData = createBookingSchema.parse(req.body);
    const booking = await bookingService.createBooking(validatedData);
    res.status(201).json(booking);
  } catch (err: any) {
    console.error("Error creating booking:", err);

    if (err.message.includes("conflict")) {
      return res.status(409).json({ error: err.message });
    }

    res.status(400).json({ error: err.message });
  }
}

//delete
export async function deleteBooking(req: Request, res: Response) {
  try {
    // Validate route params using Zod
    const { id } = deleteBookingParamsSchema.parse(req.params);
    const numericId = parseInt(id);

    const result = await bookingService.deleteBooking(numericId);
    res.status(200).json(result);
  } catch (error: any) {
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
export async function getAvailableSlots(req: Request, res: Response) {
  try {
    const { resource, date } = getAvailableSlotsQuerySchema.parse(req.query);

    const slots = await bookingService.getAvailableSlots(resource, date);
    return res.status(200).json(slots);
  } catch (error: any) {
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
