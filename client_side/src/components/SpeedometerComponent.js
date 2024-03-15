import React  from 'react';
import ReactSpeedometer from "react-d3-speedometer";

const SpeedometerComponent = (props) => {
  return (
    <ReactSpeedometer 
    value={props.value}
      minValue={0}
      maxValue={100}
      segments={4}
      customSegmentStops={[0, 20, 40, 70, 100]}
      segmentColors={["red", "yellow", "orange", "green"]}
      
    />
  );
};

export default SpeedometerComponent;