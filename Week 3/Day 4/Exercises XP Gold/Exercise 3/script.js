let shoppingList = [];

const root = document.getElementById('root');

const form = document.createElement('form');
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter an item';

const addButton = document.createElement('button');
addButton.type = 'button';
addButton.textContent = 'AddItem';

form.appendChild(input);
form.appendChild(addButton);
root.appendChild(form);

const clearButton = document.createElement('button');
clearButton.type = 'button';
clearButton.textContent = 'ClearAll';
root.appendChild(clearButton);

const listContainer = document.createElement('ul');
root.appendChild(listContainer);

function renderList() {
  listContainer.innerHTML = '';
  shoppingList.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    listContainer.appendChild(li);
  });
}

function addItem() {
  const newItem = input.value.trim();

  if (newItem !== '') {
    shoppingList.push(newItem);
    input.value = '';
    renderList();
  } else {
    alert('Please enter an item!');
  }
}

function clearAll() {
  shoppingList = [];
  renderList();
}

addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearAll);
