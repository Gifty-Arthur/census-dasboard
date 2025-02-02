import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard-summary`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-red-50 rounded-lg flex items-center gap-3 max-w-md">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-red-800">Error loading data</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">Please check back later or verify your data sources</p>
        </div>
      </div>
    );
  }

  // Chart data configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  const barData = {
    labels: ["Supervisors", "Households", "Enumerators", "Activities"],
    datasets: [{
      label: "Counts",
      data: [
        summary.supervisorsCount || 0,
        summary.householdsCount || 0,
        summary.enumeratorsCount || 0,
        summary.activitiesCount || 0,
      ],
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      borderRadius: 12,
      borderSkipped: false,
    }]
  };

  const pieData = {
    labels: ["Supervisors", "Households", "Enumerators", "Activities"],
    datasets: [{
      label: "Counts",
      data: [
        summary.supervisorsCount || 0,
        summary.householdsCount || 0,
        summary.enumeratorsCount || 0,
        summary.activitiesCount || 0,
      ],
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      borderWidth: 0,
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { 
              title: "Supervisors",
              value: summary.supervisorsCount,
              icon: '👨💼',
              bg: 'bg-blue-100',
              text: 'text-blue-600'
            },
            { 
              title: "Households",
              value: summary.householdsCount,
              icon: '🏠',
              bg: 'bg-green-100',
              text: 'text-green-600'
            },
            { 
              title: "Enumerators",
              value: summary.enumeratorsCount,
              icon: '📋',
              bg: 'bg-amber-100',
              text: 'text-amber-600'
            },
            { 
              title: "Total Population",
              value: summary.totalPopulation,
              icon: '👥',
              bg: 'bg-indigo-100',
              text: 'text-indigo-600'
            },
            { 
              title: "Avg Household Size",
              value: summary.averageHouseholdSize?.toFixed(2),
              icon: '📏',
              bg: 'bg-purple-100',
              text: 'text-purple-600'
            },
            { 
              title: "Literacy Rate",
              value: `${summary.literacyRate}%`,
              icon: '🎓',
              bg: 'bg-emerald-100',
              text: 'text-emerald-600'
            },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.text} w-14 h-14 rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribution Overview</h2>
            <div className="h-80">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Percentage Breakdown</h2>
            <div className="h-80">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;