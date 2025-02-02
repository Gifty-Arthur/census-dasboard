import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold tracking-tight">
              Census<span className="text-blue-200">Pro</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <FaUserCircle className="w-7 h-7 text-blue-200 transition-colors group-hover:text-white" />
              <span className="text-blue-100 font-medium group-hover:text-white transition-colors">
                Admin Panel
              </span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            >
              <FaSignOutAlt className="w-5 h-5 text-red-200 group-hover:text-red-100 transition-colors" />
              <span className="text-red-100 group-hover:text-white font-medium transition-colors">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;