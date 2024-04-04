import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import KnowledgeBase from './components/KnowledgeBase';
import UploadResource from './components/UploadResource';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Chatbot />} />
          
           <Route path="/knowledge-base" element={<KnowledgeBase />} />
           <Route path="/upload" element={<UploadResource />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
