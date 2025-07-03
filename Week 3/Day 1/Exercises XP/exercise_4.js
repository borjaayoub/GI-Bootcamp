const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

// Console.log the name of the second tenant and the number of rooms he has in his apartment. 

const numberOfFloors = building.numberOfFloors
console.log(`the number of floors in the building are ${numberOfFloors}`);

const firstFloor = building.numberOfAptByFloor.firstFloor
const thirdFloor = building.numberOfAptByFloor.thirdFloor
console.log(`There are ${firstFloor} apartments in the first floor, and ${thirdFloor} apartments in the third floor`);

const dan = building.nameOfTenants[1]
const numberOfRoom = building.numberOfRoomsAndRent.dan[0]

console.log(`The name of the second tenant is ${dan} and and the number of rooms he has in his apartment are ${numberOfRoom}`);

if (
    building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1] > building.numberOfRoomsAndRent.dan[1]
) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}
