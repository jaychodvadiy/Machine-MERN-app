import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/agents");
        setAgents(response.data);
      } catch (err) {
        console.error("Failed to fetch agents", err);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div>
      <h2>Agents</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            <p>Name: {agent.name}</p>
            <p>Email: {agent.email}</p>
            <p>Mobile: {agent.mobile}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
