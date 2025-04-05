import React, { useState, useEffect } from 'react';

// Lucide Icons
const IconComponents = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
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
  )
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  const [autoResizeHeight, setAutoResizeHeight] = useState('24px');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

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
      messages: []
    };
    
    setChatHistory(prev => [...prev, newChat]);
    setSelectedChatId(newChatId);
    setPrompt('');
  };

  const selectChat = (chatId) => {
    setSelectedChatId(chatId);
    setPrompt('');
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarVisible(!leftSidebarVisible);
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
      content: prompt 
    };
    const aiResponse = { 
      id: Date.now() + 1,
      role: 'assistant', 
      content: `Echo: ${prompt}` 
    };

    setChatHistory(prev => {
      return prev.map(chat => {
        if (chat.id === selectedChatId) {
          const updatedMessages = [...chat.messages, newMessage, aiResponse];
          return {
            ...chat,
            messages: updatedMessages,
            title: chat.title.startsWith('Chat') && prompt.length > 0 
              ? prompt.substring(0, 20) 
              : chat.title
          };
        }
        return chat;
      });
    });

    setPrompt('');
    setMessageCount(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get current chat messages
  const currentChat = chatHistory.find(chat => chat.id === selectedChatId);
  const messages = currentChat ? currentChat.messages : [];

  const gradientBg = darkMode 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-orange-50 via-white to-blue-50';

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Left Sidebar */}
      <div className={`${leftSidebarVisible ? 'w-64' : 'w-16'} border-r flex flex-col transition-all duration-300 ease-in-out ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200'}`}>
        <div className={`p-4 flex items-center ${leftSidebarVisible ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
              <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              </div>
            </div>
            {leftSidebarVisible && <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-600">Script</span>}
          </div>
          <button 
            onClick={toggleLeftSidebar}
            className={`text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full ${darkMode ? 'hover:text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            {leftSidebarVisible ? 
              <div className="h-5 w-5"><IconComponents.ChevronLeft /></div> : 
              <div className="h-5 w-5"><IconComponents.ChevronRight /></div>
            }
          </button>
        </div>

        {leftSidebarVisible && (
          <div className="px-4 mb-4">
            <div className={`flex items-center p-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg transition-all duration-200 hover:shadow-md focus-within:ring-2 ${darkMode ? 'focus-within:ring-orange-500/30' : 'focus-within:ring-orange-500/20'}`}>
              <div className="h-4 w-4 text-gray-500 mr-2">
                <IconComponents.Search />
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className={`bg-transparent border-none focus:outline-none text-sm flex-grow ${darkMode ? 'text-gray-300 placeholder-gray-500' : ''}`}
              />
            </div>
          </div>
        )}

        <nav className="flex-grow overflow-y-auto">
          <div className={`${leftSidebarVisible ? 'px-2' : 'px-1'}`}>
            <button 
              onClick={createNewChat}
              className={`w-full flex items-center ${leftSidebarVisible ? 'p-2' : 'p-3 justify-center'} bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-md text-orange-600 hover:from-orange-500/30 hover:to-orange-600/30 mb-2 transition-all duration-200 ${darkMode ? 'text-orange-400' : ''}`}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white shadow-sm">
                <div className="h-4 w-4">
                  <IconComponents.Plus />
                </div>
              </div>
              {leftSidebarVisible && <span className="ml-3 font-medium">New Chat</span>}
            </button>

            <div className={`flex items-center ${leftSidebarVisible ? 'p-2' : 'p-3 justify-center'} rounded-md text-gray-600 hover:bg-gray-100 mb-2 transition-all duration-200 ${darkMode ? 'text-gray-400 hover:bg-gray-800' : ''}`}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center">
                <div className="h-4 w-4">
                  <IconComponents.History />
                </div>
              </div>
              {leftSidebarVisible && <span className="ml-3 font-medium">Chat History</span>}
            </div>
            
            {leftSidebarVisible && chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`w-full flex items-center p-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 mb-1 transition-all duration-200 ${selectedChatId === chat.id ? 'bg-gray-100 font-medium' : ''} ${darkMode ? 'text-gray-400 hover:bg-gray-800' : ''}`}
              >
                <div className="h-4 w-4 mr-2">
                  <IconComponents.MessageCircle />
                </div>
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {leftSidebarVisible ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                  JS
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? (
                  <div className="h-4 w-4 text-gray-400">
                    <IconComponents.Sun />
                  </div>
                ) : (
                  <div className="h-4 w-4 text-gray-500">
                    <IconComponents.Moon />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? (
                  <div className="h-4 w-4 text-gray-400">
                    <IconComponents.Sun />
                  </div>
                ) : (
                  <div className="h-4 w-4 text-gray-500">
                    <IconComponents.Moon />
                  </div>
                )}
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                JS
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`h-16 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between px-4 lg:px-6`}>
          <div className="flex items-center">
            <button 
              onClick={toggleLeftSidebar}
              className={`mr-4 lg:hidden p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <div className="h-5 w-5 text-gray-500">
                <IconComponents.Menu />
              </div>
            </button>
            <h1 className="text-xl font-semibold hidden sm:block">
              {currentChat ? currentChat.title : 'AI Chat'}
            </h1>
          </div>
        </header>

        <div className={`flex-1 overflow-y-auto p-4 ${gradientBg}`}>
          <div className="max-w-3xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center mb-8 mt-12">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                    <div className="grid grid-cols-2 grid-rows-2 gap-1">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Welcome to Script</h1>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Start typing or create a new chat
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl ${
                      msg.role === 'user'
                        ? darkMode ? 'bg-gray-800' : 'bg-gray-100'
                        : darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <span className="font-medium">{msg.role === 'user' ? 'You: ' : 'AI: '}</span>
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-3xl mx-auto relative">
            <div className={`flex rounded-xl border shadow-sm transition-all ${
              inputFocused ? 
                darkMode ? 'ring-2 ring-orange-500/30 border-orange-500/50' : 'ring-2 ring-orange-500/20 border-orange-500/50'
                : darkMode ? 'border-gray-700' : 'border-gray-300'
            } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <textarea
                id="message-input"
                rows="1"
                placeholder="Type your message here..."
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className={`w-full text-sm py-3 px-4 rounded-l-xl outline-none resize-none ${
                  darkMode ? 'bg-gray-800 text-gray-200 placeholder-gray-500' : 'bg-white placeholder-gray-400'
                }`}
                style={{
                  height: autoResizeHeight,
                  maxHeight: '200px',
                }}
              />
              <div className="flex items-end px-3 py-2 space-x-2">
                <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <div className="h-5 w-5 text-gray-500">
                    <IconComponents.Paperclip />
                  </div>
                </button>
                <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <div className="h-5 w-5 text-gray-500">
                    <IconComponents.Mic />
                  </div>
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!prompt.trim()}
                  className={`p-2 rounded-full ${
                    prompt.trim() 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
                      : darkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="h-5 w-5">
                    <IconComponents.Send />
                  </div>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 px-1 text-xs text-gray-500">
              <span>{messageCount} / 4000 characters</span>
              <div className="flex items-center">
                <span className="mr-1">Powered by</span>
                <span className="font-medium text-orange-500">Script AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;