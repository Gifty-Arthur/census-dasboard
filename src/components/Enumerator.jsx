import React from "react";
import { API_URL } from "../constants";

const Enumerator = () => {

  const [records, setRecords] = React.useState([])

  React.useEffect(() => {
    // Fetch records from API
    fetch(`${API_URL}/enumerators/`)
     .then(response => response.json())
     .then(data => setRecords(data))
     .catch(error => console.error('Error:', error));
  }, []) // Empty dependency array means this effect will only run once on mount

  function createRecord(data) {
    fetch(`${API_URL}/enumerators/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
     .then(response => response.json())
     .then(data => setRecords([...records, data]))
     .catch(error => console.error('Error:', error));
  }

  function deleteRecord(enumeratorid) {
    fetch(`${API_URL}/enumerators/${enumeratorid}`, {
      method: 'DELETE',
    })
     .then(() => setRecords(records.filter(record => record.enumeratorid !== enumeratorid)))
     .catch(error => console.error('Error:', error));
  }

  function updateRecord(enumeratorid, data) {
    fetch(`${API_URL}/enumerators/${enumeratorid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
     .then(response => response.json())
     .then(data => setRecords(records.map(record => record.enumeratorid === enumeratorid ? data : record)))
     .catch(error => console.error('Error:', error));
  }

  // Create a new record form
  const [newRecordFormVisible, setNewRecordFormVisible] = React.useState(false);

  const handleNewRecordToggle = () => {
    setNewRecordFormVisible(!newRecordFormVisible);
  }

  const handleNewRecordSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      signature: formData.get('signature'),
      phonenumber: formData.get('phonenumber'),
    };
    createRecord(data);
    setNewRecordFormVisible(false);
  }

  // Update a record form
  const [updateRecordFormVisible, setUpdateRecordFormVisible] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  const handleUpdateRecordToggle = (record) => {
    setSelectedRecord(record);
    setUpdateRecordFormVisible(!updateRecordFormVisible);
  }

  const handleUpdateRecordSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      signature: formData.get('signature'),
      phonenumber: formData.get('phonenumber'),
    };
    updateRecord(selectedRecord.enumeratorid, data);
    setUpdateRecordFormVisible(false);
  }

  // Delete a record confirmation modal
  const [deleteRecordModalVisible, setDeleteRecordModalVisible] = React.useState(false);
  const [deleteRecordId, setDeleteRecordId] = React.useState(null);

  const handleDeleteRecordToggle = (enumeratorid) => {
    setDeleteRecordId(enumeratorid);
    setDeleteRecordModalVisible(!deleteRecordModalVisible);
  }

  const handleDeleteRecordConfirm = () => {
    deleteRecord(deleteRecordId);
    setDeleteRecordModalVisible(false);
  }
  
  // view single record
  const [viewRecordModalVisible, setViewRecordModalVisible] = React.useState(false);
  const [viewRecord, setViewRecord] = React.useState(null);

  const handleViewRecordToggle = (enumeratorid) => {
    fetchRecord(enumeratorid)
    setViewRecordModalVisible(!viewRecordModalVisible);
  }

  const fetchRecord = (enumeratorid) => {
    fetch(`${API_URL}/enumerators/${enumeratorid}`)
     .then(response => response.json())
     .then(data => setViewRecord(data))
     .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-poppins">Enumerators</h1>
      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleNewRecordToggle}>
                  New
                </button>
      {/* Records Table */}
      <table className="table-auto w-full bg-white border-collapse border border-gray-300 font-poppins">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border px-4 py-2 text-xl">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Signature</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // If none of the toggles are activated then display records if not empty
            (!newRecordFormVisible && !updateRecordFormVisible && !deleteRecordModalVisible && !viewRecordModalVisible) &&
          records.map((record) => (
            <tr key={record.enumeratorid} className="border-b">
              <td className="border px-4 py-2 text-sm">{record.enumeratorid}</td>
              <td className="border px-4 py-2 text-md">{record.name}</td>
              <td className="border px-4 py-2">{record.signature}</td>
              <td className="border px-4 py-2">{record.phonenumber}</td>
              <td className="border px-4 py-2 space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleViewRecordToggle(record.enumeratorid)}>
                  View
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleUpdateRecordToggle(record)}>
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleDeleteRecordToggle(record.enumeratorid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add New Record Form */}
      {newRecordFormVisible && (
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
              type="signature"
              name="signature"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Phone Number</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="tel"
              name="phonenumber"
              required
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
            Add Record
          </button>
          <button
            className="text-gray-600 px-4 py-2 rounded-md"
            onClick={handleNewRecordToggle}
          >
            Cancel
          </button>
        </form>)}
        {/* Update Record Form */}
        {updateRecordFormVisible && selectedRecord && (
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
              type="signature"
              name="signature"
              defaultValue={selectedRecord.signature}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Phone Number</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="tel"
              name="phonenumber"
              defaultValue={selectedRecord.ph}
              required
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
            Update Record
          </button>
          <button
            className="text-gray-600 px-4 py-2 rounded-md"
            onClick={() => handleUpdateRecordToggle(null)}
          >
            Cancel
          </button>
        </form>)}
        {/* Delete Record Confirmation Modal */}
        {deleteRecordModalVisible && deleteRecordId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">Delete Record</h3>
              <p className="text-gray-600 mt-2">Are you sure you want to delete this record?</p>
              <div className="mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleDeleteRecordConfirm}
                >
                  Delete
                </button>
                <button
                  className="text-gray-600 px-4 py-2 rounded-md"
                  onClick={() => setDeleteRecordModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>)}
        {/* View Single Record Modal */}
        {viewRecordModalVisible && viewRecord && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">View Record</h3>
              <div className="mt-4">
                <div>ID: {viewRecord.enumeratorid}</div>
                <div>Name: {viewRecord.name}</div>
                <div>signature: {viewRecord.signature}</div>
                <div>ph: {viewRecord.ph}</div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={() => handleViewRecordToggle(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          </div>)}
    </div>
  );
};

export default Enumerator;