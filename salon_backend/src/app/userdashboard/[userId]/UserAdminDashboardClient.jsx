"use client";
import ProtectedRoute from "@/protectiveRoute/protectedRoute";
import Sidebar from "./commponents/sidebar";
import NavBar from "./commponents/navBar";


export default function UserAdminDashboardClient({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <NavBar />
          <main className="p-6 flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
