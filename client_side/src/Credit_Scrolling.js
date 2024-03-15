import React, { useState } from 'react';
import logo from './logo.svg';
import Header  from './components/Header';
import FormComponent from './components/FormComponent';
import SpeedometerComponent from './components/SpeedometerComponent';
function Credit_Scrolling() {
  const [speedometerValue, setSpeedometerValue] = useState(null);
  const getData = (data) => {
    console.log(data);
    setSpeedometerValue(data); // Store the data in a state variable
  }
  return (
   

   <><Header />
   
   
   <div className="app_component_credit_payability">
      <div className="form-container">
        <FormComponent onSubmit={getData}/>
      </div>
      <div className="speedometer-container">
        <SpeedometerComponent value={speedometerValue} />
      </div>
    </div>
   </>
   
  );
}

export default  Credit_Scrolling;
