const _ = require('lodash')
const math = require('./math.js');


const add = math.addition(5,5);
console.log('Addition: ', add);

const multiply = math.multiplication(10,7);
console.log('Multiplication: ', multiply);


const numbers = [10, 5, 10, 20, 5];
const uniqueNumbers = _.uniq(numbers);

console.log('Unique Numbers:', uniqueNumbers);