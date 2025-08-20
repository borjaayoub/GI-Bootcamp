import { Component } from 'react';
import './Exercise.css';


class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/*create a <h1> tag and set its color to red, and the background color to lightblue.*/}
        <h1>The first header</h1>

        {/*styling 'h1' with the object 'style_header'*/}
        <h1 style = {style_header}>This is a header</h1>

        <p className = 'para'>This is a paragraph</p>

        <a href = "https://www.example.com">This is a link</a>

        <h2>This is an image:</h2>
        <form>
          <label htmlFor = "inputField">Enter your name:</label>
          <input type = "text" placeholder = "Enter text"/>
          <button type = "submit">Submit</button>
        </form>

        <h2>Here is an image:</h2>
        <img src = "https://images.unsplash.com/photo-1662946834880-99adabd21f80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYwM3wwfDF8cmFuZG9tfHx8fHx8fHx8MTc1NDkwOTQ2N3w&ixlib=rb-4.1.0&q=80&w=1080" alt = "placeholder"/>

        <h3>This is a list:</h3>
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>)
  }
}

export default Exercise;