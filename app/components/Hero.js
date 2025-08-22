"use client";
import React, { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import AnimatedOverlayCarousel from "./AnimatedOverlayCarousel";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { GET_HERO_AND_STATS, graphQLClient, translateText } from "../lib/utils";

export default function Hero() {
  const labels = ["Life Insurance", "Car Insurance", "Education Savings"];
  const headingText = "We guarantee the future of the things you care about!";

  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const [cardata, setCardata] = useState({});
  const [lifedata, setlifedata] = useState({});
  const [healthdata, sethealthdata] = useState({});
  const [cardataposts, setCardataposts] = useState([]);
  const [lifedataposts, setLifedataposts] = useState([]);
  const [healthdataposts, setHealthdataposts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [translatedData, setTranslatedData] = useState({
    lifedata: {},
    cardata: {},
    healthdata: {},
    lifedataposts: [],
    cardataposts: [],
    healthdataposts: [],
  });
  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind "sm" breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get GraphQL Data
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await graphQLClient.request(GET_HERO_AND_STATS);
        data?.categories?.nodes?.forEach((category) => {
          if (category?.slug === "car-insurance") {
            setCardata(category?.posts.nodes[0]);
            setCardataposts(category?.posts.nodes);
          }
          if (category?.slug === "health-insurance") {
            sethealthdata(category.posts.nodes[0]);
            setHealthdataposts(category?.posts.nodes);
          }
          if (category?.slug === "life-insurance") {
            setlifedata(category.posts.nodes[0]);
            setLifedataposts(category?.posts.nodes);
          }
        });
      } catch (err) {
        console.error("GraphQL Error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const categoryNames = Object.keys(categoryData);
  const currentCategory = categoryNames[activeIndex];
  const [statsData, setStatsData] = useState([]);
  function handleAnimationComplete() {
    console.log("Animation finished");
  }
  async function translateText(text, targetLang) {
    if (!text || targetLang === "en") return text;
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json();
      return data.translatedText || text;
    } catch (err) {
      console.error("Translation error:", err);
      return text;
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % labels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [labels.length]);
  // ✅ Translate when language changes
  useEffect(() => {
    async function handleTranslation() {
      if (!lifedata?.title && !cardata?.title && !healthdata?.title) return;

      const translatedLife = {
        ...lifedata,
        title: await translateText(lifedata?.title, language),
      };
      const translatedCar = {
        ...cardata,
        title: await translateText(cardata?.title, language),
      };
      const translatedHealth = {
        ...healthdata,
        title: await translateText(healthdata?.title, language),
      };

      const translatedLifePosts = await Promise.all(
        lifedataposts.map(async (post) => ({
          ...post,
          title: await translateText(post.title, language),
        }))
      );
      const translatedCarPosts = await Promise.all(
        cardataposts.map(async (post) => ({
          ...post,
          title: await translateText(post.title, language),
        }))
      );
      const translatedHealthPosts = await Promise.all(
        healthdataposts.map(async (post) => ({
          ...post,
          title: await translateText(post.title, language),
        }))
      );
      const translatedLabels = await Promise.all(
        labels.map((label) => translateText(label, language))
      );

      const translatedHeading = await translateText(headingText, language);
      setTranslatedData({
        lifedata: translatedLife,
        cardata: translatedCar,
        healthdata: translatedHealth,
        lifedataposts: translatedLifePosts,
        cardataposts: translatedCarPosts,
        healthdataposts: translatedHealthPosts,
        labels: translatedLabels,
        heading: translatedHeading,
      });
    }

    handleTranslation();
  }, [language, lifedata, cardata, healthdata]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center py-20">
      {/* Hero Content Flex Wrapper */}
      <div className="relative  flex px-4 sm:px-6 lg:px-8 flex-col items-center gap-10  md:flex-row md:items-start">
        {/* Left Section - Text and Buttons */}
        <div className="w-full  max-w-lg text-center md:text-left">
          <div className="text-[50px] pn:max-sm:text-[40px] font-[Marcellus] dark:text-white font-semibold">
            {translatedData.heading || headingText}
          </div>

          <div className="mt-4  h-[30px]  dark:text-white text-gray-600">
            {activeIndex === 0
              ? translatedData?.lifedata?.title
              : activeIndex === 1
              ? translatedData?.cardata?.title
              : translatedData?.healthdata?.title}
          </div>

          <div className="mt-8  flex items-center justify-center gap-6 md:justify-start">
            <button className="flex h-16 w-16 items-center justify-center rounded-full dark:bg-[#191919] bg-[#f6f6f6] transition-transform duration-300 hover:scale-105 ">
              <CiPlay1 className="h-8 w-8 dark:text-white text-[#191919]" />
            </button>
          </div>

          <div className="mt-8 flex  flex-wrap justify-center gap-3 md:justify-start">
            {translatedData?.labels?.length > 0
              ? translatedData.labels.map((label, index) => (
                  <button
                    key={label}
                    className={`flex h-11 items-center font-[Marcellus] whitespace-nowrap rounded-full border px-5 font-semibold transition-all duration-300
                ${
                  activeIndex === index
                    ? "scale-105 dark:bg-[#191919] border-transparent bg-[#1f1f1f]  text-[#fff]"
                    : "border-transparent dark:bg-[#fff] bg-[#e5e5e5] text-gray-700 hover:bg-[#191919] hover:text-white hover:dark:text-black"
                }`}
                  >
                    {label}
                  </button>
                ))
              : labels.map((label, index) => (
                  <button
                    key={label}
                    className={`flex h-11 items-center font-[Marcellus] whitespace-nowrap rounded-full border px-5 font-semibold transition-all duration-300
                ${
                  activeIndex === index
                    ? "scale-105 dark:bg-[#191919] border-transparent bg-[#1f1f1f]  text-[#fff]"
                    : "border-transparent dark:bg-[#fff] bg-[#e5e5e5] text-gray-700 hover:bg-[#191919] hover:text-white hover:dark:text-black"
                }`}
                  >
                    {label}
                  </button>
                ))}
          </div>
        </div>

        <AnimatedOverlayCarousel />
      </div>
      {/* Stats Section */}
      <div className="relative py-6  z-10 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8 ">
        <div className="flex pn:max-md:h-[740px] overflow-hidden h-[320px] flex-col items-center justify-evenly sm:flex-row sm:flex-wrap gap-6">
          {isLoading ||
          !(
            (activeIndex === 0
              ? translatedData?.lifedataposts
              : activeIndex === 1
              ? translatedData?.cardataposts
              : translatedData?.healthdataposts) || []
          ).length
            ? // Loader fallback
              Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-black w-full sm:w-[48%] md:w-[31%]"
                >
                  <div className="aspect-video bg-gray-800 dark:bg-gray-200 w-full rounded-[6.9%]"></div>
                  <div className="flex flex-grow flex-col justify-between p-5">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            : // Posts
              (activeIndex === 0
                ? translatedData?.lifedataposts
                : activeIndex === 1
                ? translatedData?.cardataposts
                : translatedData?.healthdataposts
              )
                ?.slice(0, isMobile ? 2 : 3)
                ?.map((stat) => (
                  <Link
                    href={{
                      pathname: "/blog",
                      query: {
                        content: stat?.content,
                        title: stat?.title,
                        postid: stat?.id,
                        image: stat?.featuredImage?.node?.sourceUrl,
                      },
                    }}
                    key={stat?.title}
                    className="flex pn:max-sm:h-[500px] dark:text-white bg-white dark:bg-black flex-col overflow-hidden rounded-t-3xl group w-full sm:w-[48%] md:w-[31%]"
                  >
                    <div className="aspect-video  h-[29.5vh]  w-full">
                      <img
                        src={
                          stat?.featuredImage?.node?.sourceUrl ||
                          "/placeholder.png"
                        }
                        alt={stat?.title}
                        className="object-cover w-full h-[29.5vh] opacity-100 rounded-[6.9%]"
                      />
                    </div>
                    <div className="flex flex-grow flex-col dark:bg-[#171717]  bg-white rounded-3xl justify-between -mt-12 p-4">
                      <h3 className="text-[16px]  h-[50px] font-semibold dark:text-white text-gray-800">
                        {stat?.title}
                      </h3>
                      <div className="mt-3 flex items-center group-hover:ml-4 duration-200 group-hover:bg-[#191919] group-hover:text-white rounded-2xl py-2 px-4 justify-center w-fit text-gray-500">
                        <FaArrowRight className=" h-4 w-4" />
                        {/* <span>Read it!!</span> */}
                      </div>
                    </div>
                  </Link>
                ))}
        </div>
      </div>
    </div>
  );
}
