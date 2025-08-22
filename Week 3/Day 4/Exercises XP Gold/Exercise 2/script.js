// Function to remove selected color
function removecolor() {
  const select = document.getElementById("colorSelect");

  if (select.options.length > 0) {
    select.remove(select.selectedIndex); // Remove selected option
  } else {
    alert("No more colors to remove!");
  }
}

// Add event listener to button
document.getElementById("removeBtn").addEventListener("click", removecolor);
