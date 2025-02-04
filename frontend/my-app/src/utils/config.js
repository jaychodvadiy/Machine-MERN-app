// Define the base URL for the API
export const BASE_URL = "http://localhost:5000";

// Retrieve the token from localStorage
export const token = localStorage.getItem("token");

// You can handle cases when the token is not found by setting a default or logging an error
if (!token) {
  console.error("No token found in localStorage. Please log in.");
}
