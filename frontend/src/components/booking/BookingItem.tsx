"use client";
import React from "react";
import { Booking } from "@/types/booking";
import { format, isBefore, isWithinInterval } from "date-fns";
import { AiOutlineClockCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "@/lib/useAxiosPublic";
import { MdDelete } from "react-icons/md";

interface BookingItemProps {
  booking: Booking;
  onDelete: (id: string) => void;
}

const getStatus = (booking: Booking): "Upcoming" | "Ongoing" | "Past" => {
  const now = new Date();
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);
  if (isWithinInterval(now, { start, end })) return "Ongoing";
  if (isBefore(now, start)) return "Upcoming";
  return "Past";
};

const BookingItem: React.FC<BookingItemProps> = ({ booking, onDelete }) => {
  const status = getStatus(booking);
  const axiosPublic = useAxiosPublic();

  const handleDeleteClick = async (item: Booking) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/api/${item.id}`);
        onDelete(item.id);
        Swal.fire("Deleted!", "Booking has been deleted.", "success");
      } catch {
        Swal.fire("Error", "Failed to delete booking.", "error");
      }
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300 mb-4 ${
        status === "Ongoing"
          ? "border-green-500 bg-green-50"
          : "border-gray-300 bg-white"
      }`}
      aria-label={`Booking by ${booking.requestedBy}, status ${status}`}
    >
      <div className="mb-3 sm:mb-0">
        <p className="font-semibold text-lg text-gray-900">
          {booking.requestedBy}
        </p>
        <p
          className="text-sm text-gray-600 flex items-center mt-1"
          title={`${booking.startTime} – ${booking.endTime}`}
        >
          <AiOutlineClockCircle className="inline mr-2 text-blue-500" />
          {format(new Date(booking.startTime), "PPpp")} –{" "}
          {format(new Date(booking.endTime), "PPpp")}
        </p>
      </div>
      <button
        onClick={() => handleDeleteClick(booking)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        aria-label="Delete booking"
      >
        <MdDelete size={18} className="cursor-pointer" />
      </button>
      <span
        className={`inline-block px-5 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
          status === "Upcoming"
            ? "bg-blue-200 text-blue-800"
            : status === "Ongoing"
            ? "bg-green-200 text-green-900"
            : "bg-gray-200 text-gray-700"
        }`}
        aria-label={`Status: ${status}`}
      >
        {status}
      </span>
    </motion.li>
  );
};

export default BookingItem;
