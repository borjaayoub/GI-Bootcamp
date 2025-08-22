const select = document.getElementById('genres');
    const result = document.getElementById('result');

     // Function to show selected value
    function displaySelectedValue() {
      result.textContent = `Selected: ${select.value}`;
    }
    displaySelectedValue();

    // Update displayed value when selection changes
    select.addEventListener('change', displaySelectedValue);

    // Add new option "Classic" to the select element
    const newOption = document.createElement('option');
    newOption.value = 'classic';
    newOption.text = 'Classic';
    select.appendChild(newOption);

    // Make the new option selected by default
    newOption.selected = true;

    displaySelectedValue();