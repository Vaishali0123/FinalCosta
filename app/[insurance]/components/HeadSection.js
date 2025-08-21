"use client";
import React from "react";
import Blogbg from "../../../public/blogbg.png"; // Import the Blogbg
import Image from "next/image";

const HeadSection = () => {
  return (
    <div className="w-full flex flex-wrap justify-between h-[90vh] items-center px-6 py-10 ">
      {/* Left Content */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 ">
        <div className="text-black">
          <div className="text-[48px] sm:text-[60px] font-[marcellus]  leading-tight font-bold font-inter mt-0  sm:mt-28 sm:ml-25 ml-0">
            Make better <br />
            life with insurance
          </div>
          <div className="text-[20px] sm:text-[28px] md:text-[32px] text-[#4B5563] mt-2 font-inter sm:ml-25 ml-0">
            learn how with our blogs
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex justify-center w-full lg:w-1/2">
        <div className="w-full max-w-[600px]">
          <Image
            src={Blogbg}
            alt="Blog Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
