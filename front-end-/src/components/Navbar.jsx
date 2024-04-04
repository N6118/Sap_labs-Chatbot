import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
    
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 p-2 rounded-full"> 
            <svg className="h-8 w-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">SAPChatbot</span> 
        </div>

       
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300 mr-8">Chatbot</Link>
          </li>
          <li>
            <Link to="/knowledge-base" className="hover:text-gray-300 ml-8">Knowledge Base</Link>
          </li>
        </ul>

      
        <div className="flex items-center space-x-3">
          <div className="bg-gray-700 p-2 rounded-full">
            
            <svg className="h-6 w-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 11c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span className="hidden sm:block">Profile</span> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
