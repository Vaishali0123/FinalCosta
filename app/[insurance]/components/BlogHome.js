import React from "react";
import { MdLocationOn, MdOutlinePets } from "react-icons/md";
import { FaCarBurst } from "react-icons/fa6";
import pet from "../../../public/dog.jpg";
import home from "../../../public/popularcard3.png";
import Life from "../../../public/lifes.jpg";

import Image from "next/image";
import Vitual from "../../../public/Vitual.png";
import { HiHomeModern } from "react-icons/hi2";
import { TbBrandCashapp } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa";

const Home = () => {
  return (
    <div className="relative ">
      <div
        style={{ backgroundImage: `url(${Vitual.src})` }}
        className="relative bg-cover bg-center overflow-hidden"
      >
        <div className="flex justify-around pn:max-md:scale-50 pl-[8%] pr-[8%] mt-[3%]">
          <div className="relative mt-[3%]">
            <div className=" h-[280px] w-[230px] bg-orange-300  rounded-[50px] overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={pet}
                alt="dog"
              />
            </div>
            <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-[200px] h-[60px] flex items-center justify-start px-4 bg-white rounded-[50px] backdrop-blur-md border border-[#E6E8EC] shadow-lg z-20">
              <div className="flex items-center gap-3">
                <div className="">
                  <MdOutlinePets className="text-orange-500 w-10 h-7" />
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold text-[#1C1C1E]">
                    Pet insurance
                  </h3>
                  <p className="text-xs text-gray-500">keep for friend safe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[5%] pl-[100px]">
            <div className="w-[220px] h-[80px] flex items-center justify-center px-4 bg-white rounded-[50px] backdrop-blur-md border border-[#E6E8EC] z-20">
              <div className="flex items-center gap-3">
                <div className="">
                  <FaCarBurst className="text-green-500 w-10 h-7" />
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold text-[#1C1C1E]">
                    Car insurance
                  </h3>
                  <p className="text-xs text-gray-500">secure every ride</p>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="relative">
              <div className=" h-[350px] w-[270px]  rounded-[50px] overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={home}
                  alt="carth"
                />
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] h-[90%] px-6 py-6 bg-white rounded-[30px] backdrop-blur-md border border-[#E6E8EC] shadow-md flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <HiHomeModern className="text-blue-500 w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1C1C1E] capitalize">
                      Home insurance
                    </h3>
                    <p className="text-sm text-gray-500 -mt-1">
                      selter that stayes
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-2">
                  <span>Best time :</span>&nbsp;
                  <b className="text-[#23262F]">when every</b>
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Home insurance protects your house and personal belongings
                  from risks like fire, theft, or natural disasters.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center pn:max-md:scale-50 justify-center gap-[10%]">
          <div className="w-fit h-[80px] flex items-center justify-center px-4 bg-white rounded-[50px] backdrop-blur-md border border-[#E6E8EC] shadow-lg z-20">
            <div className="flex items-center gap-3">
              <div className="">
                <TbBrandCashapp className="text-green-500 w-10 h-7" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold text-[#1C1C1E]">
                  Business Insurance
                </h3>
                <p className="text-xs text-gray-500">save memony</p>
              </div>
            </div>
          </div>

          <div className="relative mt-[3%]">
            <div className=" h-[250px] w-[250px]  rounded-[50px] overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={Life}
                alt="carth"
              />
            </div>
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[220px] h-[60px] flex items-center justify-center px-4 bg-white rounded-[50px] backdrop-blur-md border border-[#E6E8EC] shadow-lg z-20">
              <div className="flex items-center gap-3">
                <div className="">
                  <FaHandHoldingHeart className="text-red-500 w-10 h-7" />
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold text-[#1C1C1E]">
                    Life insurance
                  </h3>
                  <p className="text-xs text-gray-500">
                    save them that matters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 mt-8 transform -translate-x-1/2 -translate-y-[55%]">
        <h1 className="text-center text-[50px] font-[Marcellus] font-bold text-[#1C1C1E] ">
          your true
          <br />
          insurance guide
        </h1>
        <p className="text-center text-[16px] text-base text-gray-500 max-w-md mx-auto">
          Virtual tour is a powerful tool to help you explore and better
          understand the insurance services
        </p>
      </div>
    </div>
  );
};

export default Home;
