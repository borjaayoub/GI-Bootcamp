const family = {
    father: "John",
    mother: "Jane",
    son: "Alex",
    daughter: "Emily",
    grandfather: "George",
    grandmother: "Helen",
    uncle: "Mike",
    aunt: "Sara"
};



for (const member in family){
    console.log(member);
}

for (const member in family){
    console.log(family[member]);
}

for (const member in family){
    console.log(`my name is ${family[member]} the ${member}`);
}