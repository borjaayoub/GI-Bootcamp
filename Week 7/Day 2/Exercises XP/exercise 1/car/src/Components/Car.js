import React from 'react';
import Garage from "./Garage";

function Car({carinfo}) {
  const [color, setColor] = React.useState("red");
  return (
      <header>
        <h1>Car Component</h1>
        <p>This car '{carinfo.name}' is a {carinfo.model}.</p>
        <p>This car is {color} {carinfo.model}.</p>
        <Garage size="small" />
      </header>
  );
}

export default Car;