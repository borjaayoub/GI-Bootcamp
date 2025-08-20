import react from 'react';

const Color = () => {
  const [favoriteColor, setFavoriteColor] = react.useState('red');

  react.useEffect(() => {
    alert("useEffect reached");
  }, []);

  const changeColor = () => {
    setFavoriteColor('blue');
  }

  return (
    <div>
      <header>
        <h1>My favorite color is {favoriteColor}</h1>
        <button onClick={changeColor}>Change to Blue</button>
      </header>
    </div>
  );
}

export default Color;