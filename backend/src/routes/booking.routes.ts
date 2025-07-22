import { Router } from "express";
import { createBooking, getAllBookings } from "../controllers/booking.controller";

const router = Router();

router.get("/", getAllBookings);
router.post("/", createBooking);

export default router;
