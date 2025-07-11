class Dog {
  constructor(name) {
    this.name = name;
  }
};

// the second option is the one which will successfully extend the "Dog" class

class Labrador extends Dog {
  constructor(name, size) {
    this.size = size;
  }
};

