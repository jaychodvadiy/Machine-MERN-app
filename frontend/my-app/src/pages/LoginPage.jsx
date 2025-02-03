import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.post(`${API_URL}/auth/login`, values);
        console.log("Login successful:", response.data);
        navigate("/dashboard");
      } catch (error) {
        if (error.response) {
          setErrors({ submit: error.response.data.message || "Login failed" });
        } else {
          setErrors({ submit: "Network error: Unable to reach the server" });
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
        {formik.errors.submit && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.submit}</div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
