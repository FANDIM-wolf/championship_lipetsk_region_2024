import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

//Компонент отображает список заданий , созданным преподователем
const HomeworkList = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [cookies] = useCookies(['vkid']);
    const vkid = cookies.vkid; // Получение vkid из cookies
    useEffect(() => {
        const fetchHomeworks = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/get_homeworks_by_vkid/', {
                    vkid: vkid
                });
    
                if (response.status === 200) {
                    setHomeworks(response.data);
                } else {
                    console.error('Failed to fetch homeworks');
                }
            } catch (error) {
                console.error('Error fetching homeworks:', error);
            }
        };
    
        fetchHomeworks();
    }, [vkid]);
    return (
        <div className='_edit_container'>
            <h2>Homeworks for Employee</h2>
            <ul>
                {homeworks.map(homework => (
                    <li key={homework.id}>
                        <Link to={`/homework/${homework.id}`}>Задание {homework.id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeworkList;

