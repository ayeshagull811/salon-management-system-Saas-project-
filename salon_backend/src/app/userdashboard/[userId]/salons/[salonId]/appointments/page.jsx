"use client";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Calendar,
  User,
  Edit3,
  Check,
  X,
  Clock,
  PlusCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import axiosInstance from "@/axiosInstance";

const AppointmentsDashboard = () => {
  const { userId, salonId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    customerName: "",
    service: "",
    date: "",
    time: "",
    phone: "",
    price: "",
    status: "pending",
  });

  // Fetch appointments from backend
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
const token = localStorage.getItem("token");
const res = await axiosInstance.get(
  `/appointment/getappointment/${salonId}`,
  {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  }
);
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  // Add new appointment
const addAppointment = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:8000/appointment/postappointment",
      {
        ...formData,
        salonId: salonId, // 👈 extra safety ke liye
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    fetchAppointments(); // refresh list
    setShowForm(false);
    setFormData({
      customerName: "",
      service: "",
      date: "",
      time: "",
      phone: "",
      price: "",
      status: "pending",
    });
  } catch (err) {
    console.error("Error adding appointment:", err.response?.data || err);
  }
};

  // Update status locally (optional: call API for persistence)
  const updateStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    // TODO: call PUT /appointments/:id for real update
  };

  // Filter appointments by search term
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesName = appointment.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = appointment.date.includes(searchTerm);
      return matchesName || matchesDate;
    });
  }, [appointments, searchTerm]);

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      completed: "bg-green-100 text-green-800 border border-green-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
    };

    const labels = {
      pending: "Pending",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-600 mb-2">
              Appointments Dashboard
            </h1>
            <p className="text-amber-500">
              Manage all your salon appointments
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <PlusCircle className="h-5 w-5" />
            Add Appointment
          </button>
        </div>

        {/* Add Appointment Form */}
        {showForm && (
          <form
            onSubmit={addAppointment}
            className="mb-6 p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-amber-600 mb-4">
              New Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Service"
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Save Appointment
            </button>
          </form>
        )}

        {/* Search */}
        <div className="p-4 mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments by name or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Table */}
        <div>
          {filteredAppointments.length > 0 ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-amber-700/80 to-amber-600/60 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Service
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {appointment.customerName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {appointment.service}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-medium">
                            {appointment.date}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {appointment.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {appointment.phone}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-green-600">
                            Rs. {appointment.price}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(appointment.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {appointment.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(appointment.id, "completed")
                                  }
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(appointment.id, "cancelled")
                                  }
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {appointment.status === "cancelled" && (
                              <button
                                onClick={() =>
                                  updateStatus(appointment.id, "pending")
                                }
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                              >
                                <Clock className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setEditingId(
                                  editingId === appointment.id
                                    ? null
                                    : appointment.id
                                )
                              }
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Search className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                No appointments found
              </p>
              <p className="text-sm text-gray-400">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
