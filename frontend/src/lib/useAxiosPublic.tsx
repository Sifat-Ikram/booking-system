"use client";
import axios from "axios";
import { useMemo } from "react";

const useAxiosPublic = () => {
  const axiosPublic = useMemo(() => {
    return axios.create({
      baseURL: "https://booking-system-backend-seven.vercel.app",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return axiosPublic;
};

export default useAxiosPublic;
