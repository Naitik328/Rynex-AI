import React from 'react';
import IconComponents from './IconComponents';
import VideoPanel from './VideoPanel';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const MainContent = ({
  darkMode,
  currentChat,
  showVideo,
  messages,
  prompt,
  handlePromptChange,
  handleSendMessage,
  handleKeyDown,
  inputFocused,
  autoResizeHeight,
  messageCount,
  isTyping,
  leftSidebarVisible,
  toggleLeftSidebar,
  user,
  getUserInitials,
  gradientBg,
}) => {
  return (
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
        {showVideo && <VideoPanel darkMode={darkMode} gradientBg={gradientBg} />}
        
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
                    <ChatMessage
                      key={msg.id}
                      msg={msg}
                      darkMode={darkMode}
                      user={user}
                      getUserInitials={getUserInitials}
                    />
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

          <ChatInput
            darkMode={darkMode}
            prompt={prompt}
            handlePromptChange={handlePromptChange}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            inputFocused={inputFocused}
            autoResizeHeight={autoResizeHeight}
            messageCount={messageCount}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;