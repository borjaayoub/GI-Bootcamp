function getUniqueElements(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

const list1 = [1, 2, 3, 3, 3, 3, 4, 5];
const list2 = ['a', 'b', 'a', 'c', 'b', 'd'];
const list3 = [1, 'hello', 2, 'hello', 3, 1];

console.log('Original array:', list1);
console.log('Unique elements:', getUniqueElements(list1));

console.log('\nOriginal array:', list2);
console.log('Unique elements:', getUniqueElements(list2));

console.log('\nOriginal array:', list3);
console.log('Unique elements:', getUniqueElements(list3));
