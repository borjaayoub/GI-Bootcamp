const people = ["Greg", "Mary", "Devon", "James"];

// Part I:

console.log('=====1. remove "Greg" from the people array=====');
console.log(people.shift());

// 
console.log('===2. replace "James" to "Jason"===');
console.log(people.splice(-1, 1, "Jason"));

// 
console.log('===3. add a name to the end of the people array====');
console.log(people.push("Ayoub"));

// 
console.log("===4. console.logs Mary's index===");
console.log(people.indexOf("Mary"));

// 
console.log("===5. make a copy of 'people' array using slice method===");
const newPeople = people.slice(1,3);
console.log(newPeople);

// 
console.log("===6. give the index of 'Foo'===");
console.log(people.indexOf("Foo")); // the function returns -1 if the value is not found

// 
console.log("===7. create a variable called last which value is the last element of the array===");
const last = people[people.length - 1];
console.log(last);

// Part II:


console.log('===1. Using a loop to iterate through the people array====')
for(const person of people){
    console.log(person);
}



console.log("===2. Using a loop to iterate through the people array and exist after 'Devon'====")
for (const person of people) {
    if (person !== 'Devon') {
        console.log(person);
    } else {
        break;
    }
}