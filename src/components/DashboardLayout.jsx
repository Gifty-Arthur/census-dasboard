import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiPackage,
  FiCloud,
  FiChevronRight
} from "react-icons/fi";

const DashboardLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const showHeader = location.pathname !== '/login';

  const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Enumerators", path: "/enumerators", icon: FiUsers },
    { name: "Supervisors", path: "/supervisors", icon: FiUserCheck },
    { name: "Households", path: "/households", icon: FiPackage },
    { name: "Backup", path: "/backup", icon: FiCloud },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && <Header />}
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">
              <span className="text-blue-400">Census</span>Pro
            </h2>
            <p className="text-sm text-gray-400 mt-1">Management System</p>
          </div>
          
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? "text-blue-400" : "text-gray-400"}`} />
                <span className="ml-3 font-medium">{item.name}</span>
                {isActive(item.path) && (
                  <FiChevronRight className="ml-auto w-4 h-4 text-blue-400" />
                )}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;