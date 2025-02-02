import React from "react";
import { API_URL } from "../constants";

const Supervisors = () => {
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    // Fetch records from API
    fetch(`${API_URL}/supervisors/`)
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error("Error:", error));
  }, []); // Empty dependency array means this effect will only run once on mount

  function createRecord(data) {
    fetch(`${API_URL}/supervisors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newRecord) => {
        setRecords((prevRecords) => [...prevRecords, newRecord]);
      })
      .catch((error) => console.error("Error:", error));
  }

  function deleteRecord(supervisorid) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`${API_URL}/supervisors/${supervisorid}/`, {
        method: "DELETE",
      })
        .then(() =>
          setRecords((prevRecords) =>
            prevRecords.filter((record) => record.supervisorid !== supervisorid)
          )
        )
        .catch((error) => console.error("Error:", error));
    }
  }

  function updateRecord(supervisorid, data) {
    fetch(`${API_URL}/supervisors/${supervisorid}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedRecord) =>
        setRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.supervisorid === supervisorid ? updatedRecord : record
          )
        )
      )
      .catch((error) => console.error("Error:", error));
  }

  // Create a new record form
  const [newRecordFormVisible, setNewRecordFormVisible] = React.useState(false);

  const handleNewRecordToggle = () => {
    setNewRecordFormVisible(!newRecordFormVisible);
  };

  const handleNewRecordSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      signature: formData.get("signature"),
      phonenumber: formData.get("phonenumber"),
      date_assigned: new Date().toISOString().split("T")[0],
    };
    createRecord(data);
    setNewRecordFormVisible(false);
  };

  // Update a record form
  const [updateRecordFormVisible, setUpdateRecordFormVisible] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  const handleUpdateRecordToggle = (record) => {
    setSelectedRecord(record);
    setUpdateRecordFormVisible(!updateRecordFormVisible);
  };

  const handleUpdateRecordSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      signature: formData.get("signature"),
      phonenumber: formData.get("phonenumber"),
      date_assigned: new Date().toISOString().split("T")[0],
    };
    updateRecord(selectedRecord.supervisorid, data);
    setUpdateRecordFormVisible(false);
  };

  // view single record
  const [viewRecordModalVisible, setViewRecordModalVisible] = React.useState(false);
  const [viewRecord, setViewRecord] = React.useState(null);

  const handleViewRecordToggle = (supervisorid) => {
    fetchRecord(supervisorid);
    setViewRecordModalVisible(!viewRecordModalVisible);
  };

  const fetchRecord = (supervisorid) => {
    fetch(`${API_URL}/supervisors/${supervisorid}`)
      .then((response) => response.json())
      .then((data) => setViewRecord(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-poppins">Supervisors</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNewRecordToggle}
        >
          New
        </button>
      </div>
      {/* Records Table */}
      <table className="table-auto w-full bg-white border-collapse border border-gray-300 font-poppins">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border px-4 py-2 text-xl">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Signature</th>
            <th className="border px-4 py-2">Number</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // If none of the toggles are activated then display records if not empty
            !newRecordFormVisible &&
            !updateRecordFormVisible &&
            !viewRecordModalVisible &&
            records.map((record) => (
              <tr key={record.supervisorid} className="border-b">
                <td className="border px-4 py-2 text-sm">{record.supervisorid}</td>
                <td className="border px-4 py-2 text-md">{record.name}</td>
                <td className="border px-4 py-2">{record.signature}</td>
                <td className="border px-4 py-2">{record.phonenumber}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleViewRecordToggle(record.supervisorid)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateRecordToggle(record)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => deleteRecord(record.supervisorid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* Add New Record Modal */}
      {newRecordFormVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Record</h3>
            <form onSubmit={handleNewRecordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Name</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Signature</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="text"
                  name="signature"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Number</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="tel"
                  name="phonenumber"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
                  Add Record
                </button>
                <button
                  className="text-gray-600 px-4 py-2 rounded-md"
                  onClick={handleNewRecordToggle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Update Record Modal */}
      {updateRecordFormVisible && selectedRecord && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Record</h3>
            <form onSubmit={handleUpdateRecordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Name</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="text"
                  name="name"
                  defaultValue={selectedRecord.name}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Signature</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="text"
                  name="signature"
                  defaultValue={selectedRecord.signature}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Number</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  type="tel"
                  name="phonenumber"
                  defaultValue={selectedRecord.phonenumber}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
                  Update Record
                </button>
                <button
                  className="text-gray-600 px-4 py-2 rounded-md"
                  onClick={() => handleUpdateRecordToggle(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Single Record Modal */}
      {viewRecordModalVisible && viewRecord && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">View Record</h3>
            <div className="mt-4">
              <div>ID: {viewRecord.supervisorid}</div>
              <div>Name: {viewRecord.name}</div>
              <div>Signature: {viewRecord.signature}</div>
              <div>Number: {viewRecord.phonenumber}</div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => handleViewRecordToggle(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supervisors;