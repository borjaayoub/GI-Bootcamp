// 1.retrieve the h1 and console.log it
let h1 = document.getElementsByTagName("h1")[0];
console.log(h1.textContent);

// 2.remove the last paragraph in the <article> tag
let article = document.getElementsByTagName("article");
let lastParagraph = article[0].children[article[0].children.length - 1];
article[0].removeChild(lastParagraph);

// 3.change the background color of the h2 to red, when it’s clicked on.
let h2 = document.getElementsByTagName("h2")[0];

h2.addEventListener('click', function(e){
    e.preventDefault();
    h2.style.backgroundColor = 'red';
    
})

// 4.hide the h3 when it’s clicked on 
let h3 = document.getElementsByTagName("h3")[0];

h3.addEventListener('click', function(e){
    e.preventDefault();
    h3.style.display = 'none';
    
})

// 5.Add a <button> to the HTML file that should make all the paragraph's text bold

let btn = document.createElement("button");
btn.textContent = "Make Paragraphs Bold";
article[0].appendChild(btn);

btn.addEventListener('click', function(e){
    e.preventDefault();
    let paragraphs = article[0].getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.fontWeight = 'bold';
    }
})

// 6.When you hover on the h1, set the font size to a random pixel size between 0 to 100

h1.addEventListener('mouseover', function(e){
    e.preventDefault();
    h1.style.fontSize = Math.floor(Math.random() * 101)+'px';
})

// 7.When you hover on the 2nd paragraph, it should fade out
let secondParagraph = article[0].getElementsByTagName("p")[1];
secondParagraph.addEventListener('mouseover', function(e){
    e.preventDefault();
    secondParagraph.style.transition = 'opacity 1s';
    secondParagraph.style.opacity = '0';
});

