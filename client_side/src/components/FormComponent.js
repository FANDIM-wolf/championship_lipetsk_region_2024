import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
const FormComponent = (props) => {
  const [formData, setFormData] = useState({
    age: '',
    salary: '',
    amount_of_finished_credits: '',
    amount_of_unfinished_credits: '',
    education_degree: '',
    marriage_status: '',
    years_of_work_experience: '',
    desired_credit: '',
    desired_credit_age: ''
  });

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
  
    const updatedFormData = {
      ...formData,
      [fieldName]: fieldValue
    };
  
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/predict-credit-payability/', formData)
      .then(response => {
        console.log('Success:', response.data);
        props.onSubmit(response.data.predicted_credit_payability)
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(formData);
        // Handle errors here
      });
  };

  return (
    <div className="form-container">
    
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>Age:</label>
        <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
      </div>
      <div>
        <label>Salary:</label>
        <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} />
      </div>
      <div>
        <label>Finished Credits:</label>
        <input type="text" name="amount_of_finished_credits" value={formData.amount_of_finished_credits} onChange={handleInputChange} />
      </div>
      <div>
        <label>Unfinished Credits:</label>
        <input type="text" name="amount_of_unfinished_credits" value={formData.amount_of_unfinished_credits} onChange={handleInputChange} />
      </div>
      <div>
        <label>Education Degree:</label>
        <input type="text" name="education_degree" value={formData.education_degree} onChange={handleInputChange} />
      </div>
      <div>
        <label>Marriage Status:</label>
        <input type="text" name="marriage_status" value={formData.marriage_status} onChange={handleInputChange} />
      </div>
      <div>
        <label>Years of Work Experience:</label>
        <input type="text" name="years_of_work_experience" value={formData.years_of_work_experience} onChange={handleInputChange} />
      </div>
      <div>
        <label>Desired Credit:</label>
        <input type="text" name="desired_credit" value={formData.desired_credit} onChange={handleInputChange} />
      </div>
      <div>
        <label>Desired Credit Years:</label>
        <input type="text" name="desired_credit_age" value={formData.desired_credit_age} onChange={handleInputChange} />
      </div>
      <br></br>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default FormComponent;