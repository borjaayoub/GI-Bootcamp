const div = document.getElementById('container');
const parentElem = document.getElementsByClassName('list')
const list = parentElem[0].children[1];

//Retrieve the div and console.log it
console.log(div);

//Change the name “Pete” to “Richard”.
list.textContent = "Richard";

// Delete the second <li> of the second <ul>.
parentElem[1].removeChild(parentElem[1].children[1]);

//Change the name of the first <li> of each <ul> to “Ayoub”.
for (let i = 0; i < parentElem.length; i++) {
  if (parentElem[i].children.length > 0) {
    parentElem[i].children[0].textContent = "Ayoub";
  }
}

//Add a class called student_list to both of the <ul>'s
for (element of parentElem){
  element.classList.add('student_list');
}

//Add the classes university and attendance to the first <ul>.
parentElem[0].classList.add('university', 'attendance');

//Add a “light blue” background color and some padding to the <div>.
div.style = 'background-color: lightblue; padding: 20px;';


//Do not display the <li> that contains the text node “Dan”
for (let li of parentElem[1].children) {
  if (li.textContent.trim() === "Dan") {
    li.style = "display: none;";  
  }
}

//Add a border to the <li> that contains the text node “Richard
for (let i = 0; i < parentElem[0].children.length; i++) {
  if (parentElem[0].children[i].textContent.trim() === "Richard") {
    parentElem[0].children[i].style.border = "2px solid black";
  }
}

//Change the font size of the whole body
document.body.style.fontSize = "20px";

//If the background color of the div is “light blue”, alert “Hello x and y”
if (div.style.backgroundColor === "lightblue") {
  const users = div.getElementsByTagName('li');
  if (users.length >= 2) {
    alert(`Hello ${users[0].textContent.trim()} and ${users[1].textContent.trim()}`);
  }
}