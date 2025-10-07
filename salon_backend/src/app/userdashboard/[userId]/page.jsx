"use client";

import { ExternalLink, Mail, Phone, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ Token missing");
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/salon/getsalonbyid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ Backend response structure check
        const fetchedSalons = res.data.salons || res.data || [];
        setSalons(fetchedSalons);

        // ✅ localStorage update
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        localStorage.setItem(
          "user",
          JSON.stringify({ ...storedUser, salons: fetchedSalons })
        );
      } catch (err) {
        console.error("Failed to fetch salons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, [userId]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filterSalon = salons.filter(
    (s) =>
      s.salon_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.salon_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading salons...</p>;

  return (
    <div className="p-6">
      {salons.length === 0 ? (
        <div>
          <div className="bg-gradient-to-r from-amber-900/70 to-amber-800/50 text-white/80 p-8 rounded-2xl mb-6">
            <h1 className="font-bold items-center text-2xl">
              WELCOME! {user?.firstname || "Guest"}
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center mt-30 text-center">
            <p className="mb-4 text-lg text-amber-800">
              You haven’t registered a salon yet
            </p>
            <Link href={`/userdashboard/${userId}/salons/addsalon`}>
              <button
                type="button"
                className="relative overflow-hidden px-6 py-2 bg-gradient-to-r from-amber-700/40 to-amber-800/40 text-white font-medium rounded-full 
               hover:opacity-90 hover:scale-105 transition-transform duration-300 hover:text-amber-100 group"
              >
                <span className="relative z-10">Register Salon</span>
                <span className="absolute left-0 top-0 h-full w-0 bg-amber-800 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-r from-amber-900/70 to-amber-800/50 text-white/80 p-8 rounded-2xl mb-6">
            <h1 className="font-bold items-center text-2xl">
              WELCOME! {user?.firstname || "Guest"}
            </h1>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6 gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search salon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
              <Link href={`/userdashboard/${userId}/salons/addsalon`}>
                <button className="bg-amber-800/70 text-white px-4 py-3 rounded-lg hover:bg-amber-600/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  + Add Salon
                </button>
              </Link>
            </div>
            {filterSalon.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="bg-amber-100 rounded-2xl p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">
                    No salons found
                  </h3>
                  <p className="text-amber-600 mb-4">
                    Try adjusting your search term or browse all salons.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterSalon.map((salon) => (
                <div
                  key={salon.id}
                  className="relative group h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-[#926848]"
                >
                  <div className="w-full h-full bg-cover bg-center transition-all duration-500">
                    <img
                      src={
                        salon.img ||
                        "https://www.andacademy.com/resources/wp-content/uploads/2024/11/feature-image-1.webp"
                      }
                      alt={salon.salon_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-white">
                      <h2 className="text-xl font-semibold mb-3">
                        {salon.salon_name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" />
                        <p className="text-sm">{salon.salon_email}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4" />
                        <p className="text-sm">{salon.contact_number}</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/userdashboard/${userId}/salons/${salon.id}`
                          )
                        }
                        className="relative overflow-hidden p-2 bg-amber-200/30 bg-gradient-to-r from-amber-800/80 to-amber-700/50 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-amber-100 group"
                      >
                        <span className="relative z-10">Dashboard</span>
                        <span className="absolute left-0 top-0 h-full w-0 bg-amber-800 transition-all duration-500 group-hover:w-full"></span>
                      </button>
                      <Link
                        href="/landingpage"
                        className="flex items-center gap-1 text-white font-medium"
                      >
                        View <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
