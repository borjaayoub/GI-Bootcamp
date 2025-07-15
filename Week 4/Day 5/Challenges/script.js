function anagram(firstStr = '', secondStr = ''){
  let firstLetters = []
  let secondLetters = []

  for(let letters  of firstStr){
    firstLetters.push(letters)
    
  }
  for(let letters  of secondStr){
    secondLetters.push(letters)
  }
  firstLetters = firstLetters.join('').replace(/ /g, '').toLowerCase().split('').sort().join('');
  secondLetters = secondLetters.join('').replace(/ /g, '').toLowerCase().split('').sort().join('');

  if(firstLetters === secondLetters){
    console.log(`"${firstStr}" is an anagram of "${secondStr}"`)
  }

  
}

anagram("Astronomer", "Moon starer")
anagram("School master", "The classroom")
anagram("The Morse Code", "Here come dots")
