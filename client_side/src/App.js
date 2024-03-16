import React, { useState } from 'react';
import logo from './logo.svg';
import Header  from './components/Header';
import FileUploadComponent from './FileUploadComponent';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';

import VKIdComponent from './vk_login';
import Cabinet from './Cabinet';
import EditUserForm from './EditUserForm';
import GroupCreationComponent from './GroupCreationComponent';
import AvailableTokensComponent from './AvailibleTokensComponent';
import Register_subject_and_group from './Register_subject_and_group';
import CreateHomeworkForm  from './CreateHomeworkForm';
import HomeworkList from './HomeworkList';
import HomeworkDetails  from './HomeworkDetails';



function App() {
  return (

    
    <Router>
    <Header/>
      <Routes>
        

        <Route path='/' element={<VKIdComponent/>}/>
        <Route path='/cabinet' element={<Cabinet/>}/>
        <Route path='/edit_data' element={<EditUserForm/>}/>
        <Route path='/file_upload' element={<FileUploadComponent/>}/>
        <Route path='/create_group' element={<GroupCreationComponent/>}/>
        <Route path='/tokens' element={<AvailableTokensComponent/>}/>
        <Route path='/register_subject_and_group' element={<Register_subject_and_group/>}/>
        <Route path='/create_homework' element={<CreateHomeworkForm/>}/>
        <Route path='/homework_list' element={<HomeworkList/>}/>
        <Route path='/homework/:id' element={<HomeworkDetails/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;