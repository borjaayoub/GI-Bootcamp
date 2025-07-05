const div = document.querySelector('div');
div.setAttribute('id', 'socialNetworkNavigation');


// Create a new <li> element
const newLi = document.createElement('li');
// Create a new text node with "Logout"
const logoutText = document.createTextNode('Logout');
// Append the text node to the <li>
newLi.appendChild(logoutText);
// Append the <li> to the <ul>
const ul = div.querySelector('ul');
ul.appendChild(newLi);


const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First link text:", firstLi.textContent);
console.log("Last link text:", lastLi.textContent);

