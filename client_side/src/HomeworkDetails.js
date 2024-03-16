import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HomeworkDetails = () => {
    const [homework, setHomework] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchHomework = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get_homework_details/${id}`);
                setHomework(response.data);
            } catch (error) {
                console.error('Error fetching homework details:', error);
            }
        };

        fetchHomework();
    }, [id]);

    if (!homework) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Homework Details</h2>
            <p>Name: {homework.name}</p>
            <p>Description: {homework.description}</p>
            <p>Group: {homework.group}</p>
            <p>Subject: {homework.subject}</p>
        </div>
    );
};

export default HomeworkDetails;