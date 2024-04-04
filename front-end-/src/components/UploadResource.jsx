import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadResource = () => {
  const [resourceType, setResourceType] = useState('url');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Log the current resourceType, URL, and file
    console.log('Resource Type:', resourceType);
    console.log('URL:', url);
    console.log('File:', file);

    if (resourceType === 'url') {
    // Handle URL submission
      console.log('Submitting URL:', url); // Additional log for URL submission
      if (!url) {
        alert("Please enter a URL.");
        setLoading(false);
        return;
      }
      // Send URL to the backend
      fetch('http://localhost:5000/submit_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLoading(false);
        // Handle response
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
    } else if (resourceType === 'pdf') {
      // Handle PDF upload
      if (!file) {
        alert("Please upload a PDF file.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      console.log('Uploading PDF:', file.name); // Additional log for file upload
      // Send file to the backend
      fetch('http://localhost:5000/upload_pdf', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLoading(false);
        // Handle response
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
    }
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-center">Upload a Resource</div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold">Resource Type</label>
          <select
            className="w-full p-3 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
          >
            <option value="url">URL</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        {resourceType === 'url' && (
          <div className="space-y-4">
            <label className="block text-lg font-semibold">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter URL"
            />
          </div>
        )}

        {resourceType === 'pdf' && (
          <div className="space-y-4">
            <label className="block text-lg font-semibold">Upload PDF</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 text-lg rounded bg-gray-700 file:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept=".pdf"
            />
          </div>
        )}

        {error && <div className="text-lg text-red-500">{error}</div>}

        <button type="submit" className={`w-full p-3 text-lg rounded font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-700'}`}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UploadResource;
