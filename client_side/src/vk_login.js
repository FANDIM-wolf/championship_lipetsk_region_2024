import React, { useState } from 'react';
import VK from 'vk-openapi';
import './App.css'; // Importing styles from App.css

const VKIdComponent = () => {
  const [userData, setUserData] = useState(null);

  // Initializing VK SDK
  VK.init({ apiId: '51877826' });

  const handleGetVKId = () => {
    VK.Auth.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const userId = response.session.mid;

        const script = document.createElement('script');
        script.src = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=first_name,last_name&access_token=${response.session.sid}&v=5.131&callback=handleJSONPResponse`;
        document.body.appendChild(script);

        window.handleJSONPResponse = (data) => {
          setUserData(data.response[0]);
          document.body.removeChild(script);
        };
      } else {
        VK.Auth.login((loginResponse) => {
          if (loginResponse.session) {
            const userId = loginResponse.session.mid;

            const script = document.createElement('script');
            script.src = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=first_name,last_name&access_token=${loginResponse.session.sid}&v=5.131&callback=handleJSONPResponse`;
            document.body.appendChild(script);

            window.handleJSONPResponse = (data) => {
              setUserData(data.response[0]);
              document.body.removeChild(script);
            };
          }
        });
      }
    });
  };

  return (
    <div className="vk-component-container">
      <h2>Регистрация с помощью VK ID</h2>
      <button className="vk-button" onClick={handleGetVKId}>Получить информацию о пользователе</button>
      {userData && (
        <div>
          <p>Имя: {userData.first_name}</p>
          <p>Фамилия: {userData.last_name}</p>
          <p>VK ID: {userData.id}</p>
        </div>
      )}
    </div>
  );
};

export default VKIdComponent;