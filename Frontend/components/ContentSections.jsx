import React, { useState, useEffect } from 'react';

const TestimonialCard = ({ quote, author, role, company }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-gray-900/40 backdrop-blur-lg p-6 rounded-xl border border-gray-800 transition-all duration-300 ${
        isHovered ? 'transform scale-105 border-orange-700/50 shadow-lg shadow-orange-900/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-yellow-500 mr-1 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}>★</span>
        ))}
      </div>
      <p className="italic text-gray-300 mb-4">"{quote}"</p>
      <div className="transition-all duration-300">
        <p className={`font-medium transition-all duration-300 ${isHovered ? 'text-orange-400' : ''}`}>{author}</p>
        <p className="text-sm text-gray-400">{role}, {company}</p>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="border-b border-gray-800 py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="flex justify-between items-center w-full text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={`text-lg font-medium transition-all duration-300 ${isHovered ? 'text-orange-400' : ''}`}>{question}</h3>
        <svg
          className={`w-5 h-5 transition-all duration-300 ${isOpen ? 'transform rotate-180 text-orange-400' : ''} ${isHovered ? 'text-orange-400' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`mt-2 text-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-4">{answer}</p>
      </div>
    </div>
  );
};

const ProcessStep = ({ number, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`relative bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl border border-gray-800 transition-all duration-500 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      } ${isHovered ? 'border-orange-700/50 shadow-lg shadow-orange-900/30' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
        isHovered ? 'from-orange-500 to-orange-400 scale-110 shadow-lg shadow-orange-900/30' : ''
      }`}>
        {number}
      </div>
      <h3 className={`text-xl font-semibold mb-3 mt-4 transition-all duration-300 ${isHovered ? 'text-orange-400' : ''}`}>{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">{title}</h2>
      <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

const ContentSections = () => {
  return (
    <>
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="How TaskMaster AI Works" 
            subtitle="Our four-step process to automate your workflow." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Task Detection",
                description: "Identifies repetitive tasks in your workflow automatically.",
                delay: 100
              },
              {
                number: "02",
                title: "Process Analysis",
                description: "Analyzes patterns and optimizes task execution.",
                delay: 200
              },
              {
                number: "03",
                title: "Smart Automation",
                description: "Executes tasks with AI-driven precision.",
                delay: 300
              },
              {
                number: "04",
                title: "Continuous Learning",
                description: "Improves efficiency through machine learning.",
                delay: 400
              }
            ].map((step) => (
              <ProcessStep 
                key={step.number} 
                number={step.number} 
                title={step.title} 
                description={step.description} 
                delay={step.delay}
              />
            ))}
          </div>
        </div>
      </section>

     

      <section id="faqs" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Get answers to common questions about TaskMaster AI." 
          />

          <div className="max-w-3xl mx-auto bg-orange-600/20 backdrop-blur-lg p-8 rounded-xl border border-gray-800 transition-all duration-300 hover:border-orange-800/30 shadow-lg shadow-orange-900/10">
            <FAQItem
              question="How does TaskMaster AI differ from traditional automation tools?"
              answer="TaskMaster AI uses adaptive AI to learn and improve, unlike rigid rule-based automation tools."
            />
            <FAQItem
              question="Can it integrate with our existing software?"
              answer="Yes, TaskMaster AI works seamlessly with most popular business tools and platforms."
            />
            <FAQItem
              question="How long does it take to set up?"
              answer="Most users are up and running within 1-2 days with our guided setup process."
            />
            <FAQItem
              question="What kind of time savings can we expect?"
              answer="Clients typically see 30-50% reduction in time spent on repetitive tasks."
            />
            <FAQItem
              question="How is pricing structured?"
              answer="We offer flexible plans based on the number of tasks and users you need to automate."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentSections;