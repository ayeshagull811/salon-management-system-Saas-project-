"use client";

import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/axiosInstance";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function AllSalons() {
    const router = useRouter();
    const { userId } = useParams();
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("all salon", salons);
     const handleOpenDashboard = (salonId) => {
    router.push(`/admindashboard/${salonId}`);
  };
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const userId = localStorage.getItem("userId"); // ✅ jis user ka dashboard hai
        if (!userId) {
          console.warn("⚠️ User ID missing in localStorage");
          return;
        }
  console.log("UserID from localStorage:", userId);

        const token = localStorage.getItem("token");
        console.log("token in all salon ",token);
        
        const res = await axios.get(
          `http://localhost:8000/salon/getsalonbyid/${userId}`, // ✅ naya endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

 
        console.log("Fetched salons:", res.data);
        setSalons(res.data|| []); // agar data empty ho to empty array set
      } catch (err) {
        console.error("Failed to fetch salons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading salons...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-amber-700 text-center mb-8">
        ALL SALONS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.map((salon , index) => (
          <div
            key={salon.id}
            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
          >
            <div className="h-48 w-full overflow-hidden rounded-2xl mb-4">
              <img
                src={
                  salon.img ||
                  "https://www.andacademy.com/resources/wp-content/uploads/2024/11/feature-image-1.webp"
                }
                alt={salon.salon_name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {salon.salon_name}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Mail className="w-4 h-4" />
              <p className="text-sm">{salon.salon_email}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Phone className="w-4 h-4" />
              <p className="text-sm">{salon.contact_number}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                onClick={() => handleOpenDashboard(salon.id)}
                className="relative overflow-hidden px-5 py-2 bg-amber-200/30w-full bg-gradient-to-r from-amber-800/80 to-amber-700/50 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-amber-100 group"
              >
                <span className="relative z-10">
                  Dashboard
                </span>
                <span className="absolute left-0 top-0 h-full w-0 bg-amber-800 text-amber-700 transition-all duration-500 group-hover:w-full"></span>
              </button>
              <Link
                href="/landingpage"
                className="flex items-center gap-1 text-amber-800 hover:text-amber-700 font-medium"
              >
                View <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
