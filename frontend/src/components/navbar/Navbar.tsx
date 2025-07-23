"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEventAvailable } from "react-icons/md";

const Navbar = () => {
    const router = useRouter();
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side - Title */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          <span className="hover:text-blue-200 transition duration-200">
            Resource Booking System
          </span>
        </Link>

        {/* Right Side - Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/booking")}
          className="flex items-center cursor-pointer gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
        >
          <MdEventAvailable className="text-lg" />
          <span>Book Now</span>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
