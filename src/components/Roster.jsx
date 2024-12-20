import React from "react";
import records from "./data";

const Roster = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-poppins">Enumerator</h1>
      {/* Records Table */}
      <table className="table-auto w-full bg-white border-collapse border border-gray-300 font-poppins">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border px-4 py-2 text-xl">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Number</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="border px-4 py-2 text-sm">{record.id}</td>
              <td className="border px-4 py-2 text-md">{record.name}</td>
              <td className="border px-4 py-2">{record.email}</td>
              <td className="border px-4 py-2">{record.number}</td>
              <td className="border px-4 py-2 space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  View
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roster;
