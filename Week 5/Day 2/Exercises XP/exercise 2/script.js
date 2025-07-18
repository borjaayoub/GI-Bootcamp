const apikey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const query = "sun";
const limit = 10;
const offset = 2;
const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${query}&limit=${limit}&offset=${offset}`;

const getData = () => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Wrong data");
      }
    })
    .then((obj) => {
      console.log(obj);
    })
    .catch((error) => {
      console.log("we got the error: ", error);
    });
};

getData();