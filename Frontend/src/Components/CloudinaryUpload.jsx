import React, { useState } from 'react';

const CloudinaryUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'First_img'); // Replace with your preset
    data.append('cloud_name', 'dlt4c5ruf'); // Replace with your cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dlt4c5ruf/image/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      setImageUrl(json.secure_url);
      setLoading(false);
    } catch (err) {
      console.error('Upload error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload
      </button>

      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-48 h-auto mt-2 border" />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
