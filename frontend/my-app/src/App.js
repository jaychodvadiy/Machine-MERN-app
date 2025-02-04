import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./components/AdminDashboard";
import AgentListPage from "./components/AgentList";
import UploadPage from "./components/UploadPage";
import Register from "./pages/RegisterPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/login"
          element={isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/agents"
          element={isLoggedIn ? <AgentListPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload"
          element={isLoggedIn ? <UploadPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
