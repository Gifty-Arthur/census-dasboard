import React from "react";
import { API_URL } from "../constants";

const Supervisors = () => {
  const [records, setRecords] = React.useState([])
  
    React.useEffect(() => {
      // Fetch records from API
      fetch(`${API_URL}/supervisors/`)
       .then(response => response.json())
       .then(data => setRecords(data))
       .then((data)=> console.log(data))
       .catch(error => console.error('Error:', error));
    }, [records]) // Empty dependency array means this effect will only run once on mount
  
    function createRecord(data) {
      fetch(`${API_URL}/supervisors/`, {
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
  
    function deleteRecord(id) {
      fetch(`${API_URL}/supervisors/${id}`, {
        method: 'DELETE',
      })
       .then(() => setRecords(records.filter(record => record.id!== id)))
       .catch(error => console.error('Error:', error));
    }
  
    function updateRecord(id, data) {
      fetch(`${API_URL}/supervisors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
       .then(response => response.json())
       .then(data => setRecords(records.map(record => record.id === id? data : record)))
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
        email: formData.get('email'),
        number: formData.get('number'),
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
        email: formData.get('email'),
        number: formData.get('number'),
      };
      updateRecord(selectedRecord.id, data);
      setUpdateRecordFormVisible(false);
    }
  
    // Delete a record confirmation modal
    const [deleteRecordModalVisible, setDeleteRecordModalVisible] = React.useState(false);
    const [deleteRecordId, setDeleteRecordId] = React.useState(null);
  
    const handleDeleteRecordToggle = (id) => {
      setDeleteRecordId(id);
      setDeleteRecordModalVisible(!deleteRecordModalVisible);
    }
  
    const handleDeleteRecordConfirm = () => {
      deleteRecord(deleteRecordId);
      setDeleteRecordModalVisible(false);
    }
    
    // view single record
    const [viewRecordModalVisible, setViewRecordModalVisible] = React.useState(false);
    const [viewRecord, setViewRecord] = React.useState(null);
  
    const handleViewRecordToggle = (id) => {
      fetchRecord(id)
      setViewRecordModalVisible(!viewRecordModalVisible);
    }
  
    const fetchRecord = (id) => {
      fetch(`${API_URL}/supervisors/${id}`)
       .then(response => response.json())
       .then(data => setViewRecord(data))
       .catch(error => console.error('Error:', error));
    }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-poppins">Supervisors</h1>
      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleNewRecordToggle}>
                  New
                </button>
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
          {
            // If none of the toggles are activated then display records if not empt
            (!newRecordFormVisible && !updateRecordFormVisible && !deleteRecordModalVisible && !viewRecordModalVisible) &&
          records.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="border px-4 py-2 text-sm">{record.id}</td>
              <td className="border px-4 py-2 text-md">{record.name}</td>
              <td className="border px-4 py-2">{record.email}</td>
              <td className="border px-4 py-2">{record.number}</td>
              <td className="border px-4 py-2 space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={handleViewRecordToggle}>
                  View
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={handleUpdateRecordToggle}>
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={handleDeleteRecordToggle}>
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
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Number</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="tel"
              name="number"
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
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              name="email"
              defaultValue={selectedRecord.email}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Number</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="tel"
              name="number"
              defaultValue={selectedRecord.number}
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
                <div>ID: {viewRecord.id}</div>
                <div>Name: {viewRecord.name}</div>
                <div>Email: {viewRecord.email}</div>
                <div>Number: {viewRecord.number}</div>
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

export default Supervisors;
