import React from 'react';
import IconComponents from './IconComponents';
import ChatList from './ChatList';
import UserProfile from './UserProfile';

const LeftSidebar = ({
  darkMode,
  leftSidebarVisible,
  toggleLeftSidebar,
  createNewChat,
  selectChat,
  chatHistory,
  selectedChatId,
  user,
  getUserInitials,
  setDarkMode,
  dropdownOpen,
  setDropdownOpen,
}) => {
  return (
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
              <ChatList
                darkMode={darkMode}
                chatHistory={chatHistory}
                selectedChatId={selectedChatId}
                selectChat={selectChat}
              />
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
          <UserProfile
            darkMode={darkMode}
            user={user}
            getUserInitials={getUserInitials}
            setDarkMode={setDarkMode}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'text-[#999999] hover:bg-[#333333]' : 'text-gray-500 hover:bg-gray-200'} transition-colors duration-200 hover:scale-110`}
            >
              {darkMode ? <IconComponents.Sun className="w-5 h-5 text-[#ff6200]" /> : <IconComponents.Moon className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6200] to-[#ff8c00] flex items-center justify-center text-white font-medium text-lg shadow-md">
              {user?.name ? getUserInitials(user.name) : 'U'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;