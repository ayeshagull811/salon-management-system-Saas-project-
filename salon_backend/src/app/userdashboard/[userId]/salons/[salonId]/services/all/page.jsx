"use client";

import axiosInstance from "@/axiosInstance";
import axios from "axios";
import {
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Eye,
  View,
  EyeOff,
  DollarSign,
  Clock,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const salonId = params.salonId;
  const userId = params.userId;
  console.log("salon id ", salonId);
  console.log("user id ", userId);
  const filterServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.price.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (id) => {
    alert(`Edit service ${id}`);
  };

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleToggleActive = (id) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, status: !s.status } : s))
    );
  };

  const handleView = (services) => {
    setSelectedService(services);
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `services/services/${salonId}`
        );
        if (res.data.success) {
          setServices(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch services");
        }
        console.log("service data", res.data.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (salonId) fetchServices();
  }, [salonId]);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>
        <Link href={`/userdashboard/${userId}/salons/${salonId}/services/add`}>
          <button className="bg-amber-800/70 text-white px-4 py-3 rounded-lg hover:bg-amber-600/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            + Add Service
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterServices.map((service) => (
          <div
            key={service.id}
className="relative group h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-[#926848]"          >
            <div className="w-full h-full bg-cover bg-center transition-all duration-500">
              <Image
                src={`http://localhost:8000${service.image}`} // combine base URL + relative path
                alt={service.name}
                width={300}
                height={200}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#926848]/90 via-[#926848]/70 to-[#926848]/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
            <div className="absolute inset-0 p-6 flex  justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <button
                onClick={() => handleEdit(service.id)}
                className=" w-7  text-blue-600  hover:text-blue-200"
              >
                <Edit size={25} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="   text-red-600  hover:text-red-200"
              >
                <Trash2 size={25} />
              </button>
              <button
                onClick={() => handleToggleActive(service.id)}
                className="   text-gray-600  hover:text-gray-200"
              >
                {service.status ? (
                  <ToggleRight size={25} />
                ) : (
                  <ToggleLeft size={25} />
                )}
              </button>
              <button
                onClick={() => handleView(service)}
                className="   text-blue-600  hover:text-blue-200"
              >
                <Eye size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedService && (
        <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#b6845f]/60 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-[#926848]">
                {selectedService.name}
              </h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-[#926848] hover:amber-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Category:</strong> {selectedService.category}
              </p>
              <p>
                <strong>Price:</strong> ${selectedService.price}
              </p>
              <p>
                <strong>Duration:</strong> {selectedService.duration} minutes
              </p>
              <p>
                <strong>Discount:</strong> {selectedService.discount}
              </p>
              <p>
                <strong>Description:</strong> {selectedService.description}
              </p>
              <p>
                <strong>employee:</strong> {selectedService.employee}
              </p>

              <p>
                <strong>Features:</strong>
                <ul className="list-disc ml-5 text-gray-600">
                  {selectedService.features.map((e, index) => (
                    <li key={index}>{e}</li>
                  ))}
                </ul>
              </p>

              <p>
                <strong>createdAt</strong> {selectedService.createdAt}
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleEdit(selectedService)}
                className="flex-1 bg-[#926848] text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors"
              >
                Edit Service
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {filterServices.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No service found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or create a new service
          </p>
          <button className="bg-amber-700/60 hover:bg-amber-600/70 text-white px-6 py-3 rounded-xl font-medium  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Create service
          </button>
        </div>
      )}
    </div>
  );
}
