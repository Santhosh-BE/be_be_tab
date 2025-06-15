import { useState } from 'react';
import VideoUploadGrid from './VideoUploadGrid';
import { useSingleVideoUploadApiMutation } from '@/services/api/MediaUploadApi';
import { toast } from 'react-toastify';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [singleVideoUploadApi] = useSingleVideoUploadApiMutation();

  const handleUpload = async () => {
    try {
      if (videoFiles.length === 1) {
        const formData = new FormData();
        formData.append('file', videoFiles[0]);

        const response = await singleVideoUploadApi(formData).unwrap();
        console.log('Single video upload success:', response);
      } else if (videoFiles.length > 1) {
        toast.error('upload one video at a time');
      }
    } catch (error) {
      console.error('Video upload failed:', error);
      // Handle error (show toast/notification)
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-50 rounded-xl shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Upload Your Videos
            </h1>
            <p className="text-gray-600">
              Share your video content. Drag & drop or click to browse.
            </p>
          </div>

          <div className="space-y-6">
            <VideoUploadGrid
              value={videos}
              setVideoFile={setVideoFiles}
              onChange={setVideos}
              maxFiles={5} // Typically allow fewer videos than photos
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={videos.length === 0}
              onClick={handleUpload}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
