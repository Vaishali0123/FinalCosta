"use client";
import Image from "next/image";
import React from "react";
import pic from "../../../public/three.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="relative flex items-center justify-center h-[55vh] min-h-[300px] max-h-[600px] mb-8 rounded-[30px] overflow-hidden bg-cover bg-center bg-no-repeat px-[5%]"
      style={{ backgroundImage: "url(/images/Banner2.png)" }}
    >
      {/* Overlay image */}
      <Image
        alt="pic"
        src={pic}
        className="absolute inset-0 w-full h-full object-contain object-right z-[1]"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 flex flex-col items-start justify-start text-black">
        <h1 className="font-[Marcellus] font-bold mb-4 leading-tight w-[80%] text-[clamp(1.5rem,4vw,3rem)]">
          Find the Right Insurance with Confidence
        </h1>
        <p className="max-w-[600px] mb-6 text-[clamp(0.9rem,2vw,1.125rem)] leading-relaxed text-black text-shadow">
          From health to home to disability — get expert-backed guidance for
          every coverage you need.
        </p>
        <Link
          href="https://admin.costaricaninsurance.com/understanding-medical-insurance-a-comprehensive-guide/"
          target="_blank"
          className="bg-white text-purple-700 px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition text-[clamp(0.85rem,1.5vw,1rem)]"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Banner;
