import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ImageDisplay = () => {
  const [imageData, setImageData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_image/${id}/`, {
          responseType: 'blob'
        });

        if (response.status === 200) {
          setImageData(URL.createObjectURL(response.data));
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <div>
      <h1>Image Display</h1>
      {imageData && <img src={imageData} alt="Fetched Image" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageDisplay;