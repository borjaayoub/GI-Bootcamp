const fs = require('fs');

let content = ''

fs.readFile('source.txt', 'utf8', (err, data) => {
  if(err){
    console.log('Error reading source.txt:', err);
    return;
  }
  content = data;

  fs.writeFile('./destination.txt', content, (err) => {
    if(err){
      console.log(err);
      return;
    }
    console.log('Write operation complete.');
  })
  
})
