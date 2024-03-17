
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FileUploadComponent from './FileUploadComponent';

const HomeworkDetails = () => {
    const [homework, setHomework] = useState(null);

    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('homework_id', id);
        


        axios.post('http://localhost:8000/api/upload_file_and_save/', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    };
   
    useEffect(() => {
        const fetchHomework = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/get_homework_details/', { homework_id: id });
                setHomework(response.data);
                console.log(id);
            } catch (error) {
                console.error('Error fetching homework details:', error);
            }
        };
 
        fetchHomework();
    }, [id]);

    const handleDownload = async (fileName) => {
        try {
            const response = await axios.post('http://localhost:8000/api/download_file/', { file_name: fileName });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    if (!homework) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h2>Детали задания</h2>
           
            <p>Название задания: {homework.name}</p>
            <p>Описание задания: {homework.description}</p>
            <p>Предмет: {homework.subject}</p>
            <p>Группа: {homework.group}</p>
            <p>Файлы к заданию:</p>
            <ul>
                {homework.files.map((file, index) => (
                    <li key={index}>
                        <a href="#" onClick={() => handleDownload(file.name)}>{file.name}</a>
                    </li>
                ))}
            </ul>

            {/* Integrate FileUploadComponent with homework_id */}
            <div className='_edit_container'>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Загрузить файл</button>
        </div>
        </div>
    );
};

export default HomeworkDetails;
