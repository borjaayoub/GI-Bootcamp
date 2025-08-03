function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (cleanStr.length === 0) {
    return false;
  }

  const reversedStr = cleanStr.split("").reverse().join("");

  return cleanStr === reversedStr;
}

console.log("Testing palindrome function:");
console.log("'madam' is a palindrome:", isPalindrome("madam"));
console.log("'bob' is a palindrome:", isPalindrome("bob"));
console.log("'hello' is a palindrome:", isPalindrome("hello"));
console.log(
  "'A man, a plan, a canal: Panama' is a palindrome:",
  isPalindrome("A man, a plan, a canal: Panama")
);
console.log("'race a car' is a palindrome:", isPalindrome("race a car"));
console.log(
  "'Was it a car or a cat I saw?' is a palindrome:",
  isPalindrome("Was it a car or a cat I saw?")
);
