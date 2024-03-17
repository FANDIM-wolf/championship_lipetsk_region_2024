import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = ({homework_id}) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('homework_id', homework_id); // Ensure homework_id is correctly appended
         // Используйте homework_id внутри компонента, например:
        console.log(`Homework ID: ${homework_id}`);
        console.log(formData.get('homework_id'));

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

