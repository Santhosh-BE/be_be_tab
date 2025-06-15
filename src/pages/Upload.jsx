import { Trash } from 'lucide-react';
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

const ImageUploadGrid = ({ value = [], onChange, name }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadToCloudinary(file); // Upload to Cloudinary

        onChange?.([...value, imageUrl]); // Store URL instead of base64
      } catch (error) {
        console.error('Upload error:', error);
        alert('Image upload failed. Please try again.');
      }
    }
    event.target.value = '';
  };

  const deleteHandler = (index) => {
    const updatedList = value.filter((_, i) => i !== index);
    onChange?.(updatedList);
  };
  console.log(value, '<<<<<value');

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Add Image Button */}
        <div
          className="w-20 h-20 flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-400"
          onClick={handleClick}
        >
          <div className="text-center">
            <h2 className="text-2xl text-gray-500">+</h2>
            <p className="text-sm text-gray-400">Add Image</p>
          </div>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={handleFileChange}
            ref={inputRef}
          />
        </div>
        {value?.map((url, index) => (
          <div key={index} className="tail-square w-20 h-20">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(index);
              }}
              className="tail-delete"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUploadGrid;
