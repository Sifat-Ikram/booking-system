import { Request, Response } from "express";
import * as bookingService from "../services/booking.service";

export async function getAllBookings(req: Request, res: Response) {
  try {
    const { resource, date } = req.query;
    const bookings = await bookingService.getBookings(
      resource?.toString(),
      date?.toString()
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
}

export async function createBooking(req: Request, res: Response) {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
