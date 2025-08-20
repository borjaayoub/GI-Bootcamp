import react from 'react';

const Events = () => {
  const [state , setState] = react.useState(true);
  const toggleStatus = () => {
    setState(!state);
  }

  const clickMe = () => {
    alert("I was clicked");
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`The Enter key was pressed, your input is: ${e.target.value}`);
    }
  }


  return (
      <div>
        <button onClick={clickMe}>Click Me</button><br/>
        <input type="text" onKeyDown={handleKeyDown} /><br/>
        <button onClick={toggleStatus}>
          {state ? 'Turn OFF' : 'Turn ON'}
        </button>


      </div>
  )
}

export default Events;