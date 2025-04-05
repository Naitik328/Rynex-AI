import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../src/store/AuthStore';

// Lucide Icons
const IconComponents = {
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  ),
  Paperclip: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
  ),
  Mic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  MessageCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
      <path d="M12 7v5l4 2"></path>
    </svg>
  ),
  UserCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="10" r="3"></circle>
      <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"></path>
    </svg>
  ),
};

function Chat() {
  const [darkMode, setDarkMode] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  const [autoResizeHeight, setAutoResizeHeight] = useState('24px');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {user} = useAuthStore()
  // Auto-resize textarea
  useEffect(() => {
    const textarea = document.getElementById('message-input');
    if (textarea) {
      textarea.style.height = '24px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
      setAutoResizeHeight(`${scrollHeight}px`);
    }
  }, [prompt]);

  // Initialize with a new chat if history is empty
  useEffect(() => {
    if (chatHistory.length === 0) {
      createNewChat();
    }
  }, []);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: `Chat ${chatHistory.length + 1}`,
      messages: [],
      hasVideo: false,
    };

    setChatHistory((prev) => [...prev, newChat]);
    setSelectedChatId(newChatId);
    setPrompt('');
    setShowVideo(false);
    setIsTyping(false);
  };

  const selectChat = (chatId) => {
    setSelectedChatId(chatId);
    setPrompt('');
    setDropdownOpen(false);
    const chat = chatHistory.find((c) => c.id === chatId);
    setShowVideo(chat?.hasVideo || false);
    setIsTyping(false);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarVisible((prev) => !prev);
    setDropdownOpen(false);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setMessageCount(e.target.value.length);
  };

  const handleSendMessage = () => {
    if (!prompt.trim() || !selectedChatId) return;

    const newMessage = {
      id: Date.now(),
      role: 'user',
      content: prompt,
    };
    const hasVideoTrigger = prompt.toLowerCase().includes('video');

    setChatHistory((prev) => {
      return prev.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            title: chat.title.startsWith('Chat') && prompt.length > 0 ? prompt.substring(0, 20) : chat.title,
            hasVideo: chat.hasVideo || hasVideoTrigger,
          };
        }
        return chat;
      });
    });

    setShowVideo((prev) => prev || hasVideoTrigger);
    setPrompt('');
    setMessageCount(0);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: hasVideoTrigger
          ? 'Starting video feed. You can now see the video panel on the left side of your screen.'
          : `I received your message: "${prompt}". How can I assist you further?`,
      };

      setChatHistory((prev) => {
        return prev.map((chat) => {
          if (chat.id === selectedChatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiResponse],
            };
          }
          return chat;
        });
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const gradientBg = darkMode
    ? 'bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]'
    : 'bg-gradient-to-br from-orange-50 via-white to-blue-50';

  const currentChat = chatHistory.find((chat) => chat.id === selectedChatId) || { messages: [] };
  const messages = currentChat.messages;

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-900'}`}>
      {/* Modernized Left Sidebar */}
      <div
        className={`${leftSidebarVisible ? 'w-72' : 'w-16'} flex flex-col transition-all duration-300 ease-in-out ${
          darkMode ? 'bg-gradient-to-b from-[#222222] to-[#111111]' : 'bg-gradient-to-b from-gray-50 to-white'
        } shadow-xl z-20`}
      >
        {/* Sidebar Header */}
        <div className={`p-4 flex items-center ${leftSidebarVisible ? 'justify-between' : 'justify-center'} ${darkMode ? 'border-b border-[#333333]' : 'border-b border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#ff6200] to-[#ff8c00] text-white shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
              <div className="grid grid-cols-2 grid-rows-2 gap-1 z-10">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              </div>
            </div>
            {leftSidebarVisible && (
              <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#ff6200] to-[#ff8c00] tracking-tight">RyneX AI Agent</span>
            )}
          </div>
          <button
            onClick={toggleLeftSidebar}
            className={`p-2 rounded-lg ${darkMode ? 'text-[#999999] hover:bg-[#333333]' : 'text-gray-500 hover:bg-gray-200'} transition-all duration-200 hover:scale-105`}
          >
            {leftSidebarVisible ? <IconComponents.ChevronLeft /> : <IconComponents.ChevronRight />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow overflow-y-auto px-3 py-4 custom-scrollbar">
          {leftSidebarVisible ? (
            <>
              <button
                onClick={createNewChat}
                className="w-full flex items-center gap-2 p-3 bg-gradient-to-r from-[#ff6200] to-[#ff8c00] rounded-lg text-white hover:from-[#e65a00] hover:to-[#ff9d33] mb-6 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <IconComponents.Plus className="w-5 h-5" />
                <span className="font-medium">New Chat</span>
              </button>

              <div className="mb-6">
                <h2 className="text-xs uppercase tracking-wider font-semibold px-2 mb-3 flex items-center gap-2">
                  <span className={darkMode ? 'text-[#999999]' : 'text-gray-500'}>Recent Chats</span>
                  <div className={`h-px flex-grow ${darkMode ? 'bg-[#333333]' : 'bg-gray-200'}`}></div>
                </h2>
                
                <div className="space-y-1.5">
                  {chatHistory.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => selectChat(chat.id)}
                      className={`w-full flex items-center gap-2 p-3 rounded-lg text-sm transition-all duration-200 ${
                        selectedChatId === chat.id
                          ? darkMode
                            ? 'bg-gradient-to-r from-[#333333] to-[#222222] text-[#ff6200] border-l-4 border-[#ff6200]'
                            : 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                          : darkMode
                          ? 'text-[#999999] hover:bg-[#2a2a2a]'
                          : 'text-gray-600 hover:bg-gray-100'
                      } relative group`}
                    >
                      <IconComponents.MessageCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{chat.title}</span>
                      {selectedChatId === chat.id && (
                        <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-[#ff6200]' : 'bg-orange-500'}`}></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`w-full flex items-center gap-2 p-3 rounded-lg text-sm ${
                  darkMode ? 'text-[#999999] hover:bg-[#2a2a2a]' : 'text-gray-600 hover:bg-gray-100'
                } transition-all duration-200 mb-2`}
              >
                <IconComponents.History className="w-5 h-5 flex-shrink-0" />
                <span>History</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 mt-6">
              <button
                onClick={createNewChat}
                className="p-3 bg-gradient-to-r from-[#ff6200] to-[#ff8c00] rounded-lg text-white hover:from-[#e65a00] hover:to-[#ff9d33] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
              >
                <IconComponents.Plus className="w-5 h-5" />
              </button>
              <button
                className={`p-3 rounded-lg ${darkMode ? 'text-[#999999] hover:bg-[#333333]' : 'text-gray-600 hover:bg-gray-200'} transition-all duration-200 hover:scale-110`}
              >
                <IconComponents.History className="w-5 h-5" />
              </button>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 ${darkMode ? 'border-t border-[#333333]' : 'border-t border-gray-200'}`}>
          {leftSidebarVisible ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-lg ${
                  darkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'
                } transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6200] to-[#ff8c00] flex items-center justify-center text-white font-medium text-lg shadow-md">
                    JS
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-[#999999]">Free Plan</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDarkMode(!darkMode);
                  }}
                  className={`p-2 rounded-lg ${darkMode ? 'text-[#999999] hover:bg-[#333333]' : 'text-gray-500 hover:bg-gray-200'} transition-colors duration-200`}
                >
                  {darkMode ? <IconComponents.Sun className="w-5 h-5 text-[#ff6200]" /> : <IconComponents.Moon className="w-5 h-5" />}
                </button>
              </button>

              {dropdownOpen && (
                <div
                  className={`absolute bottom-16 left-0 right-0 rounded-lg shadow-lg py-2 ${
                    darkMode ? 'bg-[#222222] border border-[#333333]' : 'bg-white border border-gray-200'
                  }`}
                >
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-[#333333] text-[#ffffff]' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}>
                    Profile
                  </a>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-[#333333] text-[#ffffff]' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}>
                    Settings
                  </a>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'hover:bg-[#333333] text-[#ffffff]' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}>
                    Upgrade Plan
                  </a>
                  <hr className={`my-1 ${darkMode ? 'border-[#333333]' : 'border-gray-200'}`} />
                  <a href="#" className={`block px-4 py-2 text-sm text-[#ff6200] ${darkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'text-[#999999] hover:bg-[#333333]' : 'text-gray-500 hover:bg-gray-200'} transition-colors duration-200 hover:scale-110`}
              >
                {darkMode ? <IconComponents.Sun className="w-5 h-5 text-[#ff6200]" /> : <IconComponents.Moon className="w-5 h-5" />}
              </button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6200] to-[#ff8c00] flex items-center justify-center text-white font-medium text-lg shadow-md">
                JS
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`h-16 border-b ${darkMode ? 'border-[#333333] bg-[#1a1a1a]' : 'border-gray-200 bg-white'} flex items-center justify-between px-4 lg:px-6 shadow-sm z-10`}
        >
          <div className="flex items-center">
            <button
              onClick={toggleLeftSidebar}
              className={`mr-4 lg:hidden p-2 rounded-full ${darkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'}`}
            >
              <div className="h-5 w-5 text-[#999999]">
                <IconComponents.Menu />
              </div>
            </button>
            <h1 className="text-lg font-semibold hidden sm:block">{currentChat ? currentChat.title : 'RyneX AI Agent'}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                darkMode ? 'bg-[#333333] text-[#00cc00]' : 'bg-green-100 text-green-800'
              }`}
            >
              Online
            </div>
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                darkMode ? 'bg-[#333333] text-[#ff6200]' : 'bg-blue-100 text-blue-800'
              }`}
            >
              <div className="w-2 h-2 bg-[#ff6200] rounded-full"></div>
              <span>RyneX AI Agent</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {showVideo && (
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
          )}

          <div className={`${showVideo ? 'w-1/2' : 'w-full'} flex flex-col ${gradientBg}`}>
            <div className="flex-1 overflow-y-auto p-4 pb-0">
              <div className="max-w-3xl mx-auto w-full">
                {messages.length === 0 ? (
                  <div className="text-center mt-12 mb-8">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#ff6200] to-[#ff8c00] flex items-center justify-center text-white shadow-lg">
                        <div className="grid grid-cols-2 grid-rows-2 gap-1">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome to RyneX AI</h1>
                    <p className={`text-md ${darkMode ? 'text-[#999999]' : 'text-gray-600'} mb-8`}>
                      How can I assist you today? Type "video" to show video feed.
                    </p>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
                      <button
                        className={`p-4 rounded-xl text-left ${
                          darkMode ? 'bg-[#2a2a2a] hover:bg-[#333333]' : 'bg-white hover:bg-gray-50 border border-gray-200'
                        } transition-all duration-200 shadow-sm`}
                      >
                        <div className="font-medium mb-1">Help me write</div>
                        <p className="text-sm text-[#999999]">Create content for various purposes</p>
                      </button>
                      <button
                        className={`p-4 rounded-xl text-left ${
                          darkMode ? 'bg-[#2a2a2a] hover:bg-[#333333]' : 'bg-white hover:bg-gray-50 border border-gray-200'
                        } transition-all duration-200 shadow-sm`}
                      >
                        <div className="font-medium mb-1">Analyze data</div>
                        <p className="text-sm text-[#999999]">Get insights from your information</p>
                      </button>
                      <button
                        className={`p-4 rounded-xl text-left ${
                          darkMode ? 'bg-[#2a2a2a] hover:bg-[#333333]' : 'bg-white hover:bg-gray-50 border border-gray-200'
                        } transition-all duration-200 shadow-sm`}
                      >
                        <div className="font-medium mb-1">Brainstorm ideas</div>
                        <p className="text-sm text-[#999999]">Generate creative solutions</p>
                      </button>
                      <button
                        className={`p-4 rounded-xl text-left ${
                          darkMode ? 'bg-[#2a2a2a] hover:bg-[#333333]' : 'bg-white hover:bg-gray-50 border border-gray-200'
                        } transition-all duration-200 shadow-sm`}
                      >
                        <div className="font-medium mb-1">Learn something</div>
                        <p className="text-sm text-[#999999]">Explore topics and get explanations</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 pb-24">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-start max-w-[80%]">
                          {msg.role === 'assistant' && (
                            <div className="mr-2 mt-1 h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br from-[#ff6200] to-[#ff8c00] text-white shadow-sm">
                              <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              </div>
                            </div>
                          )}
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              msg.role === 'user'
                                ? darkMode
                                  ? 'bg-[#ff6200] text-white'
                                  : 'bg-orange-100 text-gray-800'
                                : darkMode
                                ? 'bg-[#2a2a2a] text-white border border-[#333333]'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          {msg.role === 'user' && (
                            <div className="ml-2 mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-[#ff6200] to-[#ff8c00] flex items-center justify-center text-white font-medium">
                              JS
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[80%]">
                          <div className="mr-2 mt-1 h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br from-[#ff6200] to-[#ff8c00] text-white shadow-sm">
                            <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              darkMode ? 'bg-[#2a2a2a] text-white border border-[#333333]' : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-[#999999] animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-[#999999] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-[#999999] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Redesigned Prompt Input Box */}
            <div className="p-4 relative">
              <div
                className={`max-w-3xl mx-auto rounded-xl border ${
                  darkMode ? 'bg-[#2a2a2a] border-[#333333]' : 'bg-white border-gray-300'
                } ${inputFocused ? 'shadow-md ring-1 ring-[#ff6200]' : ''} transition-all duration-200 focus-within:shadow-md`}
              >
                <div className="flex items-end p-2">
                  <textarea
                    id="message-input"
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Ask RyneX AI anything..."
                    className={`flex-1 resize-none outline-none px-2 py-1 max-h-32 text-sm ${
                      darkMode ? 'bg-[#2a2a2a] text-white placeholder-[#999999]' : 'bg-white text-gray-700 placeholder-gray-400'
                    }`}
                    style={{ height: autoResizeHeight }}
                  ></textarea>

                  <div className="flex items-center gap-1 pb-1 pl-2">
                    <button
                      className={`p-1.5 rounded-full ${
                        darkMode ? 'hover:bg-[#333333] text-[#999999]' : 'hover:bg-gray-200 text-gray-500'
                      } transition-colors duration-200`}
                    >
                      <IconComponents.Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-1.5 rounded-full ${
                        darkMode ? 'hover:bg-[#333333] text-[#999999]' : 'hover:bg-gray-200 text-gray-500'
                      } transition-colors duration-200`}
                    >
                      <IconComponents.Mic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!prompt.trim()}
                      className={`p-1.5 rounded-full ${
                        prompt.trim()
                          ? 'bg-gradient-to-r from-[#ff6200] to-[#ff8c00] text-white hover:from-[#e65a00] hover:to-[#ff9d33]'
                          : darkMode
                          ? 'text-[#999999] bg-[#333333]'
                          : 'text-gray-400 bg-gray-100'
                      } transition-colors duration-200`}
                    >
                      <IconComponents.Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 border-t text-xs flex justify-between items-center ${
                    darkMode ? 'border-[#333333] text-[#999999]' : 'border-gray-200 text-gray-500'
                  }`}
                >
                  <span>RyneX AI Agent</span>
                  <span>{messageCount}/4000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;