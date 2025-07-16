function makeJuice(size) {
  let ingredients = []
  function addIngredients(ing1, ing2, ing3) {
    // const resultDiv = document.getElementById('order-result');
    // resultDiv.textContent = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}.`;
    ingredients.push(ing1, ing2, ing3)
  }
  
  function displayJuice(){
    const resultDiv = document.getElementById('order-result');
    resultDiv.textContent = `The client wants a ${size} juice, containing ${ingredients.join(', ')}`
  }

  addIngredients("apple", "banana", "orange");
  addIngredients("kiwi", "mango", "pineapple");
  displayJuice();
}

makeJuice("large");
