import React, { useState, useEffect } from "react";

const Dasboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = () => {
      const dummyData = [
        { id: 1, name: "John Doe", role: "Supervisor", region: "North" },
        { id: 2, name: "Jane Smith", role: "Enumerator", region: "South" },
        { id: 3, name: "Alice Johnson", role: "Supervisor", region: "East" },
        { id: 4, name: "Bob Brown", role: "Enumerator", region: "West" },
      ];
      setData(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-gray-700">Role: {item.role}</p>
            <p className="text-gray-700">Region: {item.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dasboard;