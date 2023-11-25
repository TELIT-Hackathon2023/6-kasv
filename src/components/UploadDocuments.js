import React, { useState } from 'react';

const UploadDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 h-screen">
      <label 
        className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer"
      >
        <span className="text-base leading-normal">Select FRP</span>
        <input type='file' className="hidden" onChange={handleFileChange} />
      </label>
      {selectedFile && <p className="mt-3 text-xl text-gray-600">Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default UploadDocument;
