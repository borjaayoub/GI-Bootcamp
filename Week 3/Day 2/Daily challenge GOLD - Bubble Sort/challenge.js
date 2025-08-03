const numbers = [5,0,9,1,7,4,2,6,3,8];

const toStringNumbers = numbers.toString();
console.log("Using .toString():", toStringNumbers);

const joinEmpty = numbers.join("");
console.log("Using .join(''):", joinEmpty);

const joinSpace = numbers.join(" ");
console.log("Using .join(' '):", joinSpace);

const joinPlus = numbers.join("+");
console.log("Using .join('+'):", joinPlus);

const joinDash = numbers.join("-");
console.log("Using .join('-'):", joinDash);

// Bonus:
console.log("\n=== BUBBLE SORT ALGORITHM ===");
console.log("Original array:", numbers);

const numbersToSort = [...numbers];

for (let i = 0; i < numbersToSort.length; i++) {
    console.log(`\n--- Pass ${i + 1} ---`);
    
    for (let j = 0; j < numbersToSort.length - 1; j++) {
        console.log(`Comparing ${numbersToSort[j]} and ${numbersToSort[j + 1]}`);
        
        if (numbersToSort[j] < numbersToSort[j + 1]) {
            let temp = numbersToSort[j];
            numbersToSort[j] = numbersToSort[j + 1];
            numbersToSort[j + 1] = temp;
            
            console.log(`Swapped! Array now: [${numbersToSort.join(', ')}]`);
        } else {
            console.log(`No swap needed`);
        }
    }
    
    console.log(`After pass ${i + 1}: [${numbersToSort.join(', ')}]`);
}

console.log("\n=== FINAL RESULT ===");
console.log("Sorted array (descending):", numbersToSort);