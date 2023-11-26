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
        <div className="flex items-center mx-auto">
            <button className="bg-tmagenta shadow-sm" onClick={handleFileUpload}>
                <label
                className="w-64 flex flex-col items-center px-4 py-6 bg-tmagenta text-white cursor-pointer"
            >
                <span className="text-base leading-normal">Select PDF</span>
                <input type='file' className="hidden" onChange={handleFileChange} accept=".pdf" />
            </label>
            </button>
            
            {selectedFile && <p className="mt-3 text-xl text-gray-600">Selected file: {selectedFile.name}</p>}
        </div>
    );
};
export default UploadDocument;
