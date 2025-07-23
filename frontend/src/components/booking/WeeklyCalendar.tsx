"use client";
import { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Booking } from "@/types/booking";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { motion } from "framer-motion";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

type Props = {
  bookings: Booking[];
};

const WeeklyCalendar = ({ bookings }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events: Event[] = bookings.map((b) => ({
    title: `${b.resource} — ${b.requestedBy}`,
    start: new Date(b.startTime),
    end: new Date(b.endTime),
    allDay: false,
  }));

  const isSameWeek = (date1: Date, date2: Date) => {
    const start1 = startOfWeek(date1, { weekStartsOn: 0 }).getTime();
    const start2 = startOfWeek(date2, { weekStartsOn: 0 }).getTime();
    return start1 === start2;
  };

  return (
    <>
      {/* Navigation Buttons */}
      <div className="flex items-center gap-4 mb-4">
        <button
          className="px-3 py-1 border rounded hover:bg-blue-700 hover:text-white transition bg-white text-blue-600"
          onClick={() => {
            const prevWeek = new Date(currentDate);
            prevWeek.setDate(prevWeek.getDate() - 7);
            setCurrentDate(prevWeek);
          }}
        >
          Previous Week
        </button>

        <button
          className={`px-3 py-1 border rounded hover:bg-blue-700 hover:text-white transition ${
            isSameWeek(currentDate, new Date())
              ? "bg-blue-700 text-white"
              : "bg-white text-blue-600"
          }`}
          onClick={() => setCurrentDate(new Date())}
        >
          This Week
        </button>

        <button
          className="px-3 py-1 border rounded hover:bg-blue-700 hover:text-white transition bg-white text-blue-600"
          onClick={() => {
            const nextWeek = new Date(currentDate);
            nextWeek.setDate(nextWeek.getDate() + 7);
            setCurrentDate(nextWeek);
          }}
        >
          Next Week
        </button>
      </div>

      <motion.div
        className="w-full mt-6 min-w-[800px] sm:min-w-full h-[600px] sm:h-[700px] overflow-x-auto rounded-lg shadow border border-gray-200 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="week"
          views={["week"]}
          step={15}
          timeslots={2}
          style={{ height: "100%" }}
          toolbar={false} // Hide default toolbar for custom nav
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          className="text-xs sm:text-sm"
        />
      </motion.div>
    </>
  );
};

export default WeeklyCalendar;
