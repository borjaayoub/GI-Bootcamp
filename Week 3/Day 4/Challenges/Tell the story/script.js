const noun = document.getElementById('noun')
const adjective = document.getElementById('adjective')
const person = document.getElementById('person')
const verb = document.getElementById('verb')
const place = document.getElementById('place')

const libform = document.getElementById('libform')

function notEmpty() {
  const nounValue = noun.value.trim();
  const adjectiveValue = adjective.value.trim();
  const personValue = person.value.trim();
  const verbValue = verb.value.trim();
  const placeValue = place.value.trim();
  return nounValue && adjectiveValue && personValue && verbValue && placeValue;
}

libform.addEventListener('submit', (e)=> {
  e.preventDefault();
  if (!notEmpty()) {
    alert('Please fill in all fields.');
    return;
  }
  const nounValue = noun.value.trim();
  const adjectiveValue = adjective.value.trim();
  const personValue = person.value.trim();
  const verbValue = verb.value.trim();
  const placeValue = place.value.trim();

  const story = `${personValue} saw a very ${adjectiveValue} ${nounValue} that wanted to ${verbValue} in ${placeValue}.`;
  document.getElementById('story').textContent = story;
});
