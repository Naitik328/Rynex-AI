import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "../components/Landingpage";
import Navbar from "../components/Navbar";
import AdvancedAISecurityFeatures from "../components/AdvancedAISecurityFeatures";
import ContentSections from "../components/ContentSections";
import Footer from "../components/Footer";
import AgentLogin from "../components/Login";
import AgentSignup from "../components/Signup";
import Homebutton from "../components/Home";
import { Home } from "lucide-react";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Homebutton />} /> {/* Default route */}
        <Route path="/content" element={<ContentSections />} /> {/* Route for ContentSections */}
        <Route path="/security" element={<AdvancedAISecurityFeatures />} /> {/* Route for Security Features */}
        <Route path="/footer" element={<Footer />} /> {/* Route for Footer (if needed as a standalone page) */}
        <Route path="/login" element={<AgentLogin />} /> {/* Route for Footer (if needed as a standalone page) */}
        <Route path="/Signup" element={<AgentSignup />} /> {/* Route for Footer (if needed as a standalone page) */}
        <Route path="/home" element={<Homebutton />} /> {/* Route for Footer (if needed as a standalone page) */}

      </Routes>
    </Router>
  );
};

export default App;