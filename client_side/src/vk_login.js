import React, { useState, useEffect } from 'react';
import VK from 'vk-openapi';
import './App.css'; // Importing styles from App.css
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const VKIdComponent = () => {
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie] = useCookies(['first_name', 'second_name', 'vkid']);
  const navigate = useNavigate();

  useEffect(() => {
    VK.init({ apiId: '51877826' });
  }, []);

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

          var days = 7;
          const expires = new Date(Date.now() + days * 86400000); // Calculate expiration time correctly in milliseconds
          setCookie('first_name', data.response[0].first_name, { path: '/', expires: expires }); // Correct format for setting cookie
          setCookie('second_name', data.response[0].last_name, { path: '/', expires: expires }); // Correct format for setting cookie
          setCookie('vkid', data.response[0].id, { path: '/', expires: expires }); // Correct format for setting cookie

          navigate('/cabinet'); // Redirect to '/cabinet' after successful authentication
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

              var days = 7;
              const expires = new Date(Date.now() + days * 86400000); // Calculate expiration time correctly in milliseconds
              setCookie('first_name', data.response[0].first_name, { path: '/', expires: expires }); // Correct format for setting cookie
              setCookie('second_name', data.response[0].last_name, { path: '/', expires: expires }); // Correct format for setting cookie
              setCookie('vkid', data.response[0].id, { path: '/', expires: expires }); // Correct format for setting cookie

              navigate('/cabinet'); // Redirect to '/cabinet' after successful authentication
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



