import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/lists/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "File upload failed");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
