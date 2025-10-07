"use client";
import axios from "axios";
import {
  Award,
  Calendar,
  Edit3,
  Mail,
  Phone,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllStaffPage() {
  const [staffMember, setStaffMember] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 const params = useParams();
  const SalonId = params.salonId;
  console.log("salon id ", SalonId);
 
  const filterStaff = staffMember.filter(
    (staff) =>
      staff.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get(
          `/auth/getstaff/${SalonId}`
        );
        console.log("get api", res.data.data);
        if (res.data.success) {
          setStaffMember(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch services");
        }
        console.log("service data", res.data.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong!");
      }
    };

    if (SalonId) fetchServices();
  }, [SalonId]);
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#926848] mb-2">
          All Staff Member
        </h1>
        <p className="text-[#cd9469]">Manage your salon team</p>
      </div>
      <div className="flex justify-between align-center items-center">
        <div className="p-4 mb-6">
          <div className="relative max-w-md mx-auto w-100">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff by name, position, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>
        <div className="p-4 mb-6">
          <button
            type="submit"
            className="relative shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden px-7 py-3 bg-amber-200/30 w-full bg-gradient-to-r from-[#a27450] to-[#be885e] text-white font-semibold rounded-2xl hover:opacity-90 hover:text-amber-100 group"
          >
            <span className="relative z-10 flex justify-center gap-3">
              <Plus className="h-6 w-6" />
              <Link href={`/admindashboard/${SalonId}/staff/add`}>
                Add Staff
              </Link>
            </span>
            <span className="absolute left-0 top-0 h-full w-0 bg-[#74543c] text-amber-700 transition-all duration-500 group-hover:w-full"></span>
          </button>
        </div>
      </div>

      <div className="flex gap-8 flex-wrap ml-5">
        {filterStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex  overflow-hidden border border-gray-100 group rounded-2xl gap-4"
          >
            {/* Card Header */}
            <div className="relative bg-gradient-to-t from-amber-700/70 to-amber-800/70 p-4 text-white">
              <div className="items-center space-y-4">
                <img
                  src={
                    staff.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRseRj5MjxLYtgPrmGHS01YBytPjIkGKk8Zaw&s"
                  }
                  alt={staff.name}
                  className="w-15 h-15 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div>
                  <h3 className="text-md font-bold">
                    {staff.firstname}
                    {staff.las}
                  </h3>
                  <p className="text-amber-100 text-sm">{staff.position}</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-3 text-amber-500" />
                  <span className="text-sm">{staff.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 text-amber-500" />
                  <span className="text-sm">{staff.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-3 text-amber-500" />
                  <span className="text-sm">{staff.shift}</span>
                </div>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-semibold text-gray-800">
                      {staff.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-semibold text-gray-800 mb-1">
                    {staff.totalClients}
                  </div>
                  <p className="text-xs text-gray-600">Clients</p>
                </div>
              </div> */}

              {/* Experience & Specialties */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Award className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {staff.experience} Experience
                  </span>
                </div>

                <p className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full border border-amber-200">
                  {staff.specialization}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <Edit3 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200">
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filterStaff.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500">
            No staff members found
          </p>
          <p className="text-sm text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
