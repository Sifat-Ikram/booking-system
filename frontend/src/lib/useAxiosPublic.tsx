"use client";
import axios from "axios";
import { useMemo } from "react";

const useAxiosPublic = () => {
  const axiosPublic = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000/api/bookings",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return axiosPublic;
};

export default useAxiosPublic;
