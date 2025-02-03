import React from "react";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-gray-600 mt-4">Welcome to your user dashboard!</p>
      </div>
    </div>
  );
};

export default DashboardPage;
