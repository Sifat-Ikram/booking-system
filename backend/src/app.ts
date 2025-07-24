import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/db";
import bookingRoutes from "./routes/booking.routes";
const allowedOrigins = [
  "https://booking-system-tau-umber.vercel.app",
  "http://localhost:3000",
];

dotenv.config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: false,
  })
);
app.use(express.json());

app.use("/api", bookingRoutes);

app.get("/health-check", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: result });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

export default app;
