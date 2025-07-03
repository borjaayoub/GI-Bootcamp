const colors = ["blue", "green", "red", "purple", "black"];

for(const color of colors){
    console.log(`My #${colors.indexOf(color)} choice is ${color}`)
}


const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}