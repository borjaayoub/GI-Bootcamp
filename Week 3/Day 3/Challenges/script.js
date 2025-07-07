const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
];

const planetColors = [
  "#b1b1b1",
  "#e6c200",
  "#2e8b57",
  "#c1440e",
  "#e3c16f",
  "#deb887",
  "#48d1cc",
  "#4169e1"
];

const section = document.querySelector('.listPlanets');

planets.forEach((planet, i) => {
  const div = document.createElement('div');
  div.classList.add('planet');
  div.textContent = planet;
  div.style.backgroundColor = planetColors[i];
  section.appendChild(div);
});