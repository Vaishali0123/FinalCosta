"use client";
import React from "react";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import Trip from "../../../public/triptoinc.jpeg";

const FeaturedPost = () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-8 bg-white rounded-[30px] shadow-xl overflow-hidden h-auto md:h-[600px]">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
        <Image
          src={Trip}
          alt="Jeep parked by a lake"
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col justify-center">
        <span className="bg-[#23262F] text-white text-sm font-semibold px-6 py-2 rounded-full w-fit mb-4">
          Tips and Tricks
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] font-[marcellus] leading-snug">
          Your Short tirp <br /> to Know <br className="hidden md:block" />{" "}
          every insurance
        </h1>

        <p className="text-[#777E90] mt-4 md:mt-6 text-base md:text-[20px] max-w-md">
          Comprehensive insurance solutions designed to protect your life,
          health, home, travels, car, and loved ones — because your peace of
          mind deserves nothing less.
        </p>

        <button className="group mt-6 md:mt-10 bg-[#23C55E] text-white font-semibold py-3 px-6 rounded-full flex items-center transition hover:bg-[#1ea94f] w-fit">
          Read more
          <MdArrowForward className="ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedPost;
