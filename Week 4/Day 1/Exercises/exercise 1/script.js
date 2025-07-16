/*
  #1
    #1.1 when the funcOne() called, the value of 'a' is 3.
    
    #1.2 when using const, we get an error because 'a' can't b changed when declared as a consonant.
  
  #2
    #2.1 when funcThree() first called, 'a' takes the value of 0, but when funcThree() called after calling funcTwo(),
      the value of 'a' changes to 5.
    
    #2.2 we get an error when calling funcTwo() because we can't reassigned 'a' when declared as a consonant.
  
  #3
    3.1 after funcFour() runs, 'a' is "hello" everywhere in the global scope, including inside funcFive().

  #4
    #4.1 after funcSix() runs, 'a' value changes to 'test'.
    
    #4.2 using const instead of let makes no difference, since funcSix() is not reassigning 'a' inside the function.
      the output will still be 'test'.

  #5
    #5.1 the variable 'a' inside the if statement is separated from the one outside due to block scoping with let.
      Each alert uses the 'a' from its own scope.

    #5.2 if we replace 'let' with 'const' for both variables, the behavior will be the same,
      because each 'a' exists only in its own block.

*/

