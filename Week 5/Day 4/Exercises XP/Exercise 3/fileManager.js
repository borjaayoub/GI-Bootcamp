const fs = require('fs');

function readFile (filePath){
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data);
  });
}

function writeFile (filePath, content){
  fs.writeFile(filePath, content, (err) => { 
    if (err){ 
        console.log(err);
    }
    else{
        console.log('Write operation complete.');
    }
  });
}


module.exports = {readFile, writeFile};