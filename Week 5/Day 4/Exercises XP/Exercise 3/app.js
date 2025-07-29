const {readFile, writeFile } = require('./fileManager.js');


readFile('./Hello World.txt');
writeFile('./Bye World.txt', 'Writing to the file');

