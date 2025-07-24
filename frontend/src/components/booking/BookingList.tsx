import { motion } from "framer-motion";
import { Booking } from "@/types/booking";
import BookingItem from "./BookingItem";

interface BookingListProps {
  bookings: Booking[];
  onDelete: (id: string) => void;
}

const groupByResource = (bookings: Booking[]) => {
  return bookings.reduce<Record<string, Booking[]>>((acc, booking) => {
    if (!acc[booking.resource]) acc[booking.resource] = [];
    acc[booking.resource].push(booking);
    return acc;
  }, {});
};

const BookingList: React.FC<BookingListProps> = ({ bookings, onDelete }) => {
  const grouped = groupByResource(bookings);

  if (bookings.length === 0) {
    return <p className="text-center text-gray-500">No bookings found.</p>;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-10 px-4 sm:px-6 lg:px-0">
      {Object.entries(grouped).map(([resource, resourceBookings]) => (
        <motion.section
          key={resource}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-5 border-b border-gray-300 pb-2 text-gray-900">
            {resource}
          </h2>
          <ul className="space-y-4">
            {resourceBookings
              .sort(
                (a, b) =>
                  new Date(a.startTime).getTime() -
                  new Date(b.startTime).getTime()
              )
              .map((booking) => (
                <BookingItem key={booking.id} booking={booking} onDelete={onDelete} />
              ))}
          </ul>
        </motion.section>
      ))}
    </div>
  );
};

export default BookingList;
