import React from 'react';
import IconComponents from './IconComponents';

const ChatList = ({ darkMode, chatHistory, selectedChatId, selectChat }) => {
  return (
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
  );
};

export default ChatList;