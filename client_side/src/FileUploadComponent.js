import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:8000/api/upload_file_and_save/', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    };

    return (
        <div className='_edit_container'>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Загрузить файл</button>
        </div>
    );
};

export default FileUploadComponent;