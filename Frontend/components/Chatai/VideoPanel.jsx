import React from 'react';

const VideoPanel = ({ darkMode, gradientBg }) => {
  return (
    <div className={`w-1/2 p-4 ${gradientBg} flex flex-col`}>
      <div className="flex-1 bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-[#333333] rounded-full text-white hover:bg-[#444444]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M8.5 8.5L15.5 15.5"></path>
                <path d="M15.5 8.5L8.5 15.5"></path>
              </svg>
            </button>
            <button className="p-2 bg-[#333333] rounded-full text-white hover:bg-[#444444]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                <line x1="12" y1="22" x2="12" y2="15.5"></line>
                <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
              </svg>
            </button>
          </div>
          <div className="text-center text-[#999999]">
            <div className="w-24 h-24 mb-6 mx-auto rounded-full bg-[#333333] flex items-center justify-center animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555 .832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-lg font-medium">Live Video Feed</p>
            <p className="text-sm mt-2">Connecting to secure video stream...</p>
            <div className="mt-4 w-64 mx-auto">
              <div className="h-1 w-full bg-[#333333] rounded-full overflow-hidden">
                <div className="h-full bg-[#ff6200] rounded-full w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;