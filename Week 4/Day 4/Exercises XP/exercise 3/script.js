const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}

// Convert JavaScript object into JSON string
const marioGameJSON = JSON.stringify(marioGame);
console.log("Converted to JSON: \n", marioGameJSON);

console.log("\n" + "=".repeat(100) + "\n");

// Convert JavaScript object into pretty print JSON string
const marioGameJSON_pretty = JSON.stringify(marioGame, null, 2);
console.log("Converted to JSON: \n", marioGameJSON_pretty);