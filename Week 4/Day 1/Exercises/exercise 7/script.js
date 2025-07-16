(function(name) {
  var navbar = document.getElementById('navbar');
  var userDiv = document.createElement('div');
  userDiv.style.display = 'flex';
  userDiv.style.alignItems = 'center';
  var img = document.createElement('img');
  img.src = 'https://randomuser.me/api/portraits/men/5.jpg';
  img.alt = name + "'s profile picture";
  img.style.width = '32px';
  img.style.height = '32px';
  img.style.borderRadius = '50%';
  img.style.marginRight = '8px';
  var span = document.createElement('span');
  span.textContent = "Welcome, " + name;
  span.style.marginLeft = '8px'; // Add space between image and text
  userDiv.appendChild(img);
  userDiv.appendChild(span);
  navbar.appendChild(userDiv);
})("John"); 