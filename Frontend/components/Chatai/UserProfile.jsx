import React from 'react';
import IconComponents from './IconComponents';
import { useAuthStore } from '../../src/store/AuthStore';

const UserProfile = ({ darkMode, getUserInitials, setDarkMode, dropdownOpen, setDropdownOpen }) => {
    const {user,logout} = useAuthStore();
    console.log(user)

    const handleLogout = async()=>{
        await logout();
    }
  return (
    <div className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-full flex items-center justify-between p-3 rounded-lg ${
          darkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'
        } transition-all duration-200`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6200] to-[#ff8c00] flex items-center justify-center text-white font-medium text-lg shadow-md uppercase">
            {user?.name ? getUserInitials(user.name) : 'U'}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-[#999999]">{user?.plan || 'Free Plan'}</p>
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
      </div>

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
          <div onClick={handleLogout} className={`block px-4 py-2 text-sm text-[#ff6200] ${darkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100'} transition-colors duration-200`}>
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;