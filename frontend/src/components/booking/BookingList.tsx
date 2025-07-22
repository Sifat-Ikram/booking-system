import React from "react";
import { Booking } from "@/types/booking";
import BookingItem from "./BookingItem";

interface BookingListProps {
  bookings: Booking[];
}

const groupByResource = (bookings: Booking[]) => {
  return bookings.reduce<Record<string, Booking[]>>((acc, booking) => {
    if (!acc[booking.resource]) acc[booking.resource] = [];
    acc[booking.resource].push(booking);
    return acc;
  }, {});
};

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const grouped = groupByResource(bookings);

  if (bookings.length === 0) {
    return <p className="text-center text-gray-500">No bookings found.</p>;
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([resource, resourceBookings]) => (
        <section key={resource}>
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">
            {resource}
          </h2>
          <ul className="space-y-3">
            {resourceBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default BookingList;
