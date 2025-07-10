// ------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);// Output will be ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']

// ------2------
const country = "USA";
console.log([...country]);// Output will be ['U','S','A']

// ------Bonus------
let newArray = [...[,,]];
console.log(newArray);// Output will be [undefined, undefined]