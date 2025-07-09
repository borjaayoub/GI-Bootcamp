Promise.resolve(3)
  .then( value => console.log('Resolved with a value of', value) );

Promise.reject('Boo!')
  .catch( error => console.log('Rejected with the string', error) );
