import { UploadCloud, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_upload');

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/dq0sgsxtz/image/upload',
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await response.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error('Cloudinary upload failed');
  }
};

const ImageUploadGrid = ({
  value = [],
  onChange,
  name,
  maxFiles = 10,
  setImageFile,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    // setImageFile(files);
    if (files && files.length > 0) {
      await processFiles(Array.from(files));
    }
    event.target.value = '';
  };

  const processFiles = async (files) => {
    if (value.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} images`);
      return;
    }

    try {
      setError(null);
      const uploadPromises = files.map((file) => {
        setUploadProgress({ fileName: file.name, progress: 0 });
        setImageFile((prev) => [...prev, file]);
        return uploadToCloudinary(file);
      });

      const results = await Promise.all(uploadPromises);
      onChange?.([...value, ...results]);
      setUploadProgress(null);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Image upload failed. Please try again.');
      setUploadProgress(null);
    }
  };

  const deleteHandler = (index) => {
    const updatedList = value.filter((_, i) => i !== index);
    onChange?.(updatedList);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(Array.from(files));
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="w-12 h-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-700">
            {isDragging ? 'Drop your images here' : 'Drag & drop images here'}
          </h3>
          <p className="text-sm text-gray-500">
            or click to browse files (JPEG, PNG, GIF)
          </p>
          <p className="text-xs text-gray-400">
            {value.length}/{maxFiles} images uploaded
          </p>
        </div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
          ref={inputRef}
          multiple
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md flex items-center">
          <X className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="p-3 bg-blue-50 text-blue-600 rounded-md">
          <div className="flex justify-between mb-1 text-sm">
            <span>Uploading {uploadProgress.fileName}...</span>
            <span>{uploadProgress.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${uploadProgress.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Your Images
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {value.map((url, index) => (
              <div
                key={index}
                className="tail-square"
                style={{ maxHeight: '5rem', maxWidth: '5rem' }}
              >
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteHandler(index);
                  }}
                  className="tail-delete"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadGrid;
