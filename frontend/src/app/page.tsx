"use client";
import { useState, useEffect, useCallback } from "react";
import { Booking } from "@/types/booking";
import Filters from "@/components/booking/Filters";
import BookingList from "@/components/booking/BookingList";
import useAxiosPublic from "@/lib/useAxiosPublic";
import WeeklyCalendar from "@/components/booking/WeeklyCalendar";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resourceFilter, setResourceFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const axiosPublic = useAxiosPublic();

  const fetchBookings = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (resourceFilter) params.resource = resourceFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await axiosPublic.get<Booking[]>("/", { params });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  }, [resourceFilter, dateFilter, axiosPublic]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <main className="w-4/5 mx-auto px-4 sm:px-6 lg:px-12 py-8">
      {/* Animated Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Booking Dashboard
      </motion.h1>

      {/* Filter and View Mode Buttons Row */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Filters
          resourceFilter={resourceFilter}
          setResourceFilter={setResourceFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <div className="flex items-center mt-2 md:mt-0 rounded-md overflow-hidden border border-blue-600">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 text-sm sm:text-base cursor-pointer transition-colors duration-300 ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 text-sm sm:text-base cursor-pointer transition-colors duration-300 ${
              viewMode === "calendar"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            Calendar View
          </button>
        </div>
      </motion.div>

      {/* Bookings View Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {viewMode === "list" ? (
          <BookingList bookings={bookings} />
        ) : (
          <WeeklyCalendar bookings={bookings} />
        )}
      </motion.div>
    </main>
  );
}
