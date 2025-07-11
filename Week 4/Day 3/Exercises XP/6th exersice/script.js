// 1- Evaluate these (ie True or False)
/* 
Evaluate these (ie True or False)
  [2] === [2] // false
  {} === {} // false
*/

// 2- What is, for each object below, the value of the property number and why?
/*
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number) // output will be 4
console.log(object3.number) // output will be 4
console.log(object4.number) // output will be 5

object1,object2 and object3 all reference the same object in memory, unlike object4 which is a different object
*/


class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound() {
    console.log(`Moooo I'm a ${this.type}, named ${this.name} and I'm ${this.color}`);
  }
}

const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
farmerCow.sound();
