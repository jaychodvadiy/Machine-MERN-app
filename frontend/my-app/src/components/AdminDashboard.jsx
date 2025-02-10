import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [agentCount, setAgentCount] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

      try {
        const agentResponse = await axios.get(BASE_URL);
        setAgentCount(agentResponse.data.length);
      } catch (error) {
        console.error("Error fetching agents:", error.response?.data || error.message);
      }

      try {
        const fileResponse = await axios.get(BASE_URL);
        setUploadedFiles(fileResponse.data);
      } catch (error) {
        console.error("Error fetching uploaded files:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="mt-4">
          <p>Agents Registered: {agentCount}</p>
          <p>Files Uploaded: {uploadedFiles.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
