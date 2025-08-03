function abbrevName(name) {
    const nameParts = name.split(' ');
    
    const firstName = nameParts[0];
    
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0) + '.';
    
    return firstName + ' ' + lastNameInitial;
}

console.log(abbrevName("Robin Singh"));
