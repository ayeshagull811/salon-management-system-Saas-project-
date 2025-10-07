// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function RolesPage() {
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [newRole, setNewRole] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchRoles();
//     fetchPermissions();
//   }, []);

//   const fetchRoles = async () => {
//     const res = await axios.get("/role", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setRoles(res.data);
//   };

//   const fetchPermissions = async () => {
//     const res = await axios.get("/permission", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setPermissions(res.data);
//   };

//   const createRole = async () => {
//     await axios.post(
//       "/role",
//       { name: newRole },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchRoles();
//     setNewRole("");
//   };

//   const assignPermissions = async (roleId, selectedPermissions) => {
//     await axios.put(
//       `/role/${roleId}`,
//       { permissionIds: selectedPermissions },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchRoles(); // refresh list
//     alert("Permissions updated!");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Roles & Permissions</h2>

//       <div className="mb-6">
//         <input
//           type="text"
//           value={newRole}
//           onChange={(e) => setNewRole(e.target.value)}
//           placeholder="New Role Name"
//           className="border px-2 py-1 mr-2"
//         />
//         <button
//           onClick={createRole}
//           className="bg-blue-500 text-white px-3 py-1"
//         >
//           Add Role
//         </button>
//       </div>

//       {roles.map((role) => (
//         <div key={role.id} className="border p-4 mb-3 rounded">
//           <h3 className="font-semibold">{role.name}</h3>
//           <div className="grid grid-cols-2 gap-2">
//             {permissions.map((perm) => (
//               <label key={perm.id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   onChange={(e) => {
//                     const selected = e.target.checked
//                       ? [...(role.permissions?.map((p) => p.id) || []), perm.id]
//                       : role.permissions
//                           ?.map((p) => p.id)
//                           .filter((p) => p !== perm.id);
//                     assignPermissions(role.id, selected);
//                   }}
//                   checked={role.permissions?.some((p) => p.id === perm.id)}
//                 />
//                 <span className="ml-2">{perm.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
