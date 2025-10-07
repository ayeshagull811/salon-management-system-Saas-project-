"use client";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  CalendarDays,
  Scissors,
  Users,
  Package,
  DollarSign,
  Tag,
  BarChart,
  LogOut,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { userId, salonId } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeItem, setActiveItem] = useState("dashboard");
  const [salonName, setSalonName] = useState(null);

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };
  // Inside Sidebar component

  const handleLogout = () => {
    // Clear user session/local storage
    localStorage.removeItem("user");

    // Optionally clear other stored data if needed
    // localStorage.clear();

    // Redirect to login page
    window.location.href = "/login"; // replace with your login route
  };

  const handleItemClick = (itemKey) => {
    setActiveItem(itemKey);
  };

  // 🔹 Menu Items
  const menuItems = [
    {
      name: "User Dashboard",
      icon: LayoutDashboard,
      path: `/userdashboard/${userId}`,
      key: "user-dashboard",
    },
    {
      name: "Dashboard",
      icon: Home,
      path: `/userdashboard/${userId}/salons/${salonId}`,
      key: "dashboard",
    },
    {
      name: "Roles",
      icon: Users,
      path: `/userdashboard/${userId}/salons/${salonId}/roles`,
      key: "roles",
    },
    {
      name: "Admin",
      icon: User,
      path: `/userdashboard/${userId}/salons/${salonId}/adminForm`,
      key: "admin",
    },
    {
      name: "Appointments",
      icon: CalendarDays,
      path: `/userdashboard/${userId}/salons/${salonId}/appointments`,
      key: "appointments",
    },
    {
      name: "Services",
      icon: Scissors,
      path: `/userdashboard/${userId}/salons/${salonId}/services`,
      key: "services",
      hasSubmenu: true,
      submenu: [
        {
          name: "All Services",
          path: `/userdashboard/${userId}/salons/${salonId}/services/all`,
          key: "all-services",
        },
        {
          name: "Add Service",
          path: `/userdashboard/${userId}/salons/${salonId}/services/add`,
          key: "add-service",
        },
        {
          name: "Categories",
          path: `/userdashboard/${userId}/salons/${salonId}/services/categories`,
          key: "service-categories",
        },
      ],
    },
    {
      name: "Staff",
      icon: Users,
      path: `/userdashboard/${userId}/salons/${salonId}/staff`,
      key: "staff",
      hasSubmenu: true,
      submenu: [
        {
          name: "All Staff",
          path: `/userdashboard/${userId}/salons/${salonId}/staff/all`,
          key: "all-staff",
        },
        {
          name: "Add Staff",
          path: `/userdashboard/${userId}/salons/${salonId}/staff/add`,
          key: "add-staff",
        },
        // {
        //   name: "Staff Schedule",
        //   path: `/userdashboard/${userId}/salons/${salonId}/staff/schedule`,
        //   key: "staff-schedule",
        // },
      ],
    },
    // {
    //   name: "Customers",
    //   icon: User,
    //   path: `/userdashboard/${userId}/salons/${salonId}/customers`,
    //   key: "customers",
    //   hasSubmenu: true,
    //   submenu: [
    //     {
    //       name: "All Customers",
    //       path: `/userdashboard/${userId}/salons/${salonId}/customers/all`,
    //       key: "all-customers",
    //     },
    //     {
    //       name: "Customer History",
    //       path: `/userdashboard/${userId}/salons/${salonId}/customers/history`,
    //       key: "customer-history",
    //     },
    //   ],
    // },
    {
      name: "Inventory",
      icon: Package,
      path: `/userdashboard/${userId}/salons/${salonId}/inventory`,
      key: "inventory",
    },
    {
      name: "Billing",
      icon: DollarSign,
      path: `/userdashboard/${userId}/salons/${salonId}/billing`,
      key: "billing",
      hasSubmenu: true,
      submenu: [
        {
          name: "All Bills",
          path: `/userdashboard/${userId}/salons/${salonId}/billing/all`,
          key: "all-bills",
        },
        {
          name: "Pending Payments",
          path: `/userdashboard/${userId}/salons/${salonId}/billing/pending`,
          key: "pending-payments",
        },
        {
          name: "Payment History",
          path: `/userdashboard/${userId}/salons/${salonId}/billing/history`,
          key: "payment-history",
        },
      ],
    },
    {
      name: "Offers",
      icon: Tag,
      path: `/userdashboard/${userId}/salons/${salonId}/offers`,
      key: "offers",
    },
    {
      name: "Reports",
      icon: BarChart,
      path: `/userdashboard/${userId}/salons/${salonId}/reports`,
      key: "reports",
      hasSubmenu: true,
      submenu: [
        {
          name: "Daily Reports",
          path: `/userdashboard/${userId}/salons/${salonId}/reports/daily`,
          key: "daily-reports",
        },
        {
          name: "Weekly Reports",
          path: `/userdashboard/${userId}/salons/${salonId}/reports/weekly`,
          key: "weekly-reports",
        },
        {
          name: "Monthly Reports",
          path: `/userdashboard/${userId}/salons/${salonId}/reports/monthly`,
          key: "monthly-reports",
        },
        {
          name: "Staff Performance",
          path: `/userdashboard/${userId}/salons/${salonId}/reports/staff`,
          key: "staff-performance",
        },
      ],
    },
  ];

  useEffect(() => {
    if (salonId) {
      const user = JSON.parse(localStorage.getItem("user"));
      const salon = user?.salons?.find((s) => s._id === salonId);
      if (salon) {
        setSalonName(salon.name);
      }
    }
  }, [salonId]);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-[#b6845f] text-white flex flex-col transition-all duration-300 ${
          isOpen ? "w-60" : "w-14"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#b6845f]">
          {isOpen && (
            <span className="text-lg font-bold">
              {salonId ? salonName || "My Salon" : "Admin Panel"}
            </span>
          )}
          {isOpen ? (
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          ) : (
            <Menu className="cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {!salonId ? (
            <div className="flex flex-col gap-4 text-sm">
              {/* User Dashboard Icon */}
              <Link
                href={`/userdashboard/${userId}`}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#926848] transition-colors duration-200"
                onClick={() => handleItemClick("user-dashboard")}
              >
                <LayoutDashboard size={20} />
                {isOpen && <span>User Dashboard</span>}
              </Link>
              {/* <Link
      href={`/userdashboard/${userId}/roles`}
      className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#926848] transition-colors duration-200"
      onClick={() => handleItemClick("roles")}
    >
      <Users size={20} />
      {isOpen && <span>Roles</span>}
    </Link>
  <Link
      href={`/userdashboard/${userId}/adminForm`}
      className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#926848] transition-colors duration-200"
      onClick={() => handleItemClick("adminForm")}
    >
      <User size={20} />
      {isOpen && <span>Admin</span>}
    </Link> */}
              {/* Register Salon Button */}
              <Link
                href={`/userdashboard/${userId}/salons/addsalon`}
                className="bg-[#926848] px-3 py-2 rounded text-center hover:bg-[#7a5236] transition"
              >
                Register Salon
              </Link>
            </div>
          ) : (
            menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="mb-1">
                  {/* Main Menu Item */}
                  <div
                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-[#926848] cursor-pointer transition-colors duration-200`}
                    onClick={() => {
                      if (item.hasSubmenu && isOpen) {
                        toggleMenu(item.key);
                      } else {
                        handleItemClick(item.key);
                        window.location.href = item.path;
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={20} />
                      {isOpen && <span>{item.name}</span>}
                    </div>

                    {item.hasSubmenu && isOpen && (
                      <div className="transition-transform duration-200">
                        {expandedMenus[item.key] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submenu Items */}
                  {item.hasSubmenu && expandedMenus[item.key] && isOpen && (
                    <div className="ml-4 mt-1 border-l-2 border-[#926848]">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.path}
                          className={`flex items-center gap-2 p-2 pl-4 rounded-lg hover:bg-[#926848] transition-colors duration-200 text-sm ${
                            activeItem === subItem.key ? "bg-[#926848]" : ""
                          }`}
                          onClick={() => handleItemClick(subItem.key)}
                        >
                          <span>{subItem.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Settings */}
          <Link
            href={`/userdashboard/${userId}/settings`}
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-[#926848] mt-4 transition-colors duration-200 ${
              activeItem === "settings" ? "bg-[#926848]" : ""
            }`}
            onClick={() => handleItemClick("settings")}
          >
            <Settings size={20} />
            {isOpen && <span>Settings</span>}
          </Link>
        </nav>

        <div className="p-2 border-t border-[#dba072]">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#926848] w-full text-left"
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Clear local storage and redirect
                  localStorage.removeItem("user");
                  window.location.href = "/login"; // replace with your login route
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
