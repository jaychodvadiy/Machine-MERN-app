import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">MyApp</h1>
                <div>
                    <Link to="/home" className="px-4">Home</Link>
                    <Link to="/dashboard" className="px-4">Dashboard</Link>
                    <Link to="/agents" className="px-4">Agent List</Link>
                    <Link to="/upload" className="px-4">Upload</Link>
                    <Link to="/login" className="px-4">Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
