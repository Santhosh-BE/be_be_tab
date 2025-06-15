import { useState } from 'react';
import ImageUploadGrid from './ImageGrid';
import {
  useMultipleImageUploadApiMutation,
  useSingleImageUploadApiMutation,
} from '@/services/api/MediaUploadApi';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  console.log(images, 'images');
  const [singleImageUploadApi, singleImageUploadRes] =
    useSingleImageUploadApiMutation();
  const [multipleImageUploadApi, multipleImageUploadRes] =
    useMultipleImageUploadApiMutation();
  console.log(singleImageUploadRes, '<<<<singleImageUploadRes');
  console.log(multipleImageUploadRes, '<<<<multipleImageUploadRes');
  console.log(imageFile, 'file url');

  const handleUpload = async () => {
    try {
      if (imageFile.length === 1) {
        // For single file upload
        const formData = new FormData();
        formData.append('file', imageFile[0]);

        const response = await singleImageUploadApi(formData).unwrap();
        console.log('Single upload success:', response);
      } else if (imageFile.length > 1) {
        // For multiple files upload
        const formData = new FormData();
        imageFile.forEach((file) => {
          formData.append('files', file);
        });

        const response = await multipleImageUploadApi(formData).unwrap();
        console.log('Multiple upload success:', response);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (show toast/notification)
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-50 rounded-xl shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Upload Your Images
            </h1>
            <p className="text-gray-600">
              Showcase your work with high-quality images. Drag & drop or click
              to browse.
            </p>
          </div>

          <div className="space-y-6">
            <ImageUploadGrid
              value={images}
              setImageFile={setImageFile}
              onChange={setImages}
              maxFiles={12}
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={images.length === 0}
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

export default Photos;
