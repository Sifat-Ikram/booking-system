"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 space-y-16 text-center">
      <Image
        src={
          "https://i.ibb.co/PGksfGWn/glitch-error-computer-page-anaglyph-glitch-banner-error-layout-effect-screen-glitch-error-computer-p.jpg"
        }
        alt="404 Not Found"
        width={400}
        height={300}
        className="mb-8"
      />
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
