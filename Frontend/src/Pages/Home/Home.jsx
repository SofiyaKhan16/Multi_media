import { useState, useEffect } from 'react';
import './Home.css';
import { getAllMediaFiles } from '../../api/mediaFile';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        setLoading(true);
        const files = await getAllMediaFiles();
        setMediaFiles(files);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch media files');
        setLoading(false);
      }
    };
    fetchMediaFiles();
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    const icons = {
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      pdf: '📄'
    };
    return icons[fileType] || '📁';
  };

  const filteredFiles = mediaFiles
    .filter(file => {
      const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedFileType === 'all' || file.fileType === selectedFileType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdOn) - new Date(a.createdOn);
        case 'popular':
          return b.viewCount - a.viewCount;
        case 'name':
          return a.fileName.localeCompare(b.fileName);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="home-root">
        <div className="home-header">
          <div className="home-header-inner">
            <div className="home-header-row">
              <div>
                <h1 className="home-title">Media Hub</h1>
                <p className="home-subtitle">Manage and explore your multimedia files</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-main">
          <div className="home-empty">
            <div className="home-empty-icon">⏳</div>
            <h3 className="home-empty-title">Loading...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-root">
        <div className="home-header">
          <div className="home-header-inner">
            <div className="home-header-row">
              <div>
                <h1 className="home-title">Media Hub</h1>
                <p className="home-subtitle">Manage and explore your multimedia files</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-main">
          <div className="home-empty">
            <div className="home-empty-icon">⚠️</div>
            <h3 className="home-empty-title">Error</h3>
            <p className="home-empty-desc">{error}</p>
            <button className="home-empty-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-root">
      <div className="home-header">
        <div className="home-header-inner">
          <div className="home-header-row">
            <div>
              <h1 className="home-title">Media Hub</h1>
              <p className="home-subtitle">Manage and explore your multimedia files</p>
            </div>
            <div className="home-header-actions">
              <div className="home-files-found">{filteredFiles.length} files found</div>
              <button className="home-upload-btn">Upload New</button>
            </div>
          </div>
        </div>
      </div>

      <div className="home-main">
        <div className="home-filters">
          <div className="home-filters-grid">
            <div className="home-filters-search">
              <input
                type="text"
                placeholder="Search files by name or tags..."
                className="home-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="home-input"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="pdf">PDFs</option>
              </select>
            </div>
            <div>
              <select
                className="home-input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="home-grid">
          {filteredFiles.map((file) => (
            <div key={file._id} className="home-card" onClick={() => setSelectedFile(file)}>
              <div className="home-card-preview">
                {file.fileType === 'image' ? (
                  <img src={file.cloudinaryUrl} alt={file.fileName} className="home-card-img" />
                ) : (
                  <div className="home-card-icon-bg">
                    <span className="home-card-icon">{getFileIcon(file.fileType)}</span>
                  </div>
                )}
                <div className="home-card-type">{file.fileType.toUpperCase()}</div>
              </div>
              <div className="home-card-info">
                <h3 className="home-card-title">{file.fileName}</h3>
                <p className="home-card-desc">{file.description}</p>
                <div className="home-card-tags">
                  {file.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="home-card-tag">{tag}</span>
                  ))}
                  {file.tags.length > 3 && (
                    <span className="home-card-tag-more">+{file.tags.length - 3}</span>
                  )}
                </div>
                <div className="home-card-stats">
                  <span>{formatFileSize(file.fileSize)}</span>
                  <span>{file.viewCount} views</span>
                </div>
                <div className="home-card-date">{new Date(file.createdOn).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="home-empty">
            <div className="home-empty-icon">🔍</div>
            <h3 className="home-empty-title">No files found</h3>
            <p className="home-empty-desc">Try adjusting your search terms or filters</p>
            <button
              className="home-empty-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedFileType('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="home-modal-overlay">
          <div className="home-modal">
            <div className="home-modal-content">
              <div className="home-modal-header">
                <div>
                  <h2 className="home-modal-title">{selectedFile.fileName}</h2>
                  <p className="home-modal-desc">{selectedFile.description}</p>
                </div>
                <button onClick={() => setSelectedFile(null)} className="home-modal-close">×</button>
              </div>
              <div className="home-modal-preview">
                {selectedFile.fileType === 'image' ? (
                  <img src={selectedFile.cloudinaryUrl} alt={selectedFile.fileName} className="home-modal-img" />
                ) : (
                  <div className="home-modal-icon-bg">
                    <div className="home-modal-icon">
                      <span>{getFileIcon(selectedFile.fileType)}</span>
                      <p className="home-modal-icon-text">Preview not available</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="home-modal-details-grid">
                <div>
                  <h3 className="home-modal-details-title">File Details</h3>
                  <div className="home-modal-details-list">
                    <div className="home-modal-details-row">
                      <span className="home-modal-details-label">Type:</span>
                      <span className="home-modal-details-value">{selectedFile.fileType.toUpperCase()}</span>
                    </div>
                    <div className="home-modal-details-row">
                      <span className="home-modal-details-label">Size:</span>
                      <span className="home-modal-details-value">{formatFileSize(selectedFile.fileSize)}</span>
                    </div>
                    <div className="home-modal-details-row">
                      <span className="home-modal-details-label">Views:</span>
                      <span className="home-modal-details-value">{selectedFile.viewCount}</span>
                    </div>
                    <div className="home-modal-details-row">
                      <span className="home-modal-details-label">Created:</span>
                      <span className="home-modal-details-value">{new Date(selectedFile.createdOn).toLocaleDateString()}</span>
                    </div>
                    <div className="home-modal-details-row">
                      <span className="home-modal-details-label">Created by:</span>
                      <span className="home-modal-details-value">{selectedFile.createdBy}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="home-modal-details-title">Tags</h3>
                  <div className="home-modal-tags">
                    {selectedFile.tags.map((tag, index) => (
                      <span key={index} className="home-modal-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="home-modal-actions">
                <button className="home-modal-action-btn home-modal-download">Download</button>
                <button className="home-modal-action-btn home-modal-share">Share</button>
                <button className="home-modal-action-btn home-modal-delete">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;