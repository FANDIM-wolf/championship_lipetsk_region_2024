import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './App.css'; // Import the CSS file

//Компонент отрисовывает форму для создания домашнего задания
const GetTokenForm = () => {
    const [cookies] = useCookies(['vkid']);
    const [group, setGroup] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const vkid = cookies.vkid || '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/create_group_with_token/', {
                vkid,
                group_name: group,
                
            });

            if (response.status === 200) {
                alert('Token created successfully');
               
            } else {
                alert('Failed to create homework');
            }
        } catch (error) {
            console.error('Error creating homework:', error);
            alert('An error occurred while creating homework');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer">
            <input type="text" value={vkid} readOnly className="inputField" placeholder="VK ID" />
            <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} className="inputField" placeholder="Имя группы" />
            <button type="submit" className="button">Получить токен</button>
        </form>
    );
};

export default GetTokenForm;
