"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import staff from '@/assets/stafff.png'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StaffLogin() {
  const router = useRouter();
  
  const [staffLoginForm, setStaffLoginForm] = useState({ email: "", password: "" });
  console.log("login form",staffLoginForm);
  
  const handleChange = (e) =>
    setStaffLoginForm({ ...staffLoginForm, [e.target.name]: e.target.value });

  const handleSubmit = async e =>{
    e.preventDefault();
    try {
      const res =await axios.post("http://localhost:8000/employee/loginemployee",staffLoginForm)
      console.log("res data",res);
      
      alert(res.data.message);
      // router.push("/changepassword");
    } catch (err) {
         if (err.response?.status === 403 && err.response.data.mustChangePassword) {
    // redirect user to change password page
    alert("You must change your password before logging in.");
    localStorage.setItem("employeeId", err.response.data.employeeId);
    router.push(`/changepassword/${err.response.data.employeeId}`);
  } else {
    console.error("Login failed:", err.response?.data || err.message);
  }
    }
  }

  return (
    <div>
      <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative h-100 bg-pink-400 flex items-center justify-center"
      style={{
        borderBottomLeftRadius: "40% 40%",
        borderBottomRightRadius: "40% 40%",
      }}
    >
       <div className="absolute top-80 left-220 transform -translate-x-1/2 -translate-y-1/4 z-20">
  <Image 
    src={staff} 
    alt="Staff" 
    width={400}     
    height={300}    
    className="drop-shadow-lg rotate-6"  
  />
</div>

      <div className="absolute top-10 inset-0 bg-pink-400 opacity-30 rounded-b-[40%]" />
      <motion.form
       onSubmit={handleSubmit}
        action=""
        className="absolute top-15 w-full justify-center align-center max-w-md p-9 sm:p-10 flex flex-col  border border-white/20 rounded-xl bg-white/30 backdrop-blur-md shadow-lg"
      >
        <div className="items-center mt-5">
          <h2 className="text-3xl font-bold drop-shadow-lg  text-pink-700 text-center mb-1">
            Welcome 
          </h2>
          <p className=" drop-shadow-lg  text-pink-600/60 text-center mb-5">login for staff members</p>
        </div>
        <div className="relative ">
          <label htmlFor="email" className="text-sm font-medium text-pink-800">
            Email
          </label>
          <br />
          <input
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            id="email"
            value={staffLoginForm.email}
            onChange={handleChange}
            className="pl-10 mb-2  py-2 border rounded-md border-pink-600 w-[350px]"
          />
          <Mail className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-pink-600" />
        </div>
        <div className="relative ">
          <label
            htmlFor="password"
            className="text-sm font-medium text-pink-800"
          >
            Password
          </label>
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
           value={staffLoginForm.password}
            onChange={handleChange}
            className="pl-10 mb-2  py-2 border rounded-md border-pink-600 w-[350px]"
          />
          <Lock className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-pink-600" />
        </div>
        <div className="flex justify-between items-center text-sm py-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="checkbox" className="accent-pink-400" />
            <br />
            <label htmlFor="checkbox" className="text-pink-700">
              Remember me
            </label>
          </div>
          <p className="text-pink-500 hover:underline cursor-pointer">
            forget passward
          </p>
        </div>

        <button type="submit" className="relative overflow-hidden px-7 py-2 bg-pink-200/30w-full bg-gradient-to-r from-pink-700 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-pink-100 group">
          <span className="relative z-10">
            Login
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-pink-400 text-pink-700 transition-all duration-500 group-hover:w-full"></span>
        </button>
  
      </motion.form>
    </motion.div>
    </div>
  )
}
