import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './App.css';

const Register_subject_and_group = () => {
    const [groupData, setGroupData] = useState({ vkid: '', group_token: '', subject_name: '' });
    const [cookies] = useCookies(['vkid']);
    const [showPopup, setShowPopup] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        if (cookies.vkid) {
            setGroupData({ ...groupData, vkid: cookies.vkid });
        }
    }, [cookies.vkid]); // Update vkid when cookie changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroupData({ ...groupData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/register_subject/', groupData);
            setResponseMessage(response.data.status); // Set the response message
            console.log(response.data);
            // Additional logic after successful data submission
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='_edit_container'>
            <button className='default_button' onClick={openPopup}>Open Popup</button>
            {showPopup && (
                <div className="popup">
                    <input type="text" name="group_token" placeholder="Group Token" onChange={handleInputChange} />
                    <input type="text" name="subject_name" placeholder="Subject Name" onChange={handleInputChange} />
                    <input type="text" name="vkid" placeholder="vkid" value={groupData.vkid} disabled />
                    <button onClick={handleSubmit}>Register Teacher Subject</button>
                    <button onClick={closePopup}>Close</button>
                    {responseMessage && <h3>{responseMessage}</h3>}
                </div>
            )}
        </div>
    );
};

export default Register_subject_and_group;