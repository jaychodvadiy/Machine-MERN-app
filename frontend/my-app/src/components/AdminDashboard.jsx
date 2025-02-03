import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [agentCount, setAgentCount] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Fetch agent count and uploaded files
    const fetchData = async () => {
      const agentResponse = await axios.get("http://localhost:5000/api/agents");
      const fileResponse = await axios.get("http://localhost:5000/api/lists");

      setAgentCount(agentResponse.data.length);
      setUploadedFiles(fileResponse.data);
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
