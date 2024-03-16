import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const CreateHomeworkForm = () => {
    const [cookies] = useCookies(['vkid']);
    const [group, setGroup] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const vkid = cookies.vkid || '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/create_homework/', {
                vkid,
                group_name: group,
                subject_name: subject,
                description,
            });

            if (response.status === 200) {
                alert('Homework created successfully');
                // Reset form fields or handle success as needed
            } else {
                alert('Failed to create homework');
            }
        } catch (error) {
            console.error('Error creating homework:', error);
            alert('An error occurred while creating homework');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formContainer'>
            <input type="text" value={vkid} readOnly placeholder="VK ID" />
            <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Group Name" />
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject Name" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            <button type="submit">Create Homework</button>
        </form>
    );
};

export default CreateHomeworkForm;