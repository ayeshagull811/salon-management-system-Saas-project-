"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  Camera,
  ToggleLeft,
  ToggleRight,
  Upload,
  X,
} from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import axiosInstance from "@/axiosInstance";

export default function ServiceForm() {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const params = useParams();
  const salonId = params.salonId;
  console.log(salonId);
  const [service, setService] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    currency: "PKR",
    discount: 0,
    duration: "",
    employee: "",
    status: true,
    tags: "",
    image: null,
    features: [""],
    imagePreview: null,
  });
  const serviceCategories = [
    { id: 1, name: "Hair" },
    { id: 2, name: "Makeup" },
    { id: 3, name: "Skincare" },
    { id: 4, name: "Nails" },
    { id: 5, name: "Bridal" },
    { id: 6, name: "Spa" },
    { id: 7, name: "Waxing" },
    { id: 8, name: "Threading" },
    { id: 9, name: "Massage" },
    { id: 10, name: "Henna" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file (JPEG, PNG, WebP)",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setService((prev) => ({
          ...prev,
          image: file,
          imagePreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };
  const removeImage = () => {
    setService((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("category", service.category);
      formData.append("description", service.description);
      formData.append("price", service.price);
      formData.append("currency", service.currency);
      formData.append("discount", service.discount);
      formData.append("duration", service.duration);
      formData.append("employee", service.employee);
      formData.append("status", service.status);
      formData.append("tags", service.tags);
      formData.append("SalonId", salonId);
      formData.append("features", JSON.stringify(service.features)); // ✅ array as JSON
  if (service.image) formData.append("image", service.image);
      // Object.keys(service).forEach((key) => {
      //   if (key === "features") {
      //     formData.append("features", JSON.stringify(service.features)); // 👈 array ko JSON banake bhejna
      //   } else if (key === "image") {
      //     if (service.image) formData.append("image", service.image); // 👈 image bhejna
      //   } else {
      //     formData.append(key, service[key]);
      //   }
      // });
      // formData.append("SalonId", salonId);
      const res = await axiosInstance.post(
        "/services/services",
        formData, // 👈 yahan service nahi, formData bhejna hai
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: Infinity, // 👈 413 avoid karne ke liye
        }
      );

      if (res.data.success) {
        alert("Service created successfully!");
        // reset form...
      } else {
        alert(res.data.message || "Error saving service");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...service.features];
    newFeatures[index] = value;
    setService((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };
  const addFeature = () => {
    setService((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };
  const removeFeature = (index) => {
    const newFeatures = service.features.filter((_, i) => i !== index);
    setService((prev) => ({
      ...prev,
      features: newFeatures.length ? newFeatures : [""],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-amber-700">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1 text-gray-500">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            placeholder="Hair Cut"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-500">
            Category
          </label>
          <select
            name="category"
            value={service.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
          >
            <option value="">-- Select Category --</option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-500">
            Description
          </label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            placeholder="Service description..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-500">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              max={2147483647}
              placeholder="1200"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-500">
              Currency
            </label>
            <select
              name="currency"
              value={service.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
            >
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-500">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              value={service.discount}
              onChange={handleChange}
              placeholder="10" // 10% instead of "10% off"
              min={0}
              max={100}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-500">
              Duration (min)
            </label>
            <input
              type="number"
              name="duration"
              value={service.duration}
              onChange={handleChange}
              placeholder="45"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-500">
              Employee
            </label>
            <input
              type="text"
              name="employee"
              value={service.employee}
              onChange={handleChange}
              placeholder="Employee Name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-500 mb-2">
            Service Features
          </h2>

          <div className="space-y-3">
            {service.features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder={`Feature ${index + 1}`}
                />
                {service.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {errors.features && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.features}
              </p>
            )}

            <button
              type="button"
              onClick={addFeature}
              className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
            >
              + Add Another Feature
            </button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div>
            <h2 className="text-xl font-semibold text-gray-500 mb-2">
              Service Image
            </h2>

            <div className="space-y-4">
              {service.imagePreview ? (
                <div className="relative">
                  <img
                    src={service.imagePreview}
                    alt="Service preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    Click to upload image
                    <br />
                    <span className="text-xs text-gray-400">
                      JPEG, PNG, WebP (max 5MB)
                    </span>
                  </p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
              />

              {errors.image && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.image}
                </p>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                {service.imagePreview ? "Change Image" : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-[#976a47] text-white py-2 rounded-lg hover:bg-[#bc8860] transition"
          >
            Save Service
          </button>
          <button
            type="reset"
            onClick={() => setService({ ...service, preview: null })}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
