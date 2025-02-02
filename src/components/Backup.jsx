import React from "react";
import { API_URL } from "../constants";

const Backup = () => {
  const handleBackup = () => {
    fetch(`${API_URL}/backup-database/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Backup successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Backup failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Backup</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
          onClick={handleBackup}
        >
          Create Backup
        </button>
      </div>
    </div>
  );
};

export default Backup;