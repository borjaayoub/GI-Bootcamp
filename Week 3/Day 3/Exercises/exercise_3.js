function changeEnough(itemPrice, amountOfChange = []) {
    // Coin values
    const quarters = 0.25;
    const dimes = 0.10;
    const nickels = 0.05;
    const pennies = 0.01;

    // Calculate total change
    const sum =
        (amountOfChange[0] || 0) * quarters +
        (amountOfChange[1] || 0) * dimes +
        (amountOfChange[2] || 0) * nickels +
        (amountOfChange[3] || 0) * pennies;

    return sum >= itemPrice;
}


console.log(changeEnough(4.25, [25, 20, 5, 0]));

console.log(changeEnough(14.11, [2,100,0,0]));

console.log(changeEnough(0.75, [0,0,20,5]));