import React, { useState } from 'react';
import logo from './logo.svg';
import Header  from './components/Header';
import FormComponent from './components/FormComponent';
import SpeedometerComponent from './components/SpeedometerComponent';
import Credit_Scrolling from './Credit_Scrolling';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import ImageUpload from './image_upload';
import ImageDisplay from './ImageDisplay';
import VKIdComponent from './vk_login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/credit" element={<Credit_Scrolling />} />
        <Route path='/image-upload' element={<ImageUpload/>}/>
        <Route path='/image-get/:id' element={<ImageDisplay/>}/>
        <Route path='/login' element={<VKIdComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App;