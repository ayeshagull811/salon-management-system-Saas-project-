import React from "react";
import face from "../assets/logoo.png";
import Image from "next/image";
import Link from "next/link";

export default function NavBarPage() {
  return (
    <div className="bg-pink-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
        <div className="flex justify-left -ml-13 items-center ">
          <Image src={face} alt="face" className="w-35 h-30" />
          <h1 className="text-3xl font-bold -ml-8">BeautySalon</h1>
        </div>

        <div className="flex gap-3 justify-between items-center">
          <ul className="flex space-x-6 font-medium">
            <li className="hover:underline cursor-pointer">Features</li>
            <li className="hover:underline cursor-pointer">Pricing</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">Register</li>
          </ul>
          <div className="relative inline-block group">
            <div className=" px-4 py-2 rounded cursor-pointer">Categories</div>

            <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded shadow-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Haircut
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Spa
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Makeup
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Manicure
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Pedicure
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Hair Coloring
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Hair Styling
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Facial
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Waxing
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Bridal Services
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Massage
              </a>
            </div>
          </div>
        </div>

        <button
          className="relative overflow-hidden px-7 py-2 rounded border bg-pink-200/30 text-pink-500 border-pink-700 hover:text-pink-100
  transition-all duration-500 group"
        >
          <span className="relative z-10">
            <Link href="staffLogin">login</Link>
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-pink-700 text-pink-700 transition-all duration-500 group-hover:w-full"></span>
        </button>
      </div>
    </div>
  );
}
