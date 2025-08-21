"use client";
import React from "react";
import Bg from "../../../public/BGs.png";

const Banner = () => {
  return (
    <div
      className="relative flex items-center h-[50vh] min-h-[260px] max-h-[450px] mb-8 rounded-[30px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full px-[8%] py-[5%] text-white flex flex-col items-start justify-center">
        <h1 className="font-[Marcellus] font-bold mb-3 max-w-[800px] leading-tight text-shadow-lg text-[clamp(1.5rem,4vw,3rem)]">
          Efficient Rules to get best insurance
        </h1>
        <p className="text-[20px] max-w-[650px] mb-5 text-shadow">
          Whether you&apos;re looking for pet insurance, health insurance, or
          disability insurance, we&apos;ve got you covered.
        </p>
      </div>
    </div>
  );
};

export default Banner;
