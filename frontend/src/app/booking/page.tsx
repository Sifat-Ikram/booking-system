"use client";

import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaClock, FaUser, FaToolbox } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosPublic from "@/lib/useAxiosPublic";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

type BookingFormInputs = {
  resource: string;
  date: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
};

const resources = [
  "Room-A",
  "Room-B",
  "Room-C",
  "Projector",
  "Laptop",
  "Device-A",
];

export default function BookingFormPage() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BookingFormInputs>();

  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [availableSlots, setAvailableSlots] = useState<
    { startTime: string; endTime: string }[]
  >([]);

  const watchedResource = useWatch({ control, name: "resource" });
  const watchedDate = useWatch({ control, name: "date" });

  useEffect(() => {
    if (watchedResource && watchedDate) {
      axiosPublic
        .get("/slots", {
          params: { resource: watchedResource, date: watchedDate },
        })
        .then((res) => setAvailableSlots(res.data))
        .catch(() => setAvailableSlots([]));
    } else {
      setAvailableSlots([]);
    }
  }, [watchedResource, watchedDate, axiosPublic]);

  const onSubmit = async (data: BookingFormInputs) => {
    setLoading(true);

    try {
      const parseDateTime = (date: string, time: string) => {
        const dateTimeStr = `${date} ${time}`;
        const dt = new Date(dateTimeStr);
        if (isNaN(dt.getTime())) {
          throw new Error("Invalid date/time");
        }
        return dt.toISOString();
      };

      const startTimeISO = parseDateTime(data.date, data.startTime);
      const endTimeISO = parseDateTime(data.date, data.endTime);

      if (new Date(endTimeISO) <= new Date(startTimeISO)) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Invalid Time",
          text: "End time must be after start time.",
        });
      }

      const durationMs =
        new Date(endTimeISO).getTime() - new Date(startTimeISO).getTime();

      if (durationMs < 15 * 60 * 1000) {
        setLoading(false);
        return Swal.fire({
          icon: "warning",
          title: "Duration Too Short",
          text: "Booking duration must be at least 15 minutes.",
        });
      }

      if (durationMs > 2 * 60 * 60 * 1000) {
        setLoading(false);
        return Swal.fire({
          icon: "warning",
          title: "Duration Too Long",
          text: "Booking duration cannot exceed 2 hours.",
        });
      }
      await axiosPublic.post("/", {
        resource: data.resource,
        startTime: startTimeISO,
        endTime: endTimeISO,
        requestedBy: data.requestedBy,
      });

      reset();
      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Your booking has been saved.",
      });
    } catch (err: unknown) {
      let errorMessage = "Something went wrong.";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.error || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl border border-gray-200"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <FaToolbox className="text-blue-600" /> Book a Resource
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Resource Select */}
        <div>
          <label
            htmlFor="resource"
            className="font-medium mb-1 text-gray-700 flex items-center gap-2"
          >
            <FaToolbox className="text-gray-500" /> Resource
          </label>
          <select
            id="resource"
            {...register("resource", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select resource</option>
            {resources.map((r) => (
              <option key={r} value={r}>
                {r.replace(/-/g, " ")}
              </option>
            ))}
          </select>
          {errors.resource && (
            <p className="text-red-500 text-sm mt-1">Resource is required</p>
          )}
        </div>

        {/* Date Input */}
        <div>
          <label
            htmlFor="date"
            className="font-medium mb-1 text-gray-700 flex items-center gap-2"
          >
            <FaClock className="text-gray-500" /> Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">Date is required</p>
          )}
        </div>

        {/* Start Time Select */}
        <div>
          <label
            htmlFor="startTime"
            className="font-medium mb-1 text-gray-700 flex items-center gap-2"
          >
            <FaClock className="text-gray-500" /> Start Time
          </label>
          <select
            id="startTime"
            {...register("startTime", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {watchedResource && watchedDate ? (
              <>
                <option value="">Select start time</option>
                {availableSlots.map(({ startTime }) => {
                  const timeOnly = new Date(startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <option key={startTime} value={timeOnly}>
                      {timeOnly}
                    </option>
                  );
                })}
              </>
            ) : (
              <option>Select resource and date first</option>
            )}
          </select>

          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">Start time is required</p>
          )}
        </div>

        {/* End Time Select */}
        <div>
          <label
            htmlFor="endTime"
            className="font-medium mb-1 text-gray-700 flex items-center gap-2"
          >
            <FaClock className="text-gray-500" /> End Time
          </label>
          <select
            id="endTime"
            {...register("endTime", { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select end time</option>
            {availableSlots.map(({ endTime }) => {
              const timeOnly = new Date(endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <option key={endTime} value={timeOnly}>
                  {timeOnly}
                </option>
              );
            })}
          </select>
          {errors.endTime && (
            <p className="text-red-500 text-sm mt-1">End time is required</p>
          )}
        </div>

        {/* Requested By Input */}
        <div>
          <label
            htmlFor="requestedBy"
            className="font-medium mb-1 text-gray-700 flex items-center gap-2"
          >
            <FaUser className="text-gray-500" /> Requested By
          </label>
          <input
            id="requestedBy"
            type="text"
            {...register("requestedBy", { required: true })}
            placeholder="Your name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.requestedBy && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Submitting..." : "Book Now"}
        </motion.button>
      </form>
    </motion.div>
  );
}
