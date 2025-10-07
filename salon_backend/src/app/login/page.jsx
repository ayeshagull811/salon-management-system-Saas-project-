"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Check } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import staff from "@/assets/stafff.png";
import Image from "next/image";
import axiosInstance from "@/axiosInstance";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password_hash: "" });
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });

        // ✅ agar success hai to navigate kare login page par
        if (popup.type === "success") {
          router.push(`/userdashboard/${userId}`);
        }
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
  }, [popup, router]);
  const handleChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    if (!loginForm.email || !loginForm.password_hash) {
      setPopup({
        show: true,
        message: "All fields are required!",
        type: "error",
      });
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/loginuser`,
        loginForm
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
localStorage.setItem("token", res.data.token);

      setPopup({
        show: true,
        message: "Login successful!",
        type: "success",
      });
      const token = res.data.token;

      // Client-side storage
      localStorage.setItem("token", token);
      console.log("token after login", token);
      localStorage.setItem("userId", res.data.user.id);
      console.log("login id", res.data.user.id);

      // Cookie for server-side access
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`;
    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <div className="relative">
      <motion.div
        // initial={{ y: "-100%" }}
        // animate={{ y: 0 }}
        // transition={{ duration: 1, ease: "easeOut" }}
        className="relative h-100 bg-[#CA9871] flex items-center justify-center"
        style={{
          borderBottomLeftRadius: "40% 40%",
          borderBottomRightRadius: "40% 40%",
        }}
      >
        {/* <div className="absolute top-100 left-220 transform -translate-x-1/2 -translate-y-1/4 z-20">
          <Image
            src={staff}
            alt="Staff"
            width={400}
            height={300}
            className="drop-shadow-lg rotate-7"
          />
        </div> */}
        <div className="absolute top-10 inset-0 bg-[#CA9871] opacity-30 rounded-b-[40%]" />
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
              Welcome Back
            </h2>
          </div>
          <div className="relative ">
            <label
              htmlFor="email"
              className="text-sm font-medium text-amber-800"
            >
              Email
            </label>
            <br />
            <input
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              id="email"
              onChange={handleChange}
              value={loginForm.email}
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <Mail className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          <div className="relative ">
            <label
              htmlFor="password"
              className="text-sm font-medium text-amber-800"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              placeholder="password"
              name="password_hash"
              onChange={handleChange}
              value={loginForm.password_hash}
              className="pl-10 mb-2  py-2 border rounded-md border-amber-600 w-[350px]"
            />
            <Lock className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          <div className="flex justify-between items-center text-sm py-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="checkbox"
                className="accent-amber-400"
              />
              <br />
              <label htmlFor="checkbox" className="text-amber-700">
                Remember me
              </label>
            </div>
            <p className="text-amber-600 hover:underline cursor-pointer">
              forget passward
            </p>
          </div>

          <button
            type="submit"
            className="relative overflow-hidden px-7 py-2 bg-amber-200/30w-full bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-amber-100 group"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute left-0 top-0 h-full w-0 bg-amber-800 text-amber-700 transition-all duration-500 group-hover:w-full"></span>
          </button>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="flex-grow border-b border-amber-800"></div>
            <span className="text-amber-500 text-sm">Or</span>
            <div className="flex-grow border-b border-amber-800"></div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button className="rounded-full items-center border border-amber-400 hover:bg-amber-200 transition p-2">
              <FcGoogle className="w-4 h-4" />
            </button>
            <button className="rounded-full items-center border border-amber-400 hover:bg-amber-200 transition p-2">
              <FaLinkedin className="w-4 h-4" />
            </button>
            <button className="rounded-full items-center border border-amber-400 hover:bg-amber-200 transition p-2">
              <FaInstagram className="w-4 h-4" />
            </button>

            <button className="rounded-full items-center border border-amber-400 hover:bg-amber-200 transition p-2">
              <FaFacebookF className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-center text-amber-600 mt-4">
            Don't have an account?{" "}
            <Link
              href="signup"
              className="text-amber-800 hover:underline font-medium"
            >
              Register
            </Link>
          </div>
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
