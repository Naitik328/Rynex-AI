import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; // Import Link for routing

// Enhanced ActionButton with animation and routing capability
const ActionButton = ({ primary, children, icon, to }) => {
  return primary ? (
    <Link to={to} className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 md:px-8 md:py-3 rounded-full font-medium hover:from-orange-500 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-orange-900/30 btn-glow transform hover:-translate-y-1">
      {children}
    </Link>
  ) : (
    <Link to={to} className="bg-gray-900/40 backdrop-blur-md border border-gray-700 px-6 py-3 md:px-8 md:py-3 rounded-full font-medium hover:border-orange-700 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
      {icon}
      {children}
    </Link>
  );
};

function Landingpage() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = GLOBE({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff5722, // Changed to orange
      color2: 0xffffff, // Changed to white
      size: 1.2,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      points: 10,
      maxDistance: 20,
      spacing: 15,
      showDots: true,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const globalStyles = `
    body {
      margin: 0;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: #000000; /* Solid black base */
      overflow-x: hidden;
    }
    .text-glow {
      text-shadow: 0 0 20px rgba(249, 115, 22, 0.5), 0 0 10px rgba(249, 115, 22, 0.2);
    }
    .gradient-text {
      background: linear-gradient(90deg, #fb923c, #f97316, #ff5722);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .btn-glow:hover {
      box-shadow: 0 0 15px rgba(249, 115, 22, 0.6);
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `;

  const PlayIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Vanta Background */}
      <div ref={vantaRef} className="absolute inset-0 z-0" style={{ opacity: '90%' }}></div>

      {/* Stars background */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ opacity: '40%' }}>
        <div className="absolute w-1 h-1 bg-white rounded-full top-20 left-10 sm:left-40" style={{ opacity: '30%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-60 left-5 sm:left-20" style={{ opacity: '40%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-10 left-20 sm:left-80" style={{ opacity: '30%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-40 right-10 sm:right-60" style={{ opacity: '40%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-80 right-5 sm:right-40" style={{ opacity: '30%' }}></div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        <style>{globalStyles}</style>

        <div id="home" className="flex items-center justify-center min-h-screen pt-16">
          <div className="container px-4 py-12">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <div 
                className="inline-block bg-orange-900/20 backdrop-blur-sm rounded-full px-5 py-2 text-orange-400 text-sm font-medium border border-orange-800/30 mb-8 transform hover:scale-105 transition-transform animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                Next Generation AI Agent
              </div>

              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center text-glow mb-8 animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                Automate Your Work with <br className="hidden sm:block" />
                <span className="gradient-text">AI-Powered</span> Efficiency
              </h1>

              <p 
                className="text-base md:text-lg text-gray-300 max-w-2xl text-center mb-12 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                RyneX is your intelligent agent, automating tasks seamlessly to boost efficiency and productivity in real-time
              </p>

              <div 
                className="flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in"
                style={{ animationDelay: '0.8s' }}
              >
                <ActionButton primary to="/login">Start Free Trial</ActionButton> {/* Updated to route to /signup */}
                <ActionButton icon={<PlayIcon />} to="/demo">Watch Demo</ActionButton> {/* Optional: added route for demo */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;