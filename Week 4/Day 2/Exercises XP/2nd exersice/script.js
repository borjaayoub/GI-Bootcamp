const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];

colors.forEach((color, idx) => {
  let pos = idx + 1;
  let suffix = ordinal[(pos%10>3 ? 0 : pos % 10)]
  console.log(`${pos}${suffix} choice is ${color}`);
})