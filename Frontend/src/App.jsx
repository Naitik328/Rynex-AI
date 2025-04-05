import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "../components/Landingpage";
import Navbar from "../components/Navbar";
import AdvancedAISecurityFeatures from "../components/AdvancedAISecurityFeatures";
import ContentSections from "../components/ContentSections";
import Footer from "../components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar should be outside Routes but still within Router */}
      <Routes>
        <Route path="/" element={<Landingpage />} /> {/* Default route */}
        <Route path="/content" element={<ContentSections />} /> {/* Route for ContentSections */}
        <Route path="/security" element={<AdvancedAISecurityFeatures />} /> {/* Route for Security Features */}
        <Route path="/footer" element={<Footer />} /> {/* Route for Footer (if needed as a standalone page) */}
      </Routes>
    </Router>
  );
};

export default App;