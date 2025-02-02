import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const showHeader = location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {showHeader && <Header />}
      <div className="flex flex-1">
        <aside className="w-1/5 bg-blue-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Census Management</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className={`block p-2 hover:bg-blue-700 ${isActive("/dashboard") ? "bg-blue-700" : ""}`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/enumerators"
                className={`block p-2 hover:bg-blue-700 ${isActive("/enumerators") ? "bg-blue-700" : ""}`}
              >
                Enumerators
              </a>
            </li>
            <li>
              <a
                href="/supervisors"
                className={`block p-2 hover:bg-blue-700 ${isActive("/supervisors") ? "bg-blue-700" : ""}`}
              >
                Supervisors
              </a>
            </li>
            <li>
              <a
                href="/households"
                className={`block p-2 hover:bg-blue-700 ${isActive("/households") ? "bg-blue-700" : ""}`}
              >
                Households
              </a>
            </li>
            <li>
              <a
                href="/backup"
                className={`block p-2 hover:bg-blue-700 ${isActive("/backup") ? "bg-blue-700" : ""}`}
              >
                Backup
              </a>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Outlet /> {/* This is where the nested routes will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;