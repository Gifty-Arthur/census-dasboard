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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supervisor Management</h1>
          <button
            onClick={handleNewRecordToggle}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Supervisor
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Signature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.supervisorid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{record.supervisorid}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.signature}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.phonenumber}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewRecordToggle(record.supervisorid)}
                          className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleUpdateRecordToggle(record)}
                          className="p-2 text-gray-600 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteRecord(record.supervisorid)}
                          className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {(newRecordFormVisible || updateRecordFormVisible) && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md animate-slide-up">
              <form onSubmit={newRecordFormVisible ? handleNewRecordSubmit : handleUpdateRecordSubmit} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">
                    {newRecordFormVisible ? 'Add New Supervisor' : 'Update Supervisor'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      newRecordFormVisible ? handleNewRecordToggle() : handleUpdateRecordToggle(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      name="name"
                      defaultValue={selectedRecord?.name || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Signature</label>
                    <input
                      name="signature"
                      defaultValue={selectedRecord?.signature || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      name="phonenumber"
                      type="tel"
                      defaultValue={selectedRecord?.phonenumber || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => newRecordFormVisible ? handleNewRecordToggle() : handleUpdateRecordToggle(null)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {newRecordFormVisible ? 'Create Supervisor' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewRecordModalVisible && viewRecord && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Supervisor Details</h3>
                  <button
                    onClick={() => handleViewRecordToggle(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID</label>
                    <p className="mt-1 text-gray-900">{viewRecord.supervisorid}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="mt-1 text-gray-900">{viewRecord.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Signature</label>
                    <p className="mt-1 text-gray-900">{viewRecord.signature}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="mt-1 text-gray-900">{viewRecord.phonenumber}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleViewRecordToggle(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supervisors;