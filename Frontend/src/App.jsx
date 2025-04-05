import React from "react"; // Removed useEffect since it's not needed in App
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landingpage from "../components/Landingpage";
import Navbar from "../components/Navbar";
import AdvancedAISecurityFeatures from "../components/AdvancedAISecurityFeatures";
import ContentSections from "../components/ContentSections";
import Footer from "../components/Footer";
import AgentLogin from "../components/Login";
import AgentSignup from "../components/Signup";
import Homebutton from "../components/Home";
import Chat from "../components/ChatAi";

// Protected Route Component to check if user is authenticated
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if token exists

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  return children; // Render children if authenticated
};

// Public Route Component to redirect authenticated users away from login/signup
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/chat" replace />; // Redirect to chat if authenticated
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homebutton />} />
            <Route path="/home" element={<Homebutton />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <AgentLogin />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <AgentSignup />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Chat /> {/* Replace with <Dashboard /> if you create a Dashboard component */}
                </ProtectedRoute>
              }
            />

            {/* Other Routes */}
            <Route path="/content" element={<ContentSections />} />
            <Route path="/security" element={<AdvancedAISecurityFeatures />} />
            <Route path="/footer" element={<Footer />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;