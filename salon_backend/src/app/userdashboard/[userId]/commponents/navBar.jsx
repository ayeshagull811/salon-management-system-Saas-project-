"use client";
import { Bell, Plus, User } from "lucide-react";
import { FaStore } from "react-icons/fa";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

export default function NavBar() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId;
  const [salons, setSalons] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // LocalStorage se user ke salons le aao
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.salons) {
      setSalons(user.salons);
    }
  }, []);

  // Outside click pe dropdown band karo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div></div>

          <div className="flex items-center space-x-6">
            {/* ✅ Add Salon Button */}
            <Link
              href={`/userdashboard/${userId}/salons/addsalon`}
              className="relative p-2 text-amber-600 hover:text-amber-600 hover:bg-amber-100 rounded-full"
            >
              <Plus className="h-7 w-7" />
            </Link>

            {/* ✅ Salon Icon with Dropdown (toggle version) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full hover:bg-amber-100 text-amber-600"
              >
                <FaStore className="h-6 w-6" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                  {salons.length > 0 ? (
                    salons.map((salon) => (
                      <div
                        key={salon.id}
                        onClick={() => {
                          router.push(
                            `/userdashboard/${userId}/salons/${salon.id}`
                          );
                          setIsDropdownOpen(false); // ✅ salon select karne ke baad close
                        }}
                        className="px-4 items-center py-2 text-gray-700 hover:bg-amber-100 cursor-pointer"
                      >
                        <div className="flex gap-1 items-center"> <FaStore className="h-4 w-4" /><span>{salon.salon_name}</span></div>
                         <p>{salon.type}</p>
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No salons yet</p>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-amber-600 hover:text-amber-600 hover:bg-amber-100 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-2 block h-3 w-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <button className="p-2 text-amber-600 hover:text-amber-600 hover:bg-amber-100 rounded-full">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
