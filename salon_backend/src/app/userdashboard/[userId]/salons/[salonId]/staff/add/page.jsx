"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Scissors,
  DollarSign,
  FileText,
  Award,
  Lock,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import axiosInstance from "@/axiosInstance";

export default function SalonStaffForm() {
  const [roles, setRoles] = useState([]);
   const params = useParams();

    const salonId = params.salonId;
    const roleId = params.roleId;
    console.log(salonId);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    address: "",
    position: "",
    department: "",
    salary: "",
    startDate: "",
    employeeId: "",
    experience: "",
    specialization: "",
    certifications: "",
    notes: "",
   password_hash: "",
    gender: "",
    salonId:"",
     role: "employee",
    confirmpassword: "",
  });
  console.log("salon data", formData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Frontend validation
  const newErrors = validateForm();
  if (formData.password_hash !== formData.confirmpassword) {
    newErrors.confirmpassword = "Passwords do not match";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
       let submitData = { ...formData };   // ✅ formData ka copy banaya
    submitData.salonId = salonId;       // ✅ salonId assign kiya

    // agar backend ko roleId chahiye:
    submitData.roleId = formData.role;
    const res =await axiosInstance.post(
      "/auth/registerstaff",
      submitData,
        { headers: { "Content-Type": "application/json" } }
    );
     console.log("Form submitted successfully:", res.data);
  alert(res.data.message);
  
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Failed to submit form. Check console for details.");
  }
};

  const [errors, setErrors] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosInstance.get("/roles");
        setRoles(res.data); // assuming backend returns [{id: 1, name: "admin"}, ...]
      } catch (err) {
        console.error("Failed to fetch roles", err);
      }
    };
    fetchRoles();},[])
    useEffect(() => {
  const fetchRoles = async () => {
    try {
      const res = await axiosInstance.get(`/roles?salonId=${salonId}`);
      setRoles(res.data); // Only roles for this salon
    } catch (err) {
      console.error("Failed to fetch roles", err);
    }
  };

  if (salonId) fetchRoles(); // Only fetch if salonId is available
}, [salonId]);

  const positions = [
    "Hair Stylist",
    "Senior Hair Stylist",
    "Hair Colorist",
    "Barber",
    "Nail Technician",
    "Esthetician",
    "Makeup Artist",
    "Eyebrow Specialist",
    "Massage Therapist",
    "Receptionist",
    "Salon Manager",
    "Assistant",
  ];

  const departments = [
    "Hair Department",
    "Nail Care",
    "Skin Care",
    "Makeup & Beauty",
    "Massage & Spa",
    "Front Desk",
    "Management",
  ];

  const specializations = [
    "Bridal Makeup",
    "Hair Cutting",
    "Hair Coloring",
    "Hair Styling",
    "Keratin Treatment",
    "Nail Art",
    "Gel Manicure",
    "Facial Treatment",
    "Eyebrow Threading",
    "Massage Therapy",
    "Waxing Services",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phonenumber.trim()) newErrors.phonenumber = "phonenumber number is required";
    if (!formData.position) newErrors.position = "Please select a position";
    if (!formData.password_hash) newErrors.password_hash = "Password is required";
    if (!formData.department)
      newErrors.department = "Please select a department";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    // if (!formData.employeeId.trim())
    //   newErrors.employeeId = "Employee ID is required";

    return newErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-[#f0cdb2] to-[#fad4b7] rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#ba8e6c] to-[#d1986c] rounded-full flex items-center justify-center">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#926848] mb-2">
            Add Salon Staff
          </h1>
          <p className="text-[#bd987b]">Enter new staff member details</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/50 p-6 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-[#c79670]" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                    errors.firstname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                    errors.lastname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/50 p-6 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-[#926848]" />
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                      errors.phonenumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="03XX-XXXXXXX"
                  />
                  {errors.phonenumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c19c7f] focus:border-transparent"
                  placeholder="Enter complete address"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">
                 password
                </label>
                <br />
                <input
                  type="password"
                  placeholder="password"
                  value={formData.password_hash}
                  onChange={handleChange}
                  name="password_hash"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#c39876] focus:border-transparent ${
                    errors.password_hash ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="mt-5">
  <label className=" text-sm font-medium text-gray-700">
    Confirm password
  </label>
  <br />
  <input
    type="password"
    placeholder="confirm password"
    name="confirmpassword"
    value={formData.confirmpassword}
    onChange={handleChange}
    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
      errors.confirmpassword ? "border-red-500" : "border-gray-300"
    }`}
  />
  {errors.confirmpassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmpassword}
    </p>
  )}
</div>

            </div>
            <div className="mb-4 mt-5">
              {/* Label */}
              <label className=" text-sm font-medium text-gray-700">
                Gender
              </label>

              {/* Radio Options */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Male</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="text-[#926848] focus:ring-[#926848]"
                  />
                  <span>Female</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="bg-white/50 p-6 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Scissors className="w-5 h-5 mr-2 text-[#926848]" />
              Job Details
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                      errors.employeeId ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="SAL001"
                  />
                  {errors.employeeId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeId}
                    </p>
                  )}
                </div> */}
       <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className={`w-full px-3 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
    errors.role ? "border-red-500" : "border-gray-300"
  }`}
>
  <option value="">Select Role</option>
  {roles.map((r) => (
    <option key={r.id} value={r.id}>
      {r.name}
    </option>
  ))}
</select>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                      errors.position ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.position}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                      errors.department ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent"
                    placeholder="Years of experience"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Salary & Skills */}
          <div className="bg-white/50 p-6 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-[#926848]" />
              Salary & Skills
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Salary (Monthly)
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent"
                    placeholder="Rs. 0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent"
                  placeholder="Courses and certificates"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white/50 p-6 rounded-lg shadow-sm border border-pink-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#926848]" />
              Additional Notes
            </h3>

            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#926848] focus:border-transparent"
              placeholder="Any special instructions or comments..."
            />
          </div>

          <button
            type="submit"
            className="relative overflow-hidden px-7 py-2 bg-pink-200 bg-gradient-to-r from-[#cd986f] to-[#f0b587]  text-white font-semibold  hover:opacity-90 transition duration-300 rounded-xl hover:text-pink-100 group w-full"
          >
            <span className="relative z-10">
              Add Staff Member
            </span>
            <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-[#926848] to-[#926848] text-white/50 transition-all duration-500 group-hover:w-full"></span>
          </button>
        </div>
      </div>
    </form>
  );
}
