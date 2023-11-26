import React, { useState, useEffect } from 'react';

const ListOfPdfs = () => {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        // Fetch the list of PDFs from your backend
        fetch('http://localhost:8000/pdfs') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setPdfs(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="flex justify-center">
            <h2 className="text-2xl font-bold">List of PDFs </h2>
            {pdfs.length === 0 ? (
                <p>No PDFs available</p>
            ) : (
                <ul>
                    {pdfs.map((pdf, index) => (
                        <li key={index}>
                            <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                                {pdf.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListOfPdfs;
