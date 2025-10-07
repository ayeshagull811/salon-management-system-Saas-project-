"use client";
import { User } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function NewBooking() {
    const data = [
    { name: "Jan", revenue: 30 },
    { name: "Feb", revenue: 60 },
    { name: "Mar", revenue: 70 },
    { name: "Apr", revenue: 20 },
    { name: "May", revenue: 40 },
    { name: "Jun", revenue: 80 },
    { name: "Jul", revenue: 25 },
    { name: "Aug", revenue: 50 },
    { name: "Sep", revenue: 10 },
    { name: "Oct", revenue: 65 },
    { name: "Nov", revenue: 45 },
    { name: "Dec", revenue: 35 },
  ];
  return (
      <div className="bg-white shadow-md rounded-2xl p-4">
      {/* Header with icon + title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-700">📊 Booking</h1>
        <User className="w-5 h-5 text-amber-500" />
      </div>
 <ResponsiveContainer width="100%" height={150}>
  <BarChart data={data}>
    <h1>BOOKING</h1>
    <XAxis 
      dataKey="name" 
      interval={0} 
      tick={{ fontSize: 12, fill: "#555" }} 
      angle={-45} 
      textAnchor="end" 
    />
    <YAxis />
    <Tooltip />
    <Bar dataKey="revenue" fill="#CA9871" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
</div>
  );
}
