import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dasboard = () => {
  const [summary, setSummary] = useState({
    supervisorsCount: 0,
    householdsCount: 0,
    enumeratorsCount: 0,
    activitiesCount: 0,
    totalPopulation: 0,
    averageHouseholdSize: 0,
    literacyRate: 0,
  });

  useEffect(() => {
    // Fetch summary data from the API
    fetch(`${API_URL}/dashboard-summary`)
      .then((response) => response.json())
      .then((data) => setSummary(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const barData = {
    labels: ["Supervisors", "Households", "Enumerators", "Activities"],
    datasets: [
      {
        label: "Counts",
        data: [
          summary.supervisorsCount,
          summary.householdsCount,
          summary.enumeratorsCount,
          summary.activitiesCount,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const pieData = {
    labels: ["Supervisors", "Households", "Enumerators", "Activities"],
    datasets: [
      {
        label: "Counts",
        data: [
          summary.supervisorsCount,
          summary.householdsCount,
          summary.enumeratorsCount,
          summary.activitiesCount,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Supervisors</h2>
          <p className="text-gray-700">Total: {summary.supervisorsCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Households</h2>
          <p className="text-gray-700">Total: {summary.householdsCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Enumerators</h2>
          <p className="text-gray-700">Total: {summary.enumeratorsCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Total Population</h2>
          <p className="text-gray-700">Total: {summary.totalPopulation}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Average Household Size</h2>
          <p className="text-gray-700">Average: {summary.averageHouseholdSize}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Literacy Rate</h2>
          <p className="text-gray-700">Rate: {summary.literacyRate}%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Counts Bar Chart</h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Counts Pie Chart</h2>
          <div style={{ height: "300px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;