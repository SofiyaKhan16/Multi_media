import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadMediaFile } from "../../api/mediaFile.js";
import "./Upload.css";

function Upload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    setSuccess(false);

    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      tags: [],
      description: "",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "video/*": [".mp4", ".mov", ".avi", ".wmv"],
      "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
      "application/pdf": [".pdf"],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: true,
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    const icons = {
      image: "🖼️",
      video: "🎬",
      audio: "🎵",
      pdf: "📄",
    };
    return icons[fileType] || "📁";
  };

  const getFileType = (file) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (file.type === "application/pdf") return "pdf";
    return "unknown";
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFileMetadata = (id, field, value) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const addTag = (id, tag) => {
    if (tag.trim()) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, tags: [...f.tags, tag.trim()] } : f
        )
      );
    }
  };

  const removeTag = (id, tagIndex) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, tags: f.tags.filter((_, i) => i !== tagIndex) }
          : f
      )
    );
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploadPromises = files.map(async (fileObj) => {
        const fileType = getFileType(fileObj.file);

        // Use API method
        const response = await uploadMediaFile(
          {
            file: fileObj.file,
            description: fileObj.description,
            tags: fileObj.tags,
            fileType,
            // Optionally add createdBy if you have user info
          },
          (progress) => {
            setUploadProgress((prev) => ({ ...prev, [fileObj.id]: progress }));
          }
        );

        return response;
      });

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);
      console.log("Upload results:", results);
      setSuccess(true);
      setFiles([]);
      setUploadProgress({});

      // Optional: Refresh the parent component or redirect
      setTimeout(() => {
        // You can either refresh the page or call a callback function
        // window.location.href = '/';
        // or if you have a callback prop: onUploadComplete && onUploadComplete(results);
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-root">
      <div className="upload-header">
        <div className="upload-header-inner">
          <div className="upload-header-content">
            <h1 className="upload-title">Upload Media Files</h1>
            <p className="upload-subtitle">
              Drag and drop your files or click to browse
            </p>
          </div>
        </div>
      </div>

      <div className="upload-main">
        <div className="upload-container">
          <div
            {...getRootProps()}
            className={`upload-dropzone ${
              isDragActive ? "upload-dropzone-active" : ""
            }`}
          >
            <input {...getInputProps()} />
            <div className="upload-dropzone-content">
              <div className="upload-dropzone-icon">
                {isDragActive ? "⬇️" : "📁"}
              </div>
              <h3 className="upload-dropzone-title">
                {isDragActive ? "Drop files here" : "Drag & drop files here"}
              </h3>
              <p className="upload-dropzone-text">Or click to select files</p>
              <div className="upload-dropzone-formats">
                <span className="upload-format-tag">Images</span>
                <span className="upload-format-tag">Videos</span>
                <span className="upload-format-tag">Audio</span>
                <span className="upload-format-tag">PDFs</span>
              </div>
              <p className="upload-dropzone-limit">Maximum file size: 100MB</p>
            </div>
          </div>

          {error && (
            <div className="upload-error">
              <div className="upload-error-icon">⚠️</div>
              <p className="upload-error-text">{error}</p>
            </div>
          )}

          {success && (
            <div className="upload-success">
              <div className="upload-success-icon">✅</div>
              <p className="upload-success-text">
                Files uploaded successfully!
              </p>
            </div>
          )}

          {files.length > 0 && (
            <div className="upload-files-section">
              <h3 className="upload-files-title">
                Selected Files ({files.length})
              </h3>
              <div className="upload-files-list">
                {files.map((fileObj) => (
                  <div key={fileObj.id} className="upload-file-card">
                    <div className="upload-file-preview">
                      {fileObj.preview ? (
                        <img
                          src={fileObj.preview}
                          alt={fileObj.file.name}
                          className="upload-file-img"
                        />
                      ) : (
                        <div className="upload-file-icon-bg">
                          <span className="upload-file-icon">
                            {getFileIcon(getFileType(fileObj.file))}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="upload-file-remove"
                      >
                        ×
                      </button>
                    </div>

                    <div className="upload-file-info">
                      <h4 className="upload-file-name">{fileObj.file.name}</h4>
                      <p className="upload-file-size">
                        {formatFileSize(fileObj.file.size)}
                      </p>

                      <div className="upload-file-metadata">
                        <label className="upload-label">Description:</label>
                        <textarea
                          value={fileObj.description}
                          onChange={(e) =>
                            updateFileMetadata(
                              fileObj.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Add a description..."
                          className="upload-textarea"
                          rows="2"
                        />
                      </div>

                      <div className="upload-file-metadata">
                        <label className="upload-label">Tags:</label>
                        <div className="upload-tags">
                          {fileObj.tags.map((tag, index) => (
                            <span key={index} className="upload-tag">
                              {tag}
                              <button
                                onClick={() => removeTag(fileObj.id, index)}
                                className="upload-tag-remove"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          <input
                            type="text"
                            placeholder="Add tag..."
                            className="upload-tag-input"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addTag(fileObj.id, e.target.value);
                                e.target.value = "";
                              }
                            }}
                          />
                        </div>
                      </div>

                      {uploadProgress[fileObj.id] !== undefined && (
                        <div className="upload-progress">
                          <div className="upload-progress-bar">
                            <div
                              className="upload-progress-fill"
                              style={{
                                width: `${uploadProgress[fileObj.id]}%`,
                              }}
                            />
                          </div>
                          <span className="upload-progress-text">
                            {uploadProgress[fileObj.id]}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="upload-actions">
                <button
                  onClick={() => setFiles([])}
                  className="upload-btn upload-btn-secondary"
                  disabled={uploading}
                >
                  Clear All
                </button>
                <button
                  onClick={uploadFiles}
                  className="upload-btn upload-btn-primary"
                  disabled={uploading || files.length === 0}
                >
                  {uploading
                    ? "Uploading..."
                    : `Upload ${files.length} File${
                        files.length > 1 ? "s" : ""
                      }`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
