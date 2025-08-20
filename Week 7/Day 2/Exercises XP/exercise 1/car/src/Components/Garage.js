import react from 'react';

function Garage({carinfo, size}) {
  return(
      <header>
        <h2>Garage Component</h2>
        <p>Who lives in my {size} Garage?</p>
      </header>
  )
}

export default Garage;