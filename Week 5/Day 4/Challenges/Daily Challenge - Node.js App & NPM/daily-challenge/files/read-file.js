const fs = require('fs')

function readFileContent(){

  fs.readFile('./file-data.txt', 'utf-8', (err, data) =>{
    if(err){
      console.log('Error reading the file:', err);
      return;
    }
    console.log('File Content:\n', data);
  })
  
}

module.exports = readFileContent;