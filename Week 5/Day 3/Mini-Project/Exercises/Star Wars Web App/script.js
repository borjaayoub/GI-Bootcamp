// Function to retrieve elements from the DOM
function getElements() {
  // Get all the info elements
  let nameElement = document.getElementById("name");
  let heightElement = document.getElementById("height");
  let genderElement = document.getElementById("gender");
  let birthYearElement = document.getElementById("birth-year");
  let homeWorldElement = document.getElementById("home-world");
  let buttonElement = document.getElementById("button");

  // Get the info container
  const infoContainer = document.querySelector(".info-container");

  // Get the wrapper
  const wrapper = document.querySelector(".wrapper");

  buttonElement.addEventListener('click', async (e) => {
    e.preventDefault();

    // Show loading spinner
    infoContainer.innerHTML = `
      <div class="fa-3x" style="margin-top: 40px;">
        <i class="fa-solid fa-spinner fa-spin-pulse"></i>
      </div>
      <div style="color: white; font-size: 2em; margin-top: 20px;">Loading...</div>
    `;

    const data = await getData();

    // Display the result
    if (typeof data === "string") {
      infoContainer.innerHTML = `<div id="name">${data}</div>`;
    } else {
      infoContainer.innerHTML = `
        <div id="name">${data.name}</div>
        <div id="height">Height: ${data.height}</div>
        <div id="gender">Gender: ${data.gender}</div>
        <div id="birth-year">Birth Year: ${data.birthYear}</div>
        <div id="home-world">Home World: ${data.homeWorld}</div>
      `;
    }
  });

  // Return an object with all the elements
  return {
    name: nameElement,
    height: heightElement,
    gender: genderElement,
    birthYear: birthYearElement,
    homeWorld: homeWorldElement,
    button: buttonElement,
    infoContainer: infoContainer,
    wrapper: wrapper,
  };
}

async function getData() {
  let randomNumber = Math.floor(Math.random() * 80 + 1);

  let peopleUrlApi = `https://www.swapi.tech/api/people/${randomNumber}`;

  try {
    const peopleResponse = await fetch(peopleUrlApi);
    if(peopleResponse.ok){
      const starWarsData = await peopleResponse.json();

      let name = starWarsData.result.properties.name;
      let height = starWarsData.result.properties.height;
      let gender = starWarsData.result.properties.gender;
      let birthYear = starWarsData.result.properties.birth_year;
      let planet = starWarsData.result.properties.homeworld;

      let homeWorld = "";
      const planetResponse = await fetch(planet);
      if(planetResponse.ok){
        const planetData = await planetResponse.json();
        homeWorld = planetData.result.properties.name;
      }

      if (starWarsData.result && starWarsData.result.properties) {
        return {
          name,
          height,
          gender,
          birthYear,
          homeWorld
        };
      } else {
        return "Oh no! That person isn't available.";
      }
    }else{
      throw new Error(response.status);
    }

  }catch (e){
    return e;
  }
}

getElements()