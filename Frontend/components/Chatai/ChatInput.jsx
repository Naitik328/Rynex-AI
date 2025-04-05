import React, { useState } from 'react';
import IconComponents from './IconComponents';

const ChatInput = ({
  darkMode,
  prompt,
  handlePromptChange,
  handleSendMessage,
  handleKeyDown,
  autoResizeHeight,
  messageCount,
  
}) => {
    const [inputFocused, setInputFocused] = useState(false);
    
    

  return (
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
  );
};

export default ChatInput;