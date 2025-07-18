function resolveAfter2Seconds() {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve('resolved');
      }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  let result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();

/* when script start running, asyncCall() will immediately logs 'calling',
then it waits for resolveAfter2Seconds() for 2 second delay to resolve the promise,
after that it will log 'resolved' */