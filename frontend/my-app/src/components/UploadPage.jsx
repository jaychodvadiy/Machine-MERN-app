import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UploadPage = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:5000/api/lists/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("File uploaded successfully!");
        } catch (error) {
            alert("Error uploading file.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <h2 className="text-2xl font-bold">Upload CSV File</h2>
                <form onSubmit={handleUpload} className="mt-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="border p-2"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPage;
