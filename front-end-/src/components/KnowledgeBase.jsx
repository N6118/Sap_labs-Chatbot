import React, { useState, useEffect } from 'react';
import data from '../data/data.json';
import { useNavigate } from 'react-router-dom';  

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const FilterOptions = {
  All: 'all',
  URL: 'url',
  PDF: 'pdf',
};

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState(FilterOptions.All);
  const [filteredData, setFilteredData] = useState(data);

  const navigate = useNavigate();

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      const filtered = data.filter(item => {
        const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.url.toLowerCase().includes(searchQuery.toLowerCase());
        return filterOption === FilterOptions.All ? searchMatch : item.type === filterOption && searchMatch;
      });
      setFilteredData(filtered);
    }, 300);
    debouncedSearch();
  }, [searchQuery, filterOption]);

  const renderItem = (item) => {
    switch (item.type) {
      case 'url':
        return (
          <li key={item.url} className="border border-gray-700 p-3 rounded-lg hover:bg-gray-700">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <a href={item.url} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Visit Page</a>
          </li>
        );
      case 'pdf':
        return (
          <li key={item.url} className="border border-gray-700 p-3 rounded-lg hover:bg-gray-700">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <div className="text-sm text-gray-400">Uploaded: {item.uploadDate}</div>
            <a href={item.url} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">View PDF</a>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-6 overflow-hidden h-screen">
  <div className='mx-4 md:mx-14'>
    <h1 className="text-2xl font-bold mb-4">Knowledge Base</h1>
    <button
      className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white font-bold rounded transition duration-150 ease-in-out"
      onClick={() => navigate('/upload')}
    >
      Upload Resource
    </button>
    <div className="flex flex-col gap-4 md:flex-row mb-4">
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="flex-grow p-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-300 outline-none"
        placeholder="Search..."
      />
      <select 
        value={filterOption} 
        onChange={(e) => setFilterOption(e.target.value)}
        className="p-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-300 outline-none">
        <option value={FilterOptions.All}>All</option>
        <option value={FilterOptions.URL}>URLs</option>
        <option value={FilterOptions.PDF}>PDFs</option>
      </select>
    </div>
    <ul className="space-y-3 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      {filteredData.length ? filteredData.map(renderItem) : <div className="text-center text-gray-400">No items found.</div>}
    </ul>
  </div>
</div>

  );
};

export default KnowledgeBase;
