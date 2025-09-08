


import "./App.css"; // import the CSS
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// -------------------- Home Component --------------------
function Home() {
  return (
    <div className="app-container">
      <header className="header">Intelligent File Explorer</header>

      <main className="home-container">
        <h2>Welcome</h2>
        <p className="subtitle">Sign in to access your files securely</p>

        <button
          className="google-btn"
          onClick={() =>
            (window.location.href = "http://localhost:8000/auth/login/google")
          }
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
          />
          Sign in with Google
        </button>
      </main>

      <footer className="footer">© 2025 Intelligent File Explorer</footer>
    </div>
  );
}

// -------------------- Dashboard Component --------------------
function Dashboard() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => (window.location.href = "/"));

    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/files/files-ai");
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/files/upload-ai", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:8000/files/delete/${filename}`);
      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (filename) => {
    window.open(`http://localhost:8000/files/view/${filename}`, "_blank");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/files/search-ai/${searchQuery}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

const [activeSummary, setActiveSummary] = useState(null);
const [activeFile, setActiveFile] = useState(null);


const handleSummary = async (filename) => {
  setLoadingSummaries(prev => ({ ...prev, [filename]: true }));
  try {
    const res = await axios.get(`http://localhost:8000/files/summarize/${filename}`);
    setActiveSummary(res.data.summary); // show summary in popup
    setActiveFile(filename);
  } catch (err) {
    console.error("Error generating summary:", err);
    setActiveSummary("Failed to generate summary.");
    setActiveFile(filename);
  } finally {
    setLoadingSummaries(prev => ({ ...prev, [filename]: false }));
  }
};



  // Decide which list to render: search results or all files
  const displayedFiles = searchResults.length > 0 ? searchResults : files;

  // Group files by tag/category
  const groupedFiles = displayedFiles.reduce((acc, file) => {
    const category = file.tag || "unknown";
    if (!acc[category]) acc[category] = [];
    acc[category].push(file);
    return acc;
  }, {});

  return (
    <div className="app-container">
      <header className="header">Intelligent File Explorer</header>

      <main className="dashboard-container">
        <div className="user-bar">
          <span>Welcome, {user?.email}</span>
          <form action="http://localhost:8000/auth/logout" method="post">
            <button type="submit" className="logout-btn">
              Logout
            </button>
          </form>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search files with AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Upload section */}
        <div className="upload-section">
          <label className="upload-btn">
            Upload File
            <input type="file" onChange={handleUpload} hidden />
          </label>
          {uploading && <span className="uploading">Uploading...</span>}
        </div>

        

      {/* Grouped files display */}
      <div className="grouped-files">
        {Object.keys(groupedFiles).length === 0 ? (
          <p>No files uploaded yet</p>
        ) : (
          Object.entries(groupedFiles).map(([category, files]) => (
            <div key={category} className="category-section">
              <h3 className="category-title">{category.toUpperCase()}</h3>
              <div className="files-grid">
                {files.map((file) => (
                  <div key={file.filename} className="file-card">
                    <p className="filename">{file.filename}</p>
      
                    {/* File actions */}
                    <div className="file-actions">
        <button onClick={() => handleView(file.filename)}>View</button>
        <button onClick={() => handleDelete(file.filename)}>Delete</button>
        <button onClick={() => handleSummary(file.filename)}>
          {loadingSummaries[file.filename] ? "Summarizing..." : "Summarize"}
        </button>
      </div>
      
      
      {/* Summary output */}
      {activeSummary && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Summary - {activeFile}</h3>
            <p>{activeSummary}</p>
            <button onClick={() => setActiveSummary(null)}>Close</button>
          </div>
        </div>
      )}


            </div>
          ))}
        </div>
      </div>
    ))
  )}
</div>


      </main>

      <footer className="footer">© 2025 Intelligent File Explorer</footer>
    </div>
  );
}

// -------------------- App Component --------------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
