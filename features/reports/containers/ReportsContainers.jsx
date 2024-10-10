import React, { useState } from "react";

const ReportsContainer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && selectedTable) {
      console.log("File:", selectedFile);
      console.log("Selected table:", selectedTable);
    } else {
      alert("Please select a file and a table.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
        Upload Excel Report
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="border-2 border-dashed border-gray-700 p-6 rounded-lg text-center bg-black text-white"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <p>{selectedFile.name}</p>
          ) : (
            <p>Drag & drop an Excel file here, or click to select one</p>
          )}
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-green-400 font-semibold mt-2 block"
          >
            Select File
          </label>
        </div>

        <div>
          <label htmlFor="tableSelect" className="block text-green-400 mb-2">
            Select Table
          </label>
          <select
            id="tableSelect"
            value={selectedTable}
            required
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg"
          >
            <option value="">Choose a table</option>
            <option value="services">Services</option>
            <option value="records">Records</option>
            <option value="Injection">Injection</option>
            <option value="consumption">Consumption</option>
            <option value="xm_data_hourly_per_agent">
              Xm_data_hourly_per_agent
            </option>
            <option value="tariffs">Tariffs</option>
          </select>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Upload Excel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportsContainer;
