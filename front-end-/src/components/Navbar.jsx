import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-5">
          <div className="text-green-500 p-2 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight">SAPChatbot</span>
        </div>

        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-green-400 transition-colors duration-300">Chatbot</Link>
          </li>
          <li>
            <Link to="/upload" className="hover:text-green-400 transition-colors duration-300">Knowledge Base</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
