
const person1 = {
    fullName: "John Smith",
    mass: 75,
    height: 1.80,
    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

const person2 = {
    fullName: "Sarah Johnson",
    mass: 65,
    height: 1.65,
    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

function compareBMI(person1, person2) {
    const bmi1 = person1.calculateBMI();
    const bmi2 = person2.calculateBMI();
    
    console.log(`${person1.fullName}'s BMI: ${bmi1.toFixed(2)}`);
    console.log(`${person2.fullName}'s BMI: ${bmi2.toFixed(2)}`);
    
    if (bmi1 > bmi2) {
        console.log(`${person1.fullName} has the largest BMI.`);
        return person1.fullName;
    } else if (bmi2 > bmi1) {
        console.log(`${person2.fullName} has the largest BMI.`);
        return person2.fullName;
    } else {
        console.log("Both persons have the same BMI.");
        return "Both persons have the same BMI";
    }
}

console.log("BMI Comparison Results:");
console.log("=======================");
const personWithLargestBMI = compareBMI(person1, person2);
