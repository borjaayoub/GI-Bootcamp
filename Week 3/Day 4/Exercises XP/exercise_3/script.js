let allBoldItems;

function getBoldItems() {
    allBoldItems = document.querySelectorAll('p strong');
}
getBoldItems();

function highlight(){
    allBoldItems.forEach(element => {
        element.style.color = 'red';
    });
}

function returnItemsToDefault(){
    allBoldItems.forEach(element => {
        element.style.removeProperty('color');
    });
}

allBoldItems.forEach(element => {
    element.addEventListener('mouseover', ()=> highlight())
    element.addEventListener('mouseout', ()=> returnItemsToDefault())
});