import React, { useState } from 'react';

const UploadDocument = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('http://localhost:8000/upload-pdf', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 h-screen">
            <label
                className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer"
            >
                <span className="text-base leading-normal">Select PDF</span>
                <input type='file' className="hidden" onChange={handleFileChange} accept=".pdf" />
            </label>
            {selectedFile && <p className="mt-3 text-xl text-gray-600">Selected file: {selectedFile.name}</p>}
            <button
                onClick={handleFileUpload}
                className="mt-3 p-2 bg-blue-500 text-white rounded"
            >
                Upload PDF
            </button>
        </div>
    );
};

export default UploadDocument;
