// Part I
setTimeout(()=>{
    alert("Hello World")
},2000);


const container = document.getElementById('container');
const helloP = document.createElement('p');

// Part II
// setTimeout(function(){
//         container.appendChild(helloP)
//         helloP.textContent = 'Hello World'
//     }, 2000
// )


// Part III
let count = 0;
const intervalId = setInterval(function() {
    const helloP = document.createElement('p');
    helloP.textContent = 'Hello World';
    container.appendChild(helloP);
    count++;
    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 200);
