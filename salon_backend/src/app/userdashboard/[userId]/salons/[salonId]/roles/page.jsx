"use client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Users, Shield, X, Check } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/axiosInstance";

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState([]);
    const { salonId } = useParams(); 
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Your original backend connection code - unchanged
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch roles - your original code unchanged
const fetchRoles = async () => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

   const res = await axiosInstance.get(`/getrole?salonId=${salonId}`, {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});


    console.log("roles by salon id", res.data);
    setRoles(res.data); // Axios data is already parsed
  } catch (err) {
    console.error("Error fetching role:", err.response?.data || err.message);
    return null;
  }
};

  // Fetch permissions - your original code unchanged
 const fetchPermissions = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axiosInstance.post(
      "/permission/get",
      {}, // empty body
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      }
    );
    console.log("Permissions:", res.data);
    setPermissions(res.data);
  } catch (err) {
    console.error("Error fetching permissions:", err.response?.data || err.message);
  }
};

  // Create Role with Permissions - your original code unchanged
const createRole = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axiosInstance.post(
      "/role/createrole",
      {
        name: newRole,                // ✅ role ka name bhejo
        permissionIds: selectedPermissions, 
        salonId: salonId,             // ✅ salon ke hisaab se role create hoga
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("✅ Role created:", res.data);
    fetchRoles(); // refresh roles list after create
    setShowModal(false);
  } catch (err) {
    console.error("❌ Error creating role:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
    }
  }
};



  // Handle checkbox select - your original code unchanged
  const handlePermissionToggle = (permId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#cf9060] to-[#e1a577] bg-clip-text text-transparent">
        Roles Management
      </h1>

      {/* Enhanced Roles Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-[blue-50] to-purple-50 px-6 py-5 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-[#926848] flex items-center gap-3">
                <div className="p-2 bg-[#926848] rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Roles Management
              </h2>
              <p className="text-slate-600 text-sm mt-1">Manage user roles and permissions</p>
            </div>
            <button
              className="bg-gradient-to-r from-[#926848] to-[#96745a] hover:from-[#bf9a7d] hover:to-[#cd9f7c] text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Role
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role, idx) => (
                <tr key={role.id} className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 transition-all duration-200 group">
                  <td className="px-6 py-5">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#f4d9c4] to-[#f0c19c] rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-slate-700">{idx + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-r from-[#a78469] to-[#cba88d] rounded-xl shadow-sm">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-base font-semibold text-slate-900">{role.name}</span>
                        <p className="text-xs text-slate-500">User Role</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {role.Permissions?.length > 0 ? (
                        role.Permissions.map((p, permIdx) => (
                          <span
                            key={permIdx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            {p.name}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                          No permissions assigned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2.5 text-[#926848] hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
                        title="Edit Role"
                        onClick={() => console.log('Edit role:', role.id)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
                        title="Delete Role"
                        onClick={() => console.log('Delete role:', role.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {roles.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">No roles found. Create your first role!</p>
          </div>
        )}
      </div>

      {/* Enhanced Add Role Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#926848] to-[#926848] rounded-lg">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  Create New Role
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Role Name</label>
                <input
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-slate-50 focus:bg-white"
                  placeholder="Enter role name (e.g., Manager, Editor)"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Assign Permissions ({selectedPermissions.length} selected)
                </label>
                <div className="border border-slate-200 rounded-xl p-4 max-h-64 overflow-y-auto bg-slate-50">
                  <div className="space-y-3">
                    {permissions.map((perm) => (
                      <label key={perm.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white transition-colors">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(perm.id)}
                            onChange={() => handlePermissionToggle(perm.id)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                            selectedPermissions.includes(perm.id)
                              ? 'bg-gradient-to-r from-[#926848] to-[#c58c60] border-transparent shadow-sm'
                              : 'border-slate-300 group-hover:border-blue-400 bg-white'
                          }`}>
                            {selectedPermissions.includes(perm.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                          {perm.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <div className="flex justify-end gap-3">
                <button
                  className="px-6 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors font-medium"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2.5 bg-gradient-to-r from-[#926848] to-[#c68e63] hover:from-[#a48065] hover:to-[#c69d7d] text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  onClick={createRole}
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}