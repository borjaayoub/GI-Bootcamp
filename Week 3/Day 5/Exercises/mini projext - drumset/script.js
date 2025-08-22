const drumButtons = document.querySelectorAll('.drum');

function playDrumSound(event) {
    let keyCode;
    
    if (event.type === 'keydown') {
        keyCode = event.keyCode;
    } else {
        keyCode = this.getAttribute('data-key');
    }

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    const drumElement = document.querySelector(`.drum[data-key="${keyCode}"]`);

    if (!audioElement) return;

    audioElement.currentTime = 0;
    
    audioElement.play();

    drumElement.classList.add('playing');
}

function removePlayingEffect(event) {
    if (event.propertyName !== 'transform') return;
    
    this.classList.remove('playing');
}

drumButtons.forEach(function(drumButton) {
    drumButton.addEventListener('click', playDrumSound);
    
    drumButton.addEventListener('transitionend', removePlayingEffect);
});

window.addEventListener('keydown', playDrumSound);

console.log('Available drum keys:');
drumButtons.forEach(function(drum) {
    console.log(`Key: ${drum.getAttribute('data-key')} - Sound: ${drum.querySelector('.note').textContent}`);
});

