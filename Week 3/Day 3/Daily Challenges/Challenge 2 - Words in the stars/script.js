const input = prompt("Enter several words separated by commas:");

const words = input.split(',').map(word => word.trim());

const maxLength = Math.max(...words.map(word => word.length));

console.log('*'.repeat(maxLength + 4));

words.forEach(word => {
  const padding = ' '.repeat(maxLength - word.length);
  console.log(`* ${word}${padding} *`);
});

console.log('*'.repeat(maxLength + 4));
