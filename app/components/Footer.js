"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronUp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formId = "123"; // Your WPForms newsletter form ID
      const response = await fetch(
        `https://admin.costaricaninsurance.com/wp-json/wpforms/v1/forms/${formId}/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              1: email, // Your email field ID in the WPForms form
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to subscribe");

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      console.error(err);
      setMessage("Subscription failed. Please try again.");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white w-full">
      <div className="flex flex-col items-stretch mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="bg-[#fca311] rounded-[20px] px-6 py-10 sm:px-10 md:px-14 lg:px-20 my-10 w-full relative overflow-hidden min-h-[200px]">
          {/* Decorative gradients */}
          <div className="absolute top-[-30px] left-[-30px] w-[clamp(60px,15vw,120px)] h-[clamp(60px,15vw,120px)] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2)_2px,transparent_2px,transparent_4px)] rounded-full z-0" />
          <div className="absolute bottom-[-30px] right-[-30px] w-[clamp(60px,15vw,120px)] h-[clamp(60px,15vw,120px)] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2)_2px,transparent_2px,transparent_4px)] rounded-full z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 w-full">
            <div className="text-white flex-1 min-w-0 text-center md:text-left">
              <h2 className="text-[clamp(1.25rem,4vw,2rem)] font-[Marcellus] font-bold leading-tight mb-2">
                Subscribe our newsletter
              </h2>
              <p className="text-[clamp(0.85rem,2.5vw,0.95rem)] opacity-90 leading-relaxed">
                Non consectetur a erat nam at. Sit amet risus nullam eget felis
                eget nunc lobortis.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white rounded-full shadow-md min-w-[280px] max-w-[400px] w-full h-[clamp(42px,6vw,50px)] overflow-hidden"
            >
              <input
                type="email"
                placeholder="Enter your email ..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none px-4 text-[clamp(0.85rem,2vw,0.95rem)] h-full"
              />
              <button
                type="submit"
                className="bg-[#14213d] text-white h-full w-[clamp(45px,8vw,60px)] text-[clamp(1.5rem,3vw,2rem)] flex items-center justify-center rounded-bl-full transition-transform duration-300 hover:bg-[#0f172a] hover:scale-105 active:scale-95"
              >
                ✓
              </button>
            </form>
            {message && (
              <p className="mt-2 text-sm text-white text-center md:text-left">
                {message}
              </p>
            )}
          </div>
        </section>

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row flex-wrap ">
          {/* Company Info */}
          <div className="flex-1 min-w-[300px] sm:border-r border-gray-300 p-2 max-w-[600px]">
            {/* <div className="w-[250px]">
              <Image src={wordlogo} alt="logo" />
            </div> */}
            <Link href={"/"} className="flex -ml-5 items-center ">
              <Image
                src={logo}
                alt="logo"
                className="cursor-pointer w-[50px]  sm:w-[60px] md:w-[70px]"
              />
              <div className="flex-shrink-0 ">
                <span
                  className="text-lg sm:text-xl md:text-[1.67rem] font-normal text-[#121212]"
                  style={{ fontFamily: "Marcellus, serif" }}
                >
                  Costa Rican Insurance
                </span>
              </div>
            </Link>
            <p className="mt-4 text-gray-500 max-w-sm">
              We make protecting what matters simple, clear, and accessible,
              whether you’re a local resident, expat, student, or traveler in
              Costa Rica.
            </p>
            <a
              href="mailto:info@costaricaninsurance.com"
              className="mt-4 inline-block font-semibold text-gray-700 hover:text-amber-500"
            >
              info@costaricaninsurance.com
            </a>
            <div className="mt-6 flex space-x-3">
              <a
                href="#"
                className="text-[#B79C75] border-2 border-[#B79C75] rounded-full p-2 hover:bg-[#B79c75] hover:text-white hover:border-[#B79c75] transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#B79C75] border-2 border-[#B79C75] rounded-full p-2 hover:bg-[#B79c75] hover:text-white hover:border-[#B79c75] transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#B79C75] border-2 border-[#B79C75] rounded-full p-2 hover:bg-[#B79c75] hover:text-white hover:border-[#B79c75] transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#B79C75] border-2 border-[#B79C75] rounded-full p-2 hover:bg-[#B79c75] hover:text-white hover:border-[#B79c75] transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="justify-between w-auto flex-1 min-w-[300px] max-w-[600px]">
            <div className="h-[100px] border-b border-gray-300  "></div>
            <div className="flex flex-1 flex-wrap gap-8 p-4 justify-between min-w-[300px]">
              <div>
                <h4 className="font-bold text-gray-900 font-[Marcellus] border-b border-[#B79C75] tracking-wider text-sm">
                  Quick Links
                </h4>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/about-us"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Insurance
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Pages
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      F.A.Qs
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 font-[Marcellus]  border-b border-[#B79C75] tracking-wider text-sm">
                  Important links
                </h4>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/contactus"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900  font-[Marcellus]  border-b border-[#B79C75]  tracking-wider text-sm">
                  Top Categories
                </h4>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Life Insurance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Vehicle Insurance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-amber-500 font-medium"
                    >
                      Health Insurance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center sm:text-left">
            Copyright &copy; 2025 CostaRican Insurance -- All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 h-9 w-9 rounded-3xl bg-[#1E3161] text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
            aria-label="Back to top"
          >
            <FaChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
