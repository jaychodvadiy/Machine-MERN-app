import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AgentListPage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch all agents
    const fetchAgents = async () => {
      const response = await axios.get("http://localhost:5000/api/agents");
      setAgents(response.data);
    };
    fetchAgents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold">Agent List</h1>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                <td className="border px-4 py-2">{agent.name}</td>
                <td className="border px-4 py-2">{agent.email}</td>
                <td className="border px-4 py-2">{agent.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentListPage;
