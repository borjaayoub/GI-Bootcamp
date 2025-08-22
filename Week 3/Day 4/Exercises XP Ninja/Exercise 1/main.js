// Hide the total tip section by default
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

function calculateTip() {
  // Get input values
  let billAmount = document.getElementById("billamt").value;
  let serviceQuality = document.getElementById("serviceQual").value;
  let numberOfPeople = document.getElementById("peopleamt").value;

  // Check if bill amount or service quality is missing
  if (billAmount === "" || serviceQuality == 0) {
    alert("Please enter a bill amount and select service quality.");
    return;
  }

  // Default number of people to 1 if not valid
  if (numberOfPeople === "" || numberOfPeople <= 1) {
    numberOfPeople = 1;
    document.getElementById("each").style.display = "none";
  } else {
    document.getElementById("each").style.display = "block";
  }

  // Calculate tip
  let total = (billAmount * serviceQuality) / numberOfPeople;
  total = total.toFixed(2); // round to 2 decimal places

  // Show the result
  document.getElementById("totalTip").style.display = "block";
  document.getElementById("tip").innerText = total;
}

// Call the function when the calculate button is clicked
document.getElementById("calculate").onclick = calculateTip;
