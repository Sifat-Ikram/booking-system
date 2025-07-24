"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
// const allowedOrigin = "https://booking-system-tau-umber.vercel.app";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", booking_routes_1.default);
app.get("/health-check", async (req, res) => {
    try {
        const result = await db_1.default.$queryRaw `SELECT 1`;
        res.json({ status: "ok", db: result });
    }
    catch (err) {
        console.error("DB connection error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});
exports.default = app;
