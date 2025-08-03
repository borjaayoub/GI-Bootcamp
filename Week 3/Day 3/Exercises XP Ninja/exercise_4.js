function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) {
        return 0;
    }
    
    const numericValues = arrayNumber.filter(item => typeof item === 'number');
    
    if (numericValues.length === 0) {
        return 0;
    }

    return Math.max(...numericValues);
}

const array = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ['a', 3, 4, 2];
const array3 = [];

console.log(biggestNumberInArray(array));
console.log(biggestNumberInArray(array2));
console.log(biggestNumberInArray(array3));
