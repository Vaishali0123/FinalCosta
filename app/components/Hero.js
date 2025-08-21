// "use client";
// import React, { useEffect, useState } from "react";
// import { Play, ArrowRight } from "lucide-react";
// import { GraphQLClient, gql } from "graphql-request";
// import { CiPlay1 } from "react-icons/ci";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// // ===== GraphQL Client =====
// const graphQLClient = new GraphQLClient(
//   "https://admin.costaricaninsurance.com/graphql",
//   {
//     headers: { "Content-Type": "application/json" },
//   }
// );

// // ===== GraphQL Query =====
// const GET_HERO_AND_STATS = gql`
//   query GetAllCategoriesWithPosts {
//     categories(first: 100) {
//       nodes {
//         id
//         name
//         slug
//         posts(first: 10) {
//           nodes {
//             id
//             title
//             content
//             featuredImage {
//               node {
//                 sourceUrl
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// // ===== Helper: Call our Translation API =====
// async function translateText(text, targetLang) {
//   if (!text) return text;
//   try {
//     const res = await fetch("/api/translate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text, targetLang }),
//     });
//     if (!res.ok) throw new Error("Translation failed");
//     const data = await res.json();
//     return data.translatedText || text;
//   } catch (err) {
//     console.error("Translation error:", err);
//     return text; // fallback
//   }
// }

// export default function HeroSection() {
//   const languages = [
//     { code: "en", label: "English", flag: "🇺🇸" },
//     { code: "hi", label: "हिंदी", flag: "🇮🇳" },
//     { code: "es", label: "Español", flag: "🇪🇸" },
//     { code: "fr", label: "Français", flag: "🇫🇷" },
//     { code: "de", label: "Deutsch", flag: "🇩🇪" },
//     { code: "zh", label: "中文", flag: "🇨🇳" },
//     { code: "ar", label: "العربية", flag: "🇸🇦" },
//     { code: "ru", label: "Русский", flag: "🇷🇺" },
//     { code: "ja", label: "日本語", flag: "🇯🇵" },
//     { code: "ko", label: "한국어", flag: "🇰🇷" },
//     { code: "pt", label: "Português", flag: "🇵🇹" },
//     { code: "it", label: "Italiano", flag: "🇮🇹" },
//     { code: "tr", label: "Türkçe", flag: "🇹🇷" },
//   ];
//   const labels = ["Life Insurance", "Car Insurance", "Education Savings"];
//   const [language, setLanguage] = useState("en"); // default English

//   const [cardata, setCardata] = useState({});
//   const [lifedata, setLifedata] = useState({});
//   const [healthdata, setHealthdata] = useState({});
//   const [cardataposts, setCardataposts] = useState([]);
//   const [lifedataposts, setLifedataposts] = useState([]);
//   const [healthdataposts, setHealthdataposts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Detect mobile screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Fetch GraphQL Data
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await graphQLClient.request(GET_HERO_AND_STATS);

//         data?.categories?.nodes?.forEach((category) => {
//           if (category?.slug === "car-insurance") {
//             setCardata(category?.posts.nodes[0]);
//             setCardataposts(category?.posts.nodes);
//           }
//           if (category?.slug === "health-insurance") {
//             setHealthdata(category.posts.nodes[0]);
//             setHealthdataposts(category?.posts.nodes);
//           }
//           if (category?.slug === "life-insurance") {
//             setLifedata(category.posts.nodes[0]);
//             setLifedataposts(category?.posts.nodes);
//           }
//         });
//       } catch (err) {
//         console.error("GraphQL Error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   // Auto rotate between categories
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % labels.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [labels.length]);

//   // ===== When language changes → translate all dynamic fields =====
//   useEffect(() => {
//     if (language === "en") return; // skip if English
//     async function translateAll() {
//       const translatePosts = async (posts) => {
//         return Promise.all(
//           posts.map(async (p) => ({
//             ...p,
//             title: await translateText(p.title, language),
//             content: await translateText(p.content, language),
//           }))
//         );
//       };

//       setCardata({
//         ...cardata,
//         title: await translateText(cardata?.title, language),
//       });
//       setLifedata({
//         ...lifedata,
//         title: await translateText(lifedata?.title, language),
//       });
//       setHealthdata({
//         ...healthdata,
//         title: await translateText(healthdata?.title, language),
//       });

//       setCardataposts(await translatePosts(cardataposts));
//       setLifedataposts(await translatePosts(lifedataposts));
//       setHealthdataposts(await translatePosts(healthdataposts));
//     }
//     translateAll();
//   }, [language]);
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   const params = useSearchParams();

//   const currentLang = params.get("lang") || "en";

//   const switchLang = (lang) => {
//     const currentUrl = new URL(window.location.href);
//     currentUrl.searchParams.set("lang", lang);
//     router.push(currentUrl.toString());
//     setOpen(false);
//   };
//   return (
//     <div className="relative w-full h-full flex flex-col items-center justify-center py-20">
//       {/* ===== Language Switcher ===== */}
//       <div className="absolute top-4 right-6 flex gap-2">
//         <button
//           onClick={() => setOpen(!open)}
//           className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition"
//         >
//           🌐 {languages.find((l) => l.code === currentLang)?.flag}{" "}
//           {languages.find((l) => l.code === currentLang)?.label ||
//             "Select Language"}
//         </button>

//         {/* Dropdown */}
//         {open && (
//           <div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg border z-50 overflow-hidden animate-fadeIn">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => (switchLang(lang.code), setLanguage(lang.code))}
//                 className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition ${
//                   currentLang === lang.code
//                     ? "bg-orange-100 font-semibold text-orange-700"
//                     : "text-gray-700"
//                 }`}
//               >
//                 <span>{lang.flag}</span> {lang.label}
//               </button>
//             ))}
//           </div>
//         )}
//         <button
//           onClick={() => setLanguage("en")}
//           className={`px-3 py-1 rounded-full border ${
//             language === "en" ? "bg-black text-white" : "bg-gray-200"
//           }`}
//         >
//           EN
//         </button>
//         <button
//           onClick={() => setLanguage("hi")}
//           className={`px-3 py-1 rounded-full border ${
//             language === "hi" ? "bg-black text-white" : "bg-gray-200"
//           }`}
//         >
//           हिंदी
//         </button>
//         <button
//           onClick={() => setLanguage("es")}
//           className={`px-3 py-1 rounded-full border ${
//             language === "es" ? "bg-black text-white" : "bg-gray-200"
//           }`}
//         >
//           ES
//         </button>
//       </div>

//       {/* ===== Hero Section ===== */}
//       <div className="relative flex px-4 sm:px-6 lg:px-8 flex-col items-center gap-10 md:flex-row md:items-start">
//         <div className="w-full max-w-lg text-center md:text-left">
//           <div className="mt-4 text-gray-600 text-2xl font-bold">
//             {activeIndex === 0
//               ? lifedata?.title
//               : activeIndex === 1
//               ? cardata?.title
//               : healthdata?.title}
//           </div>

//           <div className="mt-8 flex items-center justify-center gap-6 md:justify-start">
//             <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f6f6] hover:scale-105 transition">
//               <CiPlay1 className="h-8 w-8 text-[#191919]" />
//             </button>
//           </div>

//           <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
//             {labels.map((label, index) => (
//               <button
//                 key={label}
//                 className={`flex h-11 items-center rounded-full border px-5 font-semibold transition-all ${
//                   activeIndex === index
//                     ? "border-black text-black"
//                     : "bg-gray-200 text-gray-700 hover:bg-black hover:text-white"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ===== Stats Section ===== */}
//       <div className="relative py-6 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
//         <div className="flex h-[320px] flex-col items-center justify-evenly sm:flex-row sm:flex-wrap gap-6">
//           {isLoading
//             ? Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="animate-pulse flex flex-col overflow-hidden rounded-2xl bg-white w-full sm:w-[48%] md:w-[31%]"
//                 >
//                   <div className="aspect-video bg-gray-300"></div>
//                   <div className="p-5">
//                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                   </div>
//                 </div>
//               ))
//             : (activeIndex === 0
//                 ? lifedataposts
//                 : activeIndex === 1
//                 ? cardataposts
//                 : healthdataposts
//               )
//                 ?.slice(0, isMobile ? 2 : 3)
//                 ?.map((stat) => (
//                   <Link
//                     key={stat?.id}
//                     href={{
//                       pathname: "/blog",
//                       query: {
//                         content: stat?.content,
//                         title: stat?.title,
//                         postid: stat?.id,
//                         image: stat?.featuredImage?.node?.sourceUrl,
//                       },
//                     }}
//                     className="flex bg-white flex-col overflow-hidden rounded-3xl group w-full sm:w-[48%] md:w-[31%]"
//                   >
//                     <div className="aspect-video w-full">
//                       <img
//                         src={
//                           stat?.featuredImage?.node?.sourceUrl ||
//                           "/placeholder.png"
//                         }
//                         alt={stat?.title}
//                         className="object-cover w-full h-[29.5vh] rounded-[6.9%]"
//                       />
//                     </div>
//                     <div className="flex flex-grow flex-col bg-white rounded-3xl justify-between -mt-12 p-4">
//                       <h3 className="text-[16px] font-semibold text-gray-800">
//                         {stat?.title}
//                       </h3>
//                       <div className="mt-3 flex items-center group-hover:ml-4 duration-200 group-hover:bg-black group-hover:text-white rounded-2xl py-2 px-2 justify-center w-fit text-gray-500">
//                         <ArrowRight className="mr-2 h-4 w-4" />
//                         <span>Read more</span>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
// import { Play, ArrowRight } from "lucide-react";
// import BlurText from "./BlurText";
import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-request";
import { CiPlay1 } from "react-icons/ci";
import AnimatedOverlayCarousel from "./AnimatedOverlayCarousel";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { GET_HERO_AND_STATS, graphQLClient, translateText } from "../lib/utils";
// const graphQLClient = new GraphQLClient(
//   "https://admin.costaricaninsurance.com/graphql",
//   {
//     headers: { "Content-Type": "application/json" },
//   }
// );

// const GET_HERO_AND_STATS = gql`
//   query GetAllCategoriesWithPosts {
//     categories(first: 100) {
//       nodes {
//         id
//         name
//         slug
//         posts(first: 10) {
//           nodes {
//             id
//             title
//             content
//             featuredImage {
//               node {
//                 sourceUrl
//               }
//             }
//           }
//         }
//         children {
//           nodes {
//             id
//             name
//             slug
//             posts(first: 10) {
//               nodes {
//                 id
//                 title
//                 content
//                 featuredImage {
//                   node {
//                     sourceUrl
//                   }
//                 }
//               }
//             }
//             children {
//               nodes {
//                 id
//                 name
//                 slug
//                 posts(first: 10) {
//                   nodes {
//                     id
//                     title
//                     content
//                     featuredImage {
//                       node {
//                         sourceUrl
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
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
          <div className="text-[50px] font-[Marcellus] dark:text-white font-semibold">
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
              <CiPlay1 className="h-8 w-8 text-[#191919]" />
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
                    ? "scale-105 dark:bg-[#191919] border-transparent bg-[#191919] bg-transparent text-[#fff]"
                    : "border-transparent dark:bg-[#fff] bg-[#f6f6f6] text-gray-700 hover:bg-[#191919] hover:text-white"
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
                    ? "scale-105 dark:bg-[#191919] border-transparent bg-[#191919] bg-transparent text-[#fff]"
                    : "border-transparent dark:bg-[#fff] bg-[#f6f6f6] text-gray-700 hover:bg-[#191919] hover:text-white"
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
      <div className="relative py-6 pn:max-sm:hidden z-10 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8 ">
        <div className="flex pn:max-md:h-[700px] overflow-hidden h-[320px] flex-col items-center justify-evenly sm:flex-row sm:flex-wrap gap-6">
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
                  className="animate-pulse flex flex-col overflow-hidden rounded-2xl bg-white w-full sm:w-[48%] md:w-[31%]"
                >
                  <div className="aspect-video bg-gray-800 w-full rounded-[6.9%]"></div>
                  <div className="flex flex-grow flex-col justify-between p-5">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
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
                    className="flex pn:max-sm:h-[500px] bg-white flex-col overflow-hidden rounded-t-3xl group w-full sm:w-[48%] md:w-[31%]"
                  >
                    <div className="aspect-video  h-[29.5vh] bg-red-800 w-full">
                      <img
                        src={
                          stat?.featuredImage?.node?.sourceUrl ||
                          "/placeholder.png"
                        }
                        alt={stat?.title}
                        className="object-cover w-full h-[29.5vh] opacity-100 rounded-[6.9%]"
                      />
                    </div>
                    <div className="flex flex-grow flex-col bg-white rounded-3xl justify-between -mt-12 p-4">
                      <h3 className="text-[16px]  h-[50px] font-semibold text-gray-800">
                        {stat?.title}
                      </h3>
                      <div className="mt-3 flex items-center group-hover:ml-4 duration-200 group-hover:bg-[#191919] group-hover:text-white rounded-2xl py-2 px-4 justify-center w-fit text-gray-500">
                        <FaArrowRight className=" h-4 w-4" />
                        <span>Read it!!</span>
                      </div>
                    </div>
                  </Link>
                ))}
        </div>
      </div>
    </div>
  );
}
// "use client";
// import React, { act, useEffect, useState } from "react";
// import { Play, ArrowRight } from "lucide-react";

// import { GraphQLClient } from "graphql-request";
// import { gql } from "graphql-request";
// import { CiPlay1 } from "react-icons/ci";

// import Link from "next/link";
// import { useLanguage } from "../context/LanguageContext";
// const graphQLClient = new GraphQLClient(
//   "https://admin.costaricaninsurance.com/graphql",
//   {
//     headers: { "Content-Type": "application/json" },
//   }
// );

// const GET_HERO_AND_STATS = gql`
//   query GetAllCategoriesWithPosts {
//     categories(first: 100) {
//       nodes {
//         id
//         name
//         slug
//         posts(first: 10) {
//           nodes {
//             id
//             title
//             content
//             featuredImage {
//               node {
//                 sourceUrl
//               }
//             }
//           }
//         }
//         children {
//           nodes {
//             id
//             name
//             slug
//             posts(first: 10) {
//               nodes {
//                 id
//                 title
//                 content
//                 featuredImage {
//                   node {
//                     sourceUrl
//                   }
//                 }
//               }
//             }
//             children {
//               nodes {
//                 id
//                 name
//                 slug
//                 posts(first: 10) {
//                   nodes {
//                     id
//                     title
//                     content
//                     featuredImage {
//                       node {
//                         sourceUrl
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// export default function HeroSection() {
//   const labels = ["Life Insurance", "Car Insurance", "Education Savings"];
//   const [categoryPosts, setCategoryPosts] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const { language } = useLanguage();
//   const [cardata, setCardata] = useState({});
//   const [lifedata, setlifedata] = useState({});
//   const [healthdata, sethealthdata] = useState({});
//   const [cardataposts, setCardataposts] = useState([]);
//   const [lifedataposts, setLifedataposts] = useState([]);
//   const [healthdataposts, setHealthdataposts] = useState([]);
//   const [translatedData, setTranslatedData] = useState({
//     lifedata: {},
//     cardata: {},
//     healthdata: {},
//     lifedataposts: [],
//     cardataposts: [],
//     healthdataposts: [],
//   });
//   const categoryMappings = {
//     "Life Insurance": "health-insurance", // Based on your data structure
//     "Car Insurance": "car-insurance",
//     "Home Insurance": "home-insurance",
//   };
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect mobile screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640); // Tailwind "sm" breakpoint
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   async function translateText(text, targetLang) {
//     if (!text || targetLang === "en") return text;
//     try {
//       const res = await fetch("/api/translate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text, targetLang }),
//       });
//       const data = await res.json();
//       return data.translatedText || text;
//     } catch (err) {
//       console.error("Translation error:", err);
//       return text;
//     }
//   }

//   // ✅ Translate when language changes
//   useEffect(() => {
//     async function handleTranslation() {
//       if (!lifedata?.title && !cardata?.title && !healthdata?.title) return;

//       const translatedLife = {
//         ...lifedata,
//         title: await translateText(lifedata?.title, language),
//       };
//       const translatedCar = {
//         ...cardata,
//         title: await translateText(cardata?.title, language),
//       };
//       const translatedHealth = {
//         ...healthdata,
//         title: await translateText(healthdata?.title, language),
//       };

//       const translatedLifePosts = await Promise.all(
//         lifedataposts.map(async (post) => ({
//           ...post,
//           title: await translateText(post.title, language),
//         }))
//       );
//       const translatedCarPosts = await Promise.all(
//         cardataposts.map(async (post) => ({
//           ...post,
//           title: await translateText(post.title, language),
//         }))
//       );
//       const translatedHealthPosts = await Promise.all(
//         healthdataposts.map(async (post) => ({
//           ...post,
//           title: await translateText(post.title, language),
//         }))
//       );

//       setTranslatedData({
//         lifedata: translatedLife,
//         cardata: translatedCar,
//         healthdata: translatedHealth,
//         lifedataposts: translatedLifePosts,
//         cardataposts: translatedCarPosts,
//         healthdataposts: translatedHealthPosts,
//       });
//     }

//     handleTranslation();
//   }, [language, lifedata, cardata, healthdata]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await graphQLClient.request(GET_HERO_AND_STATS);

//         // const sortedPosts = [...data.posts.nodes].sort(
//         //   (a, b) => new Date(b.date) - new Date(a.date)
//         // );

//         data?.categories?.nodes?.forEach((category) => {
//           if (category?.slug === "car-insurance") {
//             setCardata(category?.posts.nodes[0]);
//             setCardataposts(category?.posts.nodes);
//           }
//           if (category?.slug === "health-insurance") {
//             sethealthdata(category.posts.nodes[0]);
//             setHealthdataposts(category?.posts.nodes);
//           }
//           if (category?.slug === "life-insurance") {
//             setlifedata(category.posts.nodes[0]);
//             setLifedataposts(category?.posts.nodes);
//           }
//         });
//         // setPosts(sortedPosts[0]);
//         // const groupedPosts = {};
//         // data.posts.nodes.forEach((post) => {
//         //   post.categories.nodes.forEach((category) => {
//         //     if (!groupedPosts[category.slug]) {
//         //       groupedPosts[category.slug] = [];
//         //     }
//         //     groupedPosts[category.slug].push(post);
//         //   });
//         // });
//         // console.log(groupedPosts, "groupedPosts");
//         // setCategPosts(groupedPosts);
//         //         // Sort posts by date (most recent first) for each category
//         // Object?.keys(groupedPosts)?.forEach((categorySlug) => {
//         //   groupedPosts[categorySlug].sort(
//         //     (a, b) => new Date(b.date) - new Date(a.date)
//         //   );
//         // });
//         // console.log(groupedPosts, "groupedPosts groupedPosts");
//         // setCategoryPosts(groupedPosts);
//         // setHero(data.page);
//         // setStats(data.statsPosts.nodes);
//       } catch (err) {
//         console.error("GraphQL Error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, []);
//   // console.log(categoryPosts, "categoryPosts");
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [categoryData, setCategoryData] = useState({});
//   const categoryNames = Object.keys(categoryData);
//   const currentCategory = categoryNames[activeIndex];
//   const [statsData, setStatsData] = useState([]);
//   function handleAnimationComplete() {
//     console.log("Animation finished");
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % labels.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [labels.length]);

//   return (
//     <div className="relative w-full  h-full flex flex-col items-center justify-center py-20">
//       {/* Hero Content Flex Wrapper */}
//       <div className="relative flex px-4 sm:px-6 lg:px-8 flex-col items-center gap-10  md:flex-row md:items-start">
//         {/* Left Section - Text and Buttons */}
//         <div className="w-full  max-w-lg text-center md:text-left">
//           {/* <BlurText
//             text={
//               activeIndex === 0
//                 ? lifedata?.title
//                 : activeIndex === 1
//                 ? cardata?.title
//                 : healthdata?.title
//             }
//             delay={150}
//             animateBy="words"
//             direction="top"
//             onAnimationComplete={handleAnimationComplete}
//             className="text-4xl md:text-5xl text-gray-800 leading-tight mb-6"
//             style={{ fontFamily: "Marcellus, serif" }}
//           /> */}

//           <div className="mt-4  pn:max-md:h-[50px]  text-gray-600">
//             {activeIndex === 0
//               ? translatedData?.lifedata?.title
//               : activeIndex === 1
//               ? translatedData?.cardata?.title
//               : translatedData?.healthdata?.title}
//           </div>

//           <div className="mt-8  flex items-center justify-center gap-6 md:justify-start">
//             <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f6f6] transition-transform duration-300 hover:scale-105 ">
//               <CiPlay1 className="h-8 w-8 text-[#191919]" />
//             </button>
//           </div>

//           <div className="mt-8 flex  flex-wrap justify-center gap-3 md:justify-start">
//             {labels.map((label, index) => (
//               <button
//                 key={label}
//                 className={`flex h-11 items-center whitespace-nowrap rounded-full border px-5 font-semibold transition-all duration-300
//                 ${
//                   activeIndex === index
//                     ? "scale-105 border-[#191919] bg-transparent text-[#191919]"
//                     : "border-transparent bg-[#f6f6f6] text-gray-700 hover:bg-[#191919] hover:text-white"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="relative py-6 pn:max-sm:hidden z-10 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8 ">
//         <div className="flex pn:max-md:h-[700px] overflow-hidden  h-[320px] flex-col items-center justify-evenly   sm:flex-row sm:flex-wrap gap-6">
//           {isLoading
//             ? Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="animate-pulse flex  flex-col overflow-hidden rounded-2xl bg-white w-full sm:w-[48%] md:w-[31%]"
//                 >
//                   <div className="aspect-video bg-gray-800 w-full rounded-[6.9%]"></div>
//                   <div className="flex flex-grow flex-col justify-between p-5">
//                     <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//                   </div>
//                 </div>
//               ))
//             : (activeIndex === 0
//                 ? translatedData?.lifedataposts
//                 : activeIndex === 1
//                 ? translatedData?.cardataposts
//                 : translatedData?.healthdataposts
//               )
//                 ?.slice(0, isMobile ? 2 : 3)
//                 ?.map((stat) => (
//                   <Link
//                     href={{
//                       pathname: "/blog",
//                       query: {
//                         content: stat?.content,
//                         title: stat?.title,
//                         postid: stat?.id,
//                         image: stat?.featuredImage?.node?.sourceUrl,
//                       },
//                     }}
//                     // href="https://admin.costaricaninsurance.com/understanding-medical-insurance-a-comprehensive-guide/"
//                     // <div
//                     key={stat?.title}
//                     className="flex pn:max-sm:h-[500px] bg-white flex-col  overflow-hidden rounded-t-3xl group   w-full sm:w-[48%] md:w-[31%]"
//                   >
//                     <div className="aspect-video  w-full">
//                       <img
//                         src={
//                           stat?.featuredImage?.node?.sourceUrl ||
//                           "/placeholder.png"
//                         }
//                         alt={stat?.title}
//                         className="object-cover w-full h-[29.5vh] opacity-100 rounded-[6.9%]"
//                       />
//                     </div>
//                     <div className="flex flex-grow flex-col bg-white rounded-3xl justify-between  -mt-12 p-4">
//                       <h3 className="text-[16px] font-semibold text-gray-800">
//                         {stat?.title}
//                       </h3>
//                       <div className="mt-3 flex items-center group-hover:ml-4 duration-200  group-hover:bg-[#191919]  group-hover:text-white rounded-2xl  py-2 px-2 justify-center w-fit text-gray-500">
//                         <ArrowRight className="mr-2 h-4 w-4" />
//                         <span>{stat?.subtitle}</span>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//           {/* {statsData.map((stat, index) => (
//             <div key={index} className="...">
//               <img src={stat.imgSrc} alt={stat.title} />
//               <h3>{stat.title}</h3>
//               <div dangerouslySetInnerHTML={{ __html: stat.content }} />
//             </div>
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// }
// }
