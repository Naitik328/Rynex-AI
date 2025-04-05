import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('features');
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = ['features', 'how-it-works', 'success-stories', 'faqs'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed w-full z-50 px-4 py-3 transition-all duration-300 ${
      scrolled ? 'bg-black/10 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className={`container mx-auto flex justify-between items-center border border-gray-700/50 rounded-full px-4 py-2 backdrop-blur-sm bg-transparent transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-orange-500/5' : ''
      }`}>
        <div className="flex items-center group">
          <div className="mr-2 text-orange-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            {/* New Custom AI Agent Logo */}
            <svg
              className="w-10 h-10"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Brain-like structure with circuits */}
              <path
                d="M25 5C14.5 5 6 13.5 6 24C6 34.5 14.5 43 25 43C35.5 43 44 34.5 44 24C44 13.5 35.5 5 25 5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(99, 102, 241, 0.1)"
              />
              
              {/* Circuit pattern */}
              <path
                d="M16 18L22 18M22 18L22 24M22 24L28 24M28 24L28 30M28 30L34 30"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Eye */}
              <circle cx="25" cy="17" r="5" fill="currentColor" opacity="0.8" />
              
              {/* Pulse effect */}
              <circle cx="25" cy="17" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              
              {/* Connection nodes */}
              <circle cx="16" cy="18" r="2" fill="currentColor" />
              <circle cx="22" cy="24" r="2" fill="currentColor" />
              <circle cx="28" cy="30" r="2" fill="currentColor" />
              <circle cx="34" cy="30" r="2" fill="currentColor" />
              
              {/* Subtle energy beams */}
              <path
                d="M25 5C28 8 28 12 25 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
          <span className="text-xl font-bold group-hover:text-orange-400 transition-colors duration-300">RyneX AI</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="border border-gray-600/30 rounded-full px-6 py-2 flex backdrop-blur-sm bg-transparent">
            {[
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'success-stories', label: 'Success Stories' },
              { id: 'faqs', label: 'FAQs' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`relative mx-3 px-2 py-1 transition-all duration-300 hover:text-orange-400 ${
                  activeSection === item.id ? 'text-orange-400' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(item.id);
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 rounded-full"></span>
                )}
              </a>
            ))}
          </div>
          <button className="ml-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium px-6 py-2 rounded-full hover:from-orange-500 hover:to-orange-400 transition-all duration-300 hover:shadow-lg hover:shadow-orange-600/30 hover:-translate-y-0.5 border border-orange-400/30 active:translate-y-0">
            Try Now
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-full bg-transparent border border-gray-600/50 hover:border-orange-400/50 transition-colors duration-300 hover:bg-black/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 backdrop-blur-md bg-black/20 border border-gray-700/50 rounded-xl p-4 animate-fadeIn transition-all duration-300 mx-4">
          {[
            { id: 'features', label: 'Features' },
            { id: 'how-it-works', label: 'How It Works' },
            { id: 'success-stories', label: 'Success Stories' },
            { id: 'faqs', label: 'FAQs' }
          ].map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block py-2 hover:text-orange-400 transition-all duration-300 hover:pl-2 ${
                activeSection === item.id ? 'text-orange-400 border-l-2 border-orange-400 pl-2' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <button className="mt-3 w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium px-4 py-2 rounded-full hover:from-orange-500 hover:to-orange-400 transition-all duration-300 border border-orange-400/30 hover:shadow-lg hover:shadow-orange-600/30 active:translate-y-0.5">
            Try Now
          </button>
        </nav>
      )}
    </header>
  );
};

// Add this to your CSS file or styled-components
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

export default Navbar;