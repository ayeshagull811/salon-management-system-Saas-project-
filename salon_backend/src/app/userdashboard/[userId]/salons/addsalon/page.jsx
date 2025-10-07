"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Globe, Locate, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaStore } from "react-icons/fa";
import { useState, useMemo } from "react";
import Select from "react-select";
import { getNames } from "country-list";
import axios from "axios";
import staff from "@/assets/stafff.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/axiosInstance";

export default function RegisterPage() {
  const router = useRouter();
   const {  salonId } = useParams();
  const [userId, setUserId] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);
    const [newSalonId, setNewSalonId] = useState(null);
  const options = getNames().map((country) => ({
    value: country,
    label: country,
  }));
  const [registerForm, setRegisterForm] = useState({
    salon_name: "",
    salon_email: "",
    contact_number: "",
    type: "",
    location: "",
  });
  console.log("salon data", registerForm);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // ✅ Get token on client side only
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
 useEffect(() => {
    if (popup.show && popup.type === "success" && newSalonId) {
      const timer = setTimeout(() => {
        router.push(`/userdashboard/${userId}/salons/${newSalonId}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popup, newSalonId, userId, router]);
  console.log("token in register salon", token);
  const handleChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/salon/create",
        { ...registerForm, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token
          },
        }

      );

const user = JSON.parse(localStorage.getItem("user")) || {};
const updatedSalons = [...(user.salons || []), res.data.data]; // ✅ correct
user.salons = updatedSalons;
localStorage.setItem("user", JSON.stringify(user));

    const createdSalonId = res.data?.salonId || res.data?.insertId;
      setNewSalonId(createdSalonId);
      setPopup({
        show: true,
        message: "Successfully register salon 🎉",
        type: "success",
      });
    } catch (error) {
       setPopup({
        show: true,
        message: error.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };
  const handleOkClick = () => {
    setSubmitSuccess(false);
 
    // apna actual salonId dalna hoga yahaan
  };
  return (
    <div className="relative">
      <motion.div
        // initial={{ y: "-100%" }}
        // animate={{ y: 0 }}
        // transition={{ duration: 1, ease: "easeOut" }}
        className="relative h-100 bg-[#CA9871]/90 flex items-center justify-center"
        style={{
          borderBottomLeftRadius: "40% 40%",
          borderBottomRightRadius: "40% 40%",
        }}
      >
        {/* <div className="absolute top-140 left-220 transform -translate-x-1/2 -translate-y-1/4 z-20">
          <Image
            src={staff}
            alt="Staff"
            width={400}
            height={300}
            className="drop-shadow-xl rotate-6"
          />
        </div> */}
        <div className="absolute top-10 inset-0 bg-[#CA9871]/90 opacity-30 rounded-b-[40%]" />
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          action=""
          className="absolute top-15 w-full justify-center align-center max-w-md p-8 sm:p-10 flex flex-col  border border-white/20 rounded-xl bg-white/30 backdrop-blur-md shadow-lg"
        >
          <div className="flex justify-center items-center mt-5">
            <h2 className="text-3xl font-bold drop-shadow-lg  text-amber-700 text-center mb-5">
              Register Salon
            </h2>
          </div>
          <div className="relative ">
            <label
              htmlFor="salon"
              className="text-sm font-medium text-amber-800"
            >
              Salon Name
            </label>
            <br />
            <input
              type="salon"
              placeholder="enter name"
              name="salon_name"
              value={registerForm.salon_name}
              onChange={handleChange}
              id="salon"
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <FaStore className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          <div className="relative ">
            <label
              htmlFor="email"
              className="text-sm font-medium text-amber-800"
            >
              Salon Email
            </label>
            <br />
            <input
              type="email"
              placeholder="@beautysalon.com"
              name="salon_email"
              id="email"
              value={registerForm.salon_email}
              onChange={handleChange}
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <Mail className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          <div className="relative ">
            <label
              htmlFor="domain"
              className="text-sm font-medium text-amber-800"
            >
              Salon Domain
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter domain"
              name="domain"
              id="domain"
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <Globe className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          <div className="relative ">
            <label
              htmlFor="contact"
              className="text-sm font-medium text-amber-800"
            >
              Contact Number
            </label>
            <br />
            <input
              type="tel"
              placeholder="enter number"
              name="contact_number"
              id="contact"
              value={registerForm.contact_number}
              onChange={handleChange}
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <Phone className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          <div className="relative ">
            <label
              htmlFor="contact"
              className="text-sm font-medium text-amber-800"
            >
              Location
            </label>
            <br />
            <input
              type="location"
              placeholder="enter location"
              name="location"
              id="contact"
              value={registerForm.location}
              onChange={handleChange}
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <Locate className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>

          <div className="flex flex-col gap-1 w-[350px] mb-5">
            <label htmlFor="salonType" className="text-amber-700">
              Salon Type
            </label>
            <select
              name="type"
              value={registerForm.type}
              onChange={handleChange}
              id="salonType"
              className="border border-amber-600 rounded-md px-3 py-2 focus:border-amber-400"
            >
              <option value="" className="text-amber-600">
                Select Salon Type
              </option>
              <option value="girls" className="text-amber-600">
                Girls Salon
              </option>
              <option value="boys" className="text-amber-600">
                Boys Salon
              </option>
              <option value="both" className="text-amber-600">
                Both
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="relative overflow-hidden px-7 py-2 bg-amber-200/30w-full bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-amber-100 group"
          >
            <span className="relative z-10">Create Salon</span>
            <span className="absolute left-0 top-0 h-full w-0 bg-amber-800 text-amber-700 transition-all duration-500 group-hover:w-full"></span>
          </button>
        </motion.form>
      </motion.div>
          {popup.show && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <h2
        className={`text-lg font-semibold mb-3 ${
          popup.type === "success" ? "text-green-600" : "text-red-600"
        }`}
      >
        {popup.type === "success" ? "Success ✅" : "Error ❌"}
      </h2>
      <p className="text-gray-600 mb-4">{popup.message}</p>
    </div>
  </div>
)}
    </div>
  );
}
