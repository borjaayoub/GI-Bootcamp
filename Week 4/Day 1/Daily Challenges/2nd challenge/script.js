const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJS() {
  return new Promise((resolve, reject) => {
    let morseObj;
    try {
      morseObj = JSON.parse(morse);
    } catch (e) {
      return reject("Invalid JSON format");
    }
    if (!morseObj || Object.keys(morseObj).length === 0) {
      return reject("Morse object is empty");
    }
    resolve(morseObj);
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const input = prompt("Enter a word or sentence:").toLowerCase();
    const morseArr = [];
    for (let char of input) {
      if (char === " ") {
        morseArr.push(" ");
        continue;
      }
      if (!morseJS[char]) {
        return reject(`Character '${char}' not found in Morse object`);
      }
      morseArr.push(morseJS[char]);
    }
    resolve(morseArr);
  });
}

function joinWords(morseTranslation) {
  const output = morseTranslation.join('<br>');
  // Create or select an output element
  let outputDiv = document.getElementById('morse-output');
  if (!outputDiv) {
    outputDiv = document.createElement('div');
    outputDiv.id = 'morse-output';
    document.body.appendChild(outputDiv);
  }
  outputDiv.innerHTML = output;
}

window.onload = function() {
  toJS()
    .then(morseObj => toMorse(morseObj))
    .then(morseArr => joinWords(morseArr))
    .catch(err => {
      let outputDiv = document.getElementById('morse-output');
      if (!outputDiv) {
        outputDiv = document.createElement('div');
        outputDiv.id = 'morse-output';
        document.body.appendChild(outputDiv);
      }
      outputDiv.innerHTML = `<span style='color:green;'>${err}</span>`;
    });
};

