"use client";
import Link from "next/link";
import React from "react";


function SalonFooter() {
  return (
    <footer>
      <div className="bg-gray-900 px-6 py-10 mt-30">
        <div className="flex flex-wrap justify-between text-white gap-6">
          {/* Logo / Intro */}
          <div>
            <p className="font-bold py-1">
              <Link href="/">BeautySalon</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/">Making beauty & grooming simple</Link>
            </p>
          </div>

          {/* For Customers */}
          <div>
            <p className="font-bold py-1">
              <Link href="/services">For Customers</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/salons">Find a Salon</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/bookings">Book an Appointment</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/offers">Special Offers</Link>
            </p>
          </div>

          {/* For Salon Owners */}
          <div>
            <p className="font-bold py-1">
              <Link href="/owners">For Salon Owners</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/owners/register">Register Your Salon</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/owners/dashboard">Manage Bookings</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/owners/support">Owner Support</Link>
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-bold py-1">
              <Link href="/about">Company</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/about">About Us</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/contact">Contact</Link>
            </p>
            <p className="text-gray-400 py-1">
              <Link href="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
        <p className="border-b border-b-gray-600 pb-1 pt-1"></p>

       
        <div className="mt-5 text-center text-gray-500 text-sm">
          <Link href="/">© 2025 SalonEase. All rights reserved</Link>
        </div>
      </div>
    </footer>
  );
}

export default SalonFooter;
