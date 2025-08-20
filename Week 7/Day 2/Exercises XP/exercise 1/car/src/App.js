import './App.css';
import Car from "./Components/Car";


const carinfo = {name:"Ford", model:"Mustang"};

function App() {
  return (
    <div className="App">
      <Car carinfo={carinfo} />
    </div>
  );
}

export default App;
