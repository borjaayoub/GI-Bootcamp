// fetch("https://www.swapi.tech/api/starships/9/")
//     .then(response => response.json())
//     .then(objectStarWars => console.log(objectStarWars.result));


const fetchData = async () => {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");
    if(response.ok){
      const objectStarWars = await response.json();
      console.log(objectStarWars.result);
    }else{
      throw new Error(response.status);
    }

  }catch (e){
    console.log(e);
  }
}

fetchData()