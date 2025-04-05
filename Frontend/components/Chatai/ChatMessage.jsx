import React from 'react';
import IconComponents from './IconComponents';

const ChatMessage = ({ msg, darkMode, user, getUserInitials }) => {
  return (
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
            {user?.name ? getUserInitials(user.name) : 'U'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;