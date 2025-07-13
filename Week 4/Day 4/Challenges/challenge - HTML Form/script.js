const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const body = document.querySelector("body");
const form = document.querySelector('form');
const paraJSON = document.createElement('p');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let fullName = {}

  if (!firstName.value.trim() || !lastName.value.trim()) {
    alert('Both first name and last name are required!'); 
    return;
  }

  fullName.firstname = firstName.value.trim();
  fullName.lastname = lastName.value.trim();

  paraJSON.textContent = JSON.stringify(fullName);
  body.appendChild(paraJSON);
})
