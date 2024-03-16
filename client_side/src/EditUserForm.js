import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useCookies } from 'react-cookie';

const EditUserForm = () => {
    const [cookies] = useCookies(['first_name', 'second_name', 'vkid']);
    const [email, setEmail] = useState('');
    const [typeOfUser, setTypeOfUser] = useState('');
    const [department, setDepartment] = useState('');
    const [group, setGroup] = useState('');
    const [institute, setInstitute] = useState('');
    const [name, setName] = useState(`${cookies.first_name}_${cookies.second_name}`);
    const [vkid, setVkID] = useState(cookies.vkid);

    const handleTypeOfUserChange = (e) => {
        setTypeOfUser(e.target.value);
    };

    const handleSubmit = () => {
        const userData = {
            name,
            email,
            typeOfUser,
            department,
            group,
            institute,
            vkid
        };

        axios.post('http://localhost:8000/api/edit_user_data/', userData)
            .then(response => {
                console.log('Data successfully sent to the server');
                console.log(response);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <div className="_edit_container">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="_edit_inputField" />
            <select value={typeOfUser} onChange={handleTypeOfUserChange} className="_edit_selectField">
                <option value="">Select user type</option>
                <option value="студент">студент</option>
                <option value="сотрудник">сотрудник</option>
            </select>

            {typeOfUser === 'студент' && (
                <>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Кафедра" /><br/>
                    <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Группа" /><br/>
                    <input type="text" value={institute} onChange={(e) => setInstitute(e.target.value)} placeholder="Институт или факультет" /><br/>
                </>
            )}

            {typeOfUser === 'сотрудник' && (
                <>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Кафедра" /><br/>
                    <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Должность" /><br/>
                    <input type="text" value={institute} onChange={(e) => setInstitute(e.target.value)} placeholder="Институт или факультет" /><br/>
                </>
            )}

            {typeOfUser !== 'студент' && typeOfUser !== 'сотрудник' && (
                <p>Выберите правильный вариант</p>
            )}

            <button onClick={handleSubmit} className="_edit_button">Подтвердить данные</button>
        </div>
    );
};

export default EditUserForm;
