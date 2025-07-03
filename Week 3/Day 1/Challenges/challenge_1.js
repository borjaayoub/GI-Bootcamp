const sentence = "The weather today is not as bad as yesterday.";
const wordNot = sentence.indexOf("not");
const wordBad = sentence.indexOf("bad");

let result;
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  result = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);
} else {
  result = sentence;
}
console.log(result);
