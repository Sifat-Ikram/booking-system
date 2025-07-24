import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
  getAvailableSlots,
} from "../controllers/booking.controller";

const router = Router();

router.get("/get", getAllBookings);
router.get("/slots", getAvailableSlots);
router.post("/create", createBooking);
router.delete("/:id", deleteBooking);

export default router;
