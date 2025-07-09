function makeAllCaps(array = []){
  
  let promise = new Promise((resolve, reject)=>{
    if (array.every(item => typeof item === 'string')) {
      resolve(array.map(item => item.toUpperCase()));
    }
    else reject('Error: Not all items in the array are strings.');
  });
  return promise;
}


function sortWords(makeAllCaps){
  let promise = new Promise((resolve, reject)=>{
    if (makeAllCaps.length > 4){
      resolve(makeAllCaps.sort());
    } else {
      reject('Array length is not greater than 4');
    }
  });
  return promise;
}


makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))


makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))


makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))