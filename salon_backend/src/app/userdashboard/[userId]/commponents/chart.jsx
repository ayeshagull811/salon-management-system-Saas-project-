"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 45 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 15 },
  { name: "No Show", value: 5 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171", "#9ca3af"];

export default function AppointmentPieChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-auto">
      <h2 className="text-lg font-bold mb-4  text-amber-800">Appointment Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
