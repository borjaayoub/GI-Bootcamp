const form = document.getElementById("emailForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

// Validation Without Regex
/*
form.onsubmit = function (event) {
  event.preventDefault(); // Prevent form submission
  
  const email = emailInput.value.trim();
  
  if (
    email.includes("@") &&
    email.indexOf("@") > 0 &&
    email.includes(".") &&
    email.lastIndexOf(".") > email.indexOf("@") + 1 &&
    email.lastIndexOf(".") < email.length - 1
  ) {
    message.textContent = "✅ Valid email address!";
    message.style.color = "green";
  } else {
    message.textContent = "❌ Invalid email address!";
  message.style.color = "red";
}
};
*/

// Validation With Regex
form.onsubmit = function (event) {
  event.preventDefault(); // Prevent form submission

  const email = emailInput.value.trim();
  // Regex for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email)) {
    message.textContent = "✅ Valid email address!";
    message.style.color = "green";
  } else {
    message.textContent = "❌ Invalid email address!";
    message.style.color = "red";
  }
};
