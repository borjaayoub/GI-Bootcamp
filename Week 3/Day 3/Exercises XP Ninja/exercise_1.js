const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log(`Random number: ${randomNumber}`);

console.log("Even numbers from 0 to", randomNumber, ":");

for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
