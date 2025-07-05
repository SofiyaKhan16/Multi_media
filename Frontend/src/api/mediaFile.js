import axios from './axios';

export const getAllMediaFiles = async () => {
  try {
    const response = await axios.get('/api/media');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMediaFileById = async (id) => {
  try {
    const response = await axios.get(`/api/media/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// New: Upload media file with all required fields
export const uploadMediaFile = async ({ file, description, tags, fileType, createdBy }, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  if (description) formData.append('description', description);
  if (tags) formData.append('tags', Array.isArray(tags) ? tags.join(',') : tags);
  if (fileType) formData.append('fileType', fileType);
  if (createdBy) formData.append('createdBy', createdBy);

  try {
    const response = await axios.post('/api/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};