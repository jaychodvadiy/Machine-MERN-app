import React from "react";
import Navbar from "../components/Navbar"; // Ensure Navbar exists and is imported correctly

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <header className="bg-gray-100 text-center py-20">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Platform</h1>
                <p className="text-lg text-gray-600 mt-4">
                    Streamline your workflow with our features.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded mt-6">
                    Get Started
                </button>
            </header>
        </div>
    );
};

export default HomePage;
