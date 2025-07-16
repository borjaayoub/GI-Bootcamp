// Function Declaration
function kiloToGramsDecl(weight) {
  return weight * 1000 + "gr";
}
console.log(kiloToGramsDecl(0.25));

// Function Expression
const kiloToGramsExpr = function(weight) {
  return weight * 1000 + "gr";
};
console.log(kiloToGramsExpr(0.25));

// Function declaration is hoisted, can be called before it's defined, function expression is not.


let kiloToGrams = weight => weight * 1000 + "gr";
console.log(kiloToGrams(0.25));