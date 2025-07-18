const api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
const q = "hilarious";
const rating = "g";
const url = `https://api.giphy.com/v1/gifs/search?q=${q}&rating=${rating}&api_key=${api_key}`
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
