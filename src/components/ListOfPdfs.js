import React, { useState, useEffect } from 'react';

const ListOfPdfs = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="flex justify-center">
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
        </div>
    );
};

export default ListOfPdfs;
