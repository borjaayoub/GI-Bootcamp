const radius = document.getElementById('radius')
const volume = document.getElementById('volume')
const form = document.getElementById('MyForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const rad = parseFloat(radius.value);
  if (!isNaN(rad)) {
    const vol = (4 / 3) * Math.PI * Math.pow(rad, 3);
    volume.value = vol.toFixed(2);
  } else {
    volume.value = '';
  }
});


