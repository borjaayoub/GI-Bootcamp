const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
};

let myName = '';
for (let key in details){
    myName += `${key} ${details[key]} `
}
console.log(myName.trim());