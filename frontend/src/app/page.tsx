"use client";
import { useState, useEffect } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { Booking } from "@/types/booking";
import Filters from "@/components/booking/Filters";
import BookingList from "@/components/booking/BookingList";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resourceFilter, setResourceFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const fetchBookings = async () => {
    try {
      const params: any = {};
      if (resourceFilter) params.resource = resourceFilter;
      if (dateFilter) params.date = dateFilter;

      const res = await axiosPublic.get<Booking[]>("/", { params });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [resourceFilter, dateFilter]);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        Booking Dashboard
      </h1>

      <Filters
        resourceFilter={resourceFilter}
        setResourceFilter={setResourceFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <BookingList bookings={bookings} />
    </main>
  );
}
