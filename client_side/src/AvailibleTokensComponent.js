import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AvailableTokensComponent = () => {
    const [data, setData] = useState({ availableTokens: [], availableGroups: [] });
    const [cookies] = useCookies(['vkid']);

    const fetchAvailableData = async (vkid) => {
        try {
            const response = await axios.post('http://localhost:8000/api/get_available_tokens/', { vkid });
            setData({
                availableTokens: response.data.available_tokens || [],
                availableGroups: response.data.available_groups || []
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (cookies.vkid) {
            fetchAvailableData(cookies.vkid);
        }
    }, [cookies.vkid]);

    return (
        <div className='_edit_container'>
            <h3>Доступные токены и их группы</h3>
            <ul>
                {data.availableTokens && data.availableGroups && data.availableTokens.length > 0 && data.availableTokens.map((token, index) => (
                    <li key={index}>Token: {token} - Имя группы: {data.availableGroups[index]}</li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableTokensComponent;
