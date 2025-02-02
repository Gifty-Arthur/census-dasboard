import React from "react";

const Backup = () => {
  const handleBackup = () => {
    fetch("/api/backup")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "backup.json");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Backup</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleBackup}
      >
        Create Backup
      </button>
    </div>
  );
};

export default Backup;