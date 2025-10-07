// utils/axiosInstance.js
"use client";
import axios from "axios";

// Set your Railway backend URL here
const axiosInstance = axios.create({
  baseURL: "https://saas-project-salon-management-system-production.up.railway.app", // Replace with your actual Railway backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if it exists in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
