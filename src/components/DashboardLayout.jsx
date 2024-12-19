import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/5 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Census Management</h2>
        <ul className="space-y-2">
          <li>
            <a href="/dasboard" className="block p-2 hover:bg-blue-700 ">
              Dashboard
            </a>
          </li>

          <li>
            <a href="/manage-records" className="block p-2 hover:bg-blue-700">
              Enumerators
            </a>
          </li>
          <li>
            <a href="/backup" className="block p-2 hover:bg-blue-700">
              Supervisors
            </a>
          </li>
          <li>
            <a href="/backup" className="block p-2 hover:bg-blue-700">
              Households
            </a>
          </li>
          <li>
            <a href="/backup" className="block p-2 hover:bg-blue-700">
              Roster
            </a>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
