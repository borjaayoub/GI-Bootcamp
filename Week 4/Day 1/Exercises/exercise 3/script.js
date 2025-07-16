let isString = value => typeof value === 'string' ? true : false;


console.log(isString('hello'));

console.log(isString([1, 2, 4, 0]));