"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import staff from '@/assets/stafff.png'
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ChangePasswordForm() {
  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
   const params = useParams();  
  const employeeId = params.id;   // 👈 yahan se milay ga
  console.log("Employee ID from URL:", employeeId);
const [changePasswordForm, setChangePasswordForm] = useState({ password:"",confirmpassword:"", newPassword:"" });
console.log("change password",changePasswordForm);

  const handleChange = (e) =>
    setChangePasswordForm({ ...changePasswordForm, [e.target.name]: e.target.value });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Validation
     const { password, newPassword, confirmpassword } = changePasswordForm;
    if (!password || !newPassword || !confirmpassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmpassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }
    if (password === newPassword) {
      setMessage("New password cannot be the same as current password.");
      return;
    }
 try {
      // const employeeId = localStorage.getItem("employeeId");
      console.log("employ id",employeeId);
       
      if (!employeeId) {
        return setMessage("Employee ID not found. Please login again.");
      }

      const res = await axios.put(
        `http://localhost:8000/employee/changepassword/${employeeId}`,
       changePasswordForm
      );

      setMessage(res.data.message || "Password changed successfully!");
      // setCurrentPassword("");
      // setNewPassword("");
      // setConfirmPassword("");
    } catch (error) {
          alert(error.response?.data?.message || 'Error');
    }
  
  };

  return (
    <motion.div 
     initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative h-100 bg-pink-400 flex items-center justify-center"
      style={{
        borderBottomLeftRadius: "40% 40%",
        borderBottomRightRadius: "40% 40%",
      }}>
       <div className="absolute top-100 left-220 transform -translate-x-1/2 -translate-y-1/4 z-20">
             <Image 
               src={staff} 
               alt="Staff" 
               width={400}     
               height={300}    
               className="drop-shadow-lg rotate-7"  
             />
           </div>
           <div className="absolute top-10 inset-0 bg-pink-400 opacity-30 rounded-b-[40%]" />
           <motion.form 
           onSubmit={handleSubmit}
        action=""
        className="absolute top-15 w-full justify-center align-center max-w-md p-8 text-pink-700 sm:p-10 flex flex-col  border border-white/20 rounded-xl bg-white/30 backdrop-blur-md shadow-lg"
      >
            <div className="flex justify-center items-center mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        Change Password
      </h2>
      </div>
      {message && (
        <div
          className={`mb-4 text-center font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

     
        {/* Current Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">Current Password</label>
          <input
            name="password"
            type="password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={changePasswordForm.password}
            onChange={handleChange}
          />
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={changePasswordForm.newPassword}
            onChange={handleChange}
          />
        </div>

     
         <div className="mb-6 relative">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            name="confirmpassword"
              value={changePasswordForm.confirmpassword}
            onChange={handleChange}
          />
        </div>

       <button type="submit" className="relative overflow-hidden px-7 py-2 bg-pink-200/30w-full bg-gradient-to-r from-pink-700 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-pink-100 group">
          <span className="relative z-10">
            <Link href="admindashboard">Login</Link>
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-pink-400 text-pink-700 transition-all duration-500 group-hover:w-full"></span>
        </button>
      
           </motion.form>
    </motion.div>
    
  );
}
