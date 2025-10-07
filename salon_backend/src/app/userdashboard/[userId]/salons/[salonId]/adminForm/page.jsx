"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function AdminRegisterForm() {
  const { salonId } = useParams(); 
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password_hash: "",
    confirmpassword: "",
    gender: "",
    roleId: "", // Admin role
  });

  const [roles, setRoles] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  axiosInstance
    .get(`/role/getrole?salonId=${salonId}`)
    .then((res) =>
      setRoles(res.data.filter((r) => r.name.toLowerCase() === "admin"))
    )
    .catch((err) => console.error(err));
}, [salonId]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password_hash !== formData.confirmpassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await axiosInstance.post("/auth/registerstaff", {
      ...formData,
      salonId: salonId,
    });
    alert("Admin registered successfully");
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password_hash: "",
      confirmpassword: "",
      gender: "",
      roleId: "",
    });
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error registering admin");
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex gap-4">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4">
          <input
            type="password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            placeholder="Password"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        {/* Salon dropdown removed as per new flow */}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#926848] to-[#c68e63] text-white py-2 rounded-xl font-semibold hover:from-[#a48065] hover:to-[#c69d7d] transition-all duration-300"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
}
