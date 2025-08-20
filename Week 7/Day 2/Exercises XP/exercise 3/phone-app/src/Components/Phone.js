import React from 'react';



const Phone = () => {
  const [state, setState] = React.useState({
    brand: 'Samsung',
    model: 'Galaxy S20',
    color: 'Black',
    year: 2020,
  });

  const changeColor = () => {
    setState({...state, color:'Blue'});
  }
  return (
    <div>
      <h1>My phone is a {state.brand}</h1>
      <p>It is a <span style={{fontWeight:'bold'}}>{state.color}</span> {state.model} from {state.year}</p>
      <button onClick={changeColor}>Change color</button>
    </div>
  )
}

export default Phone;