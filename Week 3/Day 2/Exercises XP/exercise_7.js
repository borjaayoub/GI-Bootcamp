const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

let societyName = ""
names.sort().forEach(firstLetter => {
    societyName += firstLetter[0]
});
console.log(societyName)