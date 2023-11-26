import React, { useState, useEffect } from 'react';

const ListOfPdfs = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [addLoading, setAddLoading] = useState(false);

    useEffect(() => {
        const pdfs = sessionStorage.getItem('pdfs');
        if (pdfs) {
            setPdfs(JSON.parse(pdfs));
            setLoading(false);
            console.log('pdfs from session storage');
            return;
        }
        fetch('http://127.0.0.1:8000/pdfs')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPdfs(data);
                setLoading(false);
                sessionStorage.setItem('pdfs', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });
    }, []);

    const handleLoadFile = (event) => {
        event.preventDefault();
        const filename = event.target.innerText;
        fetch(`http://127.0.0.1:8000/pdfs/${filename}`);
    }


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setAddLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/new-pdf', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const updatedPdfs = [...pdfs, { filename: data.filename, similarity: data.similarity }];
            setPdfs(updatedPdfs);
            sessionStorage.setItem('pdfs', JSON.stringify(updatedPdfs));
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setAddLoading(false);
            setSelectedFile(null);
        }
    };



    return (
        <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">List of PDFs </h2>
            {loading && <p>Loading...</p>}
            {pdfs.length === 0 && !loading ? (
                <p>No PDFs available</p>
            ) : (
                <ul>
                    {pdfs.map((pdf, index) => (
                        <li key={index}>
                            <a onClick={handleLoadFile}>
                                {pdf.filename}
                            </a>
                            <p>{pdf.similarity}</p>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex flex-col items-center justify-center bg-gray-50  ">
                <button className="bg-tmagenta">
                    <label
                        className="w-64 flex flex-col items-center px-4 py-6 bg-tmagenta text-white tracking-widest uppercase cursor-pointer"
                    >
                        <span className="text-base leading-normal">Select PDF</span>
                        <input type='file' className="hidden" onChange={handleFileChange} accept=".pdf" />
                    </label>
                </button>

                {selectedFile && <p className="mt-3 text-xl text-gray-600">Selected file: {selectedFile.name}</p>}
            </div>
            {addLoading && <p>Adding PDF...</p>}
        </div>
    );
};

export default ListOfPdfs;
