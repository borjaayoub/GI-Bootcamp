function hotelCost(nights) {
  while (true) {
    nights = prompt("How many nights will you stay at the hotel?");
    if (nights === null || isNaN(nights) || nights <= 0) {
      alert("Please enter a valid number of nights.");
    } else {
      break;
    }
  }
  const perNights = 140;
  return perNights * nights;
}

function planeRideCost(destination) {
  while (true) {
    destination = prompt("What is your destination?");
    if (
      destination === null ||
      destination.trim() === "" ||
      typeof destination !== "string" ||
      !isNaN(destination)
    ) {
      alert("Please enter a valid destination.");
    } else {
      break;
    }
  }
  switch (destination.toLowerCase()) {
    case "paris":
      return 183 + "$";
    case "london":
      return 220 + "$";
    default:
      return 300 + "$";
  }
}

function rentalCarCost(days) {
  while (true) {
    days = prompt("How many days will you rent the car?");
    if (days === null || isNaN(days) || days <= 0) {
      alert("Please enter a valid number of days.");
    } else {
      break;
    }
  }
  const perDay = 40;
  let totalCost = perDay * days;
  if (days > 10) {
    totalCost = totalCost - totalCost * (5 / 100);
  }
  return totalCost;
}

function totalVacationCost() {
  const hotel = hotelCost();
  const plane = planeRideCost();
  const rental = rentalCarCost();
  return `The car cost: ${rental}$, the hotel const: ${hotel}$, the plane tickets const: ${plane}`;
}

console.log(totalVacationCost());
