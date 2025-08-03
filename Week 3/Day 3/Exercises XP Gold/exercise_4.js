
function isOmnipresent(arr, value) {
    if (!arr || arr.length === 0) {
      return false;
    }
    
    return arr.every(subArray => {
      return subArray.includes(value);
    });
}

console.log("Test 1:", isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1));
console.log("Test 2:", isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6));
console.log("Test 3:", isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3));
console.log("Test 4:", isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 4));
console.log("Test 5:", isOmnipresent([[1, 2, 3], [2, 3, 4], [3, 4, 5]], 3));
console.log("Test 6:", isOmnipresent([[1, 2, 3], [2, 3, 4], [3, 4, 5]], 1));
