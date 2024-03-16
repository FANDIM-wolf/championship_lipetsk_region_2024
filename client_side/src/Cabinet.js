import React from 'react';
import { useCookies } from 'react-cookie';

const Cabinet = () => {
  const [cookies] = useCookies(['first_name', 'second_name', 'vkid']);

  return (
    <div className="cabinet-container">
      <div className="user-info">
        <p>Имя: {cookies.first_name}</p>
        <p>Фамилия: {cookies.second_name}</p>
        <p>VK ID: {cookies.vkid}</p>
      </div>
    </div>
  );
};

export default Cabinet;
