import people from './data.js';


function ageCalculator(people){
  const totalAge = people.reduce((acc, person) => acc + person.age, 0);
  const avrAge = totalAge / people.length;
  console.log("Average Age:", avrAge);
}


ageCalculator(people)