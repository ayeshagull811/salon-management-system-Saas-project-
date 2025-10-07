"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Package, AlertCircle } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import axiosInstance from "@/axiosInstance";

export default function SalonInventory({ params }) {
  const { salonId } = useParams(); // ✅ Next.js params
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minStock: "",
    price: "",
  });

  const categories = ["Hair Care", "Coloring", "Styling", "Treatment", "Tools", "Other"];
  const units = ["Bottle", "Box", "Piece", "Kg", "Liter", "Pack"];

// ✅ Helper function
const getApi = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return axiosInstancesInstance.create({
    baseURL: "/inventory",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Fetch inventory
const fetchInventory = async () => {
  try {
    const res = await getApi().get(`/getinventory/${salonId}`);
    setProducts(res.data);
  } catch (err) {
    console.error("❌ fetchInventory error:", err);
  }
};

// ✅ Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      // Update
      await getApi().put(`/updateinventory/${editingId}`, {
        ...formData,
        salonId,
      });
    } else {
      // Create
      await getApi().post(`/postinventory`, {
        ...formData,
        salonId,
      });
    }
    fetchInventory();
    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      minStock: "",
      price: "",
    });
    setShowForm(false);
    setEditingId(null);
  } catch (err) {
    console.error("❌ handleSubmit error:", err);
  }
};

// ✅ Delete
const handleDelete = async (id) => {
  try {
    await getApi().delete(`/deleteinventory/${id}`);
    fetchInventory();
  } catch (err) {
    console.error("❌ handleDelete error:", err);
  }
};

// ✅ Edit
const handleEdit = (item) => {
  setFormData({
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    minStock: item.minStock,
    price: item.price,
  });
  setEditingId(item._id);
  setShowForm(true);
};

  // ✅ Delete product
//   const handleDelete = async (id) => {
//     if (!confirm("Kya aap is product ko delete karna chahte hain?")) return;

//     try {
//       await api.delete(`/deleteinventory/${id}`);
//       fetchInventory();
//     } catch (err) {
//       console.error("❌ handleDelete error:", err);
//       alert("Delete failed");
//     }
//   };

  // ✅ Cancel form
  const handleCancel = () => {
    setFormData({ name: "", category: "", quantity: "", unit: "", minStock: "", price: "" });
    setEditingId(null);
    setShowForm(false);
  };
  // ✅ Handle input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const lowStockProducts = products.filter((p) => p.quantity <= p.minStock);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#926848] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} />
            Naya Product
          </button>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500" size={24} />
              <p className="text-red-700">
                {lowStockProducts.length} products ki quantity kam hai:{" "}
                {lowStockProducts.map((p) => p.name).join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#926848] text-white">
              <tr>
                <th className="px-3 py-2 text-left">Product</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-center">Qty</th>
                <th className="px-3 py-2 text-center">Unit</th>
                <th className="px-3 py-2 text-center">Min</th>
                <th className="px-3 py-2 text-right">Price</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 py-2">{product.name}</td>
                  <td className="px-3 py-2">{product.category}</td>
                  <td className="px-3 py-2 text-center">{product.quantity}</td>
                  <td className="px-3 py-2 text-center">{product.unit}</td>
                  <td className="px-3 py-2 text-center">{product.minStock}</td>
                  <td className="px-3 py-2 text-right">Rs. {product.price}</td>
                  <td className="px-3 py-2 text-center">
                    {product.quantity <= product.minStock ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Low</span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">OK</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center flex gap-2 justify-center">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>Abhi tak koi product add nahi hua</p>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">{editingId ? "Update Product" : "Naya Product Add Karein"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name*" className="border p-3 rounded-lg" />
                <select name="category" value={formData.category} onChange={handleInputChange} className="border p-3 rounded-lg">
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option key={cat}>{cat}</option>)}
                </select>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity*" className="border p-3 rounded-lg" />
                <select name="unit" value={formData.unit} onChange={handleInputChange} className="border p-3 rounded-lg">
                  <option value="">Select Unit</option>
                  {units.map((unit) => <option key={unit}>{unit}</option>)}
                </select>
                <input type="number" name="minStock" value={formData.minStock} onChange={handleInputChange} placeholder="Minimum Stock*" className="border p-3 rounded-lg" />
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (PKR)*" className="border p-3 rounded-lg" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSubmit} className="flex-1 bg-[#926848] text-white py-3 rounded-lg">
                  {editingId ? "Update" : "Add"}
                </button>
                <button onClick={handleCancel} className="flex-1 bg-gray-300 py-3 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
