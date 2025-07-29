const products = require('./products');

const productSearch = (name) =>{
  const product = products.find(product => product.name.toLowerCase() === name.toLowerCase());
  if (product) {
    console.log("Product found:", product);
  } else {
    console.log(`Product "${name}" not found.`);
  }
}

productSearch('Laptop');
console.log('--------------------------------------------------------------------------')
productSearch('Headphones');
console.log('--------------------------------------------------------------------------')
productSearch('Cellphone');
console.log('--------------------------------------------------------------------------')