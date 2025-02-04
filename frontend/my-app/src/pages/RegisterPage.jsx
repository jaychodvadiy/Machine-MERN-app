import { useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const [message, setMessage] = useState(""); // State to hold the message
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, { // Correct URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("User successfully registered!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorMessage = result.message || "Something went wrong. Please try again.";
        setMessage(errorMessage);
        console.error("Error Response:", result); // Add logging for better debugging
      }
    } catch (error) {
      // console.log(error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setSubmitting(false); // Stop submitting process
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {/* Show the message if it exists */}
        {message && (
          <div className={`p-3 mb-4 text-center rounded-lg ${message.includes("success") ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {message}
          </div>
        )}

        {/* Formik Form */}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Name"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
