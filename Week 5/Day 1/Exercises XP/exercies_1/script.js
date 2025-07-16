function compareToTen(num){
  let promise = new Promise((resolve, reject) => {
    if(num <= 10){
      resolve(num)
    }else{
      reject(num)
    }
  })
  return promise;
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))
