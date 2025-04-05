import React, { useState, useEffect } from 'react';
 // Updated with .jsx extension
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';

import IconComponents from './IconComponents'; // Ensure this file exists
import { useAuthStore } from '../../src/store/AuthStore';
function ChatContainer() {
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

  const { user,isAuthenticated } = useAuthStore();

  console.log(isAuthenticated)

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

  // Update user UI when user changes
  useEffect(() => {
    // This effect ensures the UI reflects the latest user data
  }, [user]);

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

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };
  useEffect(() => {
    if (showVideo) {
      setLeftSidebarVisible(false);
    }
  }, [showVideo]);

  return (
    <>
  
    <div className={`flex h-screen ${darkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-900'}`}>
      <LeftSidebar
        darkMode={darkMode}
        leftSidebarVisible={leftSidebarVisible}
        toggleLeftSidebar={toggleLeftSidebar}
        createNewChat={createNewChat}
        selectChat={selectChat}
        chatHistory={chatHistory}
        selectedChatId={selectedChatId}
        user={user}
        getUserInitials={getUserInitials}
        setDarkMode={setDarkMode}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        IconComponents={IconComponents}
      />
      <MainContent
        darkMode={darkMode}
        currentChat={currentChat}
        showVideo={showVideo}
        messages={currentChat.messages}
        prompt={prompt}
        handlePromptChange={handlePromptChange}
        handleSendMessage={handleSendMessage}
        handleKeyDown={handleKeyDown}
        inputFocused={inputFocused}
        autoResizeHeight={autoResizeHeight}
        messageCount={messageCount}
        isTyping={isTyping}
        leftSidebarVisible={leftSidebarVisible}
        toggleLeftSidebar={toggleLeftSidebar}
        user={user}
        getUserInitials={getUserInitials}
        gradientBg={gradientBg}
        IconComponents={IconComponents}
      />
    </div>
    </>
  );
}

export default ChatContainer;