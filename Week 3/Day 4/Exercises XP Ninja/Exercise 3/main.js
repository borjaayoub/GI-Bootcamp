const button = document.getElementById("getLocationBtn");
const output = document.getElementById("output");

button.onclick = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        output.textContent = `Latitude: ${latitude}\nLongitude: ${longitude}`;
      },
      function (error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            output.textContent = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            output.textContent = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            output.textContent = "The request to get user location timed out.";
            break;
          default:
            output.textContent = "An unknown error occurred.";
        }
      }
    );
  } else {
    output.textContent = "Geolocation is not supported by this browser.";
  }
};
