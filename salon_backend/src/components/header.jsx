import Image from "next/image";
import Link from "next/link";
import React from "react";
import face from "@/assets/logoo.png";
export default function Header() {
  return (
    <div>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center -ml-20">
          <Image src={face} alt="logo" className="w-30 h-20" />
          <h1 className="space-grotesk text-xl text-[#a36739] -ml-10">
            BeautySalon
          </h1>
        </div>

        <button
          className="relative overflow-hidden px-7 py-2 rounded border bg-[#CA9871]/30   border-[#CA9871] /60 hover:text-white text-amber-700
  transition-all duration-500 group"
        >
          <span className="relative z-10">
            <Link href="signup">try now</Link>
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-amber-700 text-amber-800  transition-all duration-500 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  );
}
