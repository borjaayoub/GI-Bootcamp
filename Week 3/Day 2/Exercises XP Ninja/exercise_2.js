function findAvg(gradesList) {
    const sum = gradesList.reduce((total, grade) => total + grade, 0);
    
    const average = sum / gradesList.length;
    
    console.log(`Average grade: ${average.toFixed(2)}`);
    
    if (average > 65) {
        console.log("Congratulations! You passed the course.");
    } else {
        console.log("Sorry, you failed and must repeat the course.");
    }
}

// Bonus solution
function calculateAverage(gradesList) {
    const sum = gradesList.reduce((total, grade) => total + grade, 0);
    const average = sum / gradesList.length;
    return average;
}

function checkPassStatus(average) {
    console.log(`Average grade: ${average.toFixed(2)}`);
    
    if (average > 65) {
        console.log("Congratulations! You passed the course.");
    } else {
        console.log("Sorry, you failed and must repeat the course.");
    }
}

function findAvgBonus(gradesList) {
    const average = calculateAverage(gradesList);
    checkPassStatus(average);
}

console.log("=== Testing Basic Solution ===");
findAvg([85, 90, 75, 88, 92]);
findAvg([60, 55, 70, 65, 58]);

console.log("\n=== Testing Bonus Solution ===");
findAvgBonus([85, 90, 75, 88, 92]);
findAvgBonus([60, 55, 70, 65, 58]);
