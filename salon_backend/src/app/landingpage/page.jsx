"use client";
import NavBarPage from "@/components/navBar";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import face from '@/assets/face.png'
import Image from "next/image";
import SalonFooter from "@/components/footer";
import AboutSection from "@/components/aboutus";
import ServicesSwiper from "@/components/categories";
import KeyFeatures from "@/components/features";
import CommentSection from "@/components/comment";

export default function page() {
  return (
    <div>
     <div className="relative text-pink-600">
      {/* Background animated div */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0 bg-pink-400 h-[500px] opacity-30 -z-10 shadow-2xl "
      />

      {/* Navbar */}
      <NavBarPage />

      {/* Hero content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
        {/* Left Side (Text) */}
        <div className="text-center md:text-left mt-20 relative z-10 max-w-xl">
          <motion.h1
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-3xl font-extrabold leading-snug drop-shadow-lg"
          >
            Manage Your Salon, Save Time, <br /> and Grow Your Business
          </motion.h1>

          <motion.p
            initial={{ y: -150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl tracking-wide text-gray-700"
          >
            All-in-one salon management system to handle bookings, staff, and
            customers anytime, anywhere.
          </motion.p>
        </div>

        {/* Right Side (Image) */}
        <div className="mt-10 md:mt-0 md:ml-10">
          <Image
            src={face}
            alt="Salon illustration"
            className="w-[400px] md:w-[500px] drop-shadow-4xl"
          />
        </div>
      </div>
    </div> 
    <KeyFeatures/>
    <ServicesSwiper/>
    <AboutSection/>
    <CommentSection/>
    <SalonFooter/>
    </div>
    
  );
}
