import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
  getAvailableSlots,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", getAllBookings);
router.get("/slots", getAvailableSlots);
router.post("/", createBooking);
router.delete("/:id", deleteBooking);

export default router;
