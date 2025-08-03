function swapCase(str) {
    return str.split('').map(char => {
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            return char.toLowerCase();
        } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
            return char.toUpperCase();
        } else {
            return char;
        }
    }).join('');
}

console.log(swapCase('The Quick Brown Fox'));
console.log(swapCase('Hello World!'));
console.log(swapCase('JavaScript'));
console.log(swapCase('123 ABC def'));
