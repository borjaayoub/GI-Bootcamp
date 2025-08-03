const planets = [
  {
    name: "Mercury",
    moons: 0,
    color: "#b1b1b1"
  },
  {
    name: "Venus", 
    moons: 0,
    color: "#e6c200"
  },
  {
    name: "Earth",
    moons: 1,
    color: "#2e8b57"
  },
  {
    name: "Mars",
    moons: 2,
    color: "#c1440e"
  },
  {
    name: "Jupiter",
    moons: 79,
    color: "#e3c16f"
  },
  {
    name: "Saturn",
    moons: 82,
    color: "#deb887"
  },
  {
    name: "Uranus",
    moons: 27,
    color: "#48d1cc"
  },
  {
    name: "Neptune",
    moons: 14,
    color: "#4169e1"
  }
];

const section = document.querySelector('.listPlanets');

planets.forEach((planet) => {
  const div = document.createElement('div');
  div.classList.add('planet');
  div.setAttribute('data-planet', planet.name);
  div.textContent = planet.name;
  div.style.backgroundColor = planet.color;
  
  // Add moons if the planet has any
  if (planet.moons > 0) {
    // Limit moons to 5 for display purposes (since 79+ moons would be too many)
    const moonsToShow = Math.min(planet.moons, 5);
    
    for (let i = 0; i < moonsToShow; i++) {
      const moon = document.createElement('div');
      moon.classList.add('moon');
      
      // Position moons around the planet
      const angle = (i / moonsToShow) * 2 * Math.PI;
      const distance = 60; // Distance from planet center
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      moon.style.left = `calc(50% + ${x}px)`;
      moon.style.top = `calc(50% + ${y}px)`;
      
      div.appendChild(moon);
    }
  }
  
  section.appendChild(div);
});