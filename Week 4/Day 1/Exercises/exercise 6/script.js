(function(numberOfChildren, partnerName, location, jobTitle) {
  const sentence = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numberOfChildren} kids.`;
  document.body.innerHTML = `<p>${sentence}</p>`;
})(3, 'Miyoung', 'Paris', 'Web Developer');