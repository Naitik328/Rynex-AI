import React, { Children, useEffect } from "react"; // Removed useEffect since it's not needed in App
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
import ChatContainer from "../components/Chatai/ChatContainer";
import { useAuthStore } from "./store/AuthStore";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div>Loading</div>; // Show a loading state
  if (!isAuthenticated) return <Navigate to="/home" replace />; // Redirect to login if not authenticated

  return children;
};


const App = () => {
  const {checkAuth} = useAuthStore();

useEffect(()=>{
  checkAuth();
},[])
  return (
    <>
  
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RedirectAuthenticatedUser><Homebutton /></RedirectAuthenticatedUser>} />
            <Route path="/home" element={<RedirectAuthenticatedUser><Homebutton /></RedirectAuthenticatedUser>} />
            <Route
              path="/login"
              element={
              <RedirectAuthenticatedUser><AgentLogin/></RedirectAuthenticatedUser>}
            />
            <Route
              path="/signup"
              element={
                <RedirectAuthenticatedUser><AgentSignup /></RedirectAuthenticatedUser>
               
              }
            />

            {/* Protected Routes */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute><ChatContainer /></ProtectedRoute>
                  
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute> <ChatContainer /> </ProtectedRoute>
                 
              }
            />

            {/* Other Routes */}
            <Route path="/content" element={<ProtectedRoute> <ContentSections /></ProtectedRoute>} />
            <Route path="/security" element={
              <ProtectedRoute><AdvancedAISecurityFeatures /></ProtectedRoute>} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
    </>
  );
};

export default App;