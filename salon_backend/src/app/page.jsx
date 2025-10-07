"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import myimage from "@/assets/beauty.jpg";
import face from "@/assets/logoo.png";
import Link from "next/link";
import SuperFeatures from "@/components/superfeatures";
import SalonFooter from "@/components/footer";
import KeyFeatures from "@/components/features";
import ServicesSwiper from "@/components/categories";
import AboutSection from "@/components/aboutus";
import { libertinus, spaceGrotesk /*, epundaSlab */ } from "./font";
import Header from "@/components/header";
// import localFont from "next/font/local";

// const javing = localFont({
//   src: "/fonts/Javing.ttf", // <-- note the leading slash
//   variable: "--font-javing",
//   weight: "400",
// });

export default function Home() {

  return (
    <div>
      <Header />
      <div
        className="relative h-150 text-white overflow-hidden font-sans"
        style={{
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-150 w-200 h-full rounded-l-full overflow-hidden"
        >
          <Image
            src={myimage}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-0  bg-[#CA9871]  -z-10 shadow-xl"
        />

        <div className="text-center mt-60 -ml-150">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-grotesk  text-5xl"
            
          >
            Health Care & <br /> Beauty Salon
          </motion.h1>
          <button
            className="relative overflow-hidden px-7 py-2 rounded border bg-white/30 mt-10  border-white/60 hover:text-white
  transition-all duration-500 group"
          >
            <span className="relative z-10">
              <Link href="signup">Demo</Link>
            </span>
            <span className="absolute left-0 top-0 h-full w-0 bg-amber-700 text-amber-800 transition-all duration-500 group-hover:w-full"></span>
          </button>
        </div>
      </div>
      {/* <SuperFeatures /> */}
      <KeyFeatures />
      <ServicesSwiper />
      <AboutSection />
      <SalonFooter />
    </div>
  );
}
