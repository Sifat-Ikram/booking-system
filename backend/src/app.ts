import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/booking.routes";
import prisma from "./config/db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

// Keep this only for development/testing purposes
app.get("/test-db", async (req, res) => {
  const bookings = await prisma.booking.findMany();
  res.json(bookings);
});

export default app;
