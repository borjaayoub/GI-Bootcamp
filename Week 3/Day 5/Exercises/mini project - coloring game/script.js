const sidebar = document.getElementById('sidebar').querySelectorAll('div');
const main = document.getElementById('main').querySelectorAll('div');
const clearBtn = document.getElementsByTagName('button')

let currentColor = '';
let isMouseDown = false;


sidebar.forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        currentColor = window.getComputedStyle(e.target).backgroundColor;
    })

});


document.body.addEventListener('mousedown', function() {
    isMouseDown = true;
});

document.body.addEventListener('mouseup', function() {
    isMouseDown = false;
});

main.forEach(element => {

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        if (currentColor) {
            element.style.backgroundColor = currentColor;
        }
    });

    element.addEventListener('mouseover', function(e) {
        if (isMouseDown && currentColor) {
            element.style.backgroundColor = currentColor;
        }
    });
});



clearBtn[0].addEventListener('click', function(e){
    main.forEach(element =>{
        element.style.backgroundColor = ''
    })
    currentColor = ''
})
