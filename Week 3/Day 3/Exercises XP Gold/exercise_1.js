function isBlank(str) {
    return str.trim() === '';
}

console.log(isBlank(''));
console.log(isBlank('abc'));
console.log(isBlank('   '));
console.log(isBlank('  hello  '));
