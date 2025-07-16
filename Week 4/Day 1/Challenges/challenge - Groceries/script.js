let client = "John";

const groceries = {
  fruits: ["pear", "apple", "banana"],
  vegetables: ["tomatoes", "cucumber", "salad"],
  totalPrice: "20$",
  other: {
    paid: true,
    meansOfPayment: ["cash", "creditCard"],
  },
};

const displayGroceries = () => {
  groceries.fruits.forEach(fruit => {
    console.log(fruit);
  });
}

let user = client;
user === 'Betty';
console.log(user, client);

const cloneGroceries = () => {
  let user = client;
  client = "Betty"; // we will not see any modification in the uesr variable, because primitives are copied by value, not by reference.
  
  let shopping = groceries;
  groceries.totalPrice = "35$"; // we will see this modification in the shopping object, because object are copied by reference, not by value.
  groceries.other.paid = false; // we will also see this modification in the shopping object, because object are copied by reference, not by value.
}

displayGroceries();
cloneGroceries();