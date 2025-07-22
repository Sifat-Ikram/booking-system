import React from "react";
import { Booking } from "@/types/booking";
import { format, isBefore, isWithinInterval } from "date-fns";
import { AiOutlineClockCircle } from "react-icons/ai";
interface BookingItemProps {
  booking: Booking;
}
const getStatus = (booking: Booking): "Upcoming" | "Ongoing" | "Past" => {
  const now = new Date();
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);
  if (isWithinInterval(now, { start, end })) return "Ongoing";
  if (isBefore(now, start)) return "Upcoming";
  return "Past";
};
const statusColors = {
  Upcoming: "bg-blue-100 text-blue-800",
  Ongoing: "bg-green-100 text-green-800",
  Past: "bg-gray-100 text-gray-600",
};
const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  const status = getStatus(booking);
  return (
    <li className="flex justify-between items-center border rounded-md p-3 shadow-sm hover:shadow-md transition">
      {" "}
      <div>
        {" "}
        <p className="font-semibold text-lg">{booking.requestedBy}</p>{" "}
        <p className="text-sm text-gray-600">
          {" "}
          <AiOutlineClockCircle className="inline mr-1 mb-1" />{" "}
          {format(new Date(booking.startTime), "PPpp")} -{" "}
          {format(new Date(booking.endTime), "PPpp")}{" "}
        </p>{" "}
      </div>{" "}
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
        aria-label={`Status: ${status}`}
      >
        {" "}
        {status}{" "}
      </span>{" "}
    </li>
  );
};


export default BookingItem;