// let form = document.forms[0]
const form = document.getElementsByTagName('form')[0];
console.log(form); // Log the form element

const fname = document.getElementById('fname');
console.log(fname);

const lname = document.getElementById('lname');
console.log(lname);

const fname1 = document.getElementsByName('fname');
console.log(fname1);

const lname1 = document.getElementsByName('lname');
console.log(lname1);

form.addEventListener('submit', function(e){
    e.preventDefault(); // prevent the reload of the page when the form is submitted
    console.log('First name:', fname.value);
    console.log('Last name:', lname.value);

    const ul = document.querySelector('.usersAnswer');

    const list_fname = document.createElement('li');
    list_fname.textContent = `First name: ${fname.value}`;
    ul.appendChild(list_fname);

    const list_lname = document.createElement('li');
    list_lname.textContent = `Last name: ${lname.value}`;
    ul.appendChild(list_lname);
})