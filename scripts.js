$(document).ready(function() {
  // Storage for equation train
  // A leading whitespace is used so that the current term
  // can easily be added to using +=, since it remains a String
  var equation = [];
  var current_term = ' ';
  // React when one of the buttons is pressed
  $('.button').click(function() {
    // Get the text of the button that has been clicked
    var clicked;
    if($(this).attr('id'))
      clicked = $(this).attr('id');
    else
      clicked = $(this).text();

    // If a number is pressed
    if (clicked % 1 == 0) {
      current_term += clicked;
      updateDisplay(current_term);
    }
    // '=' is clicked
    else if (clicked == '=' && current_term != ' ') {
      // Remove the leading whitespace from the term
      // and push it into the equation train
      equation.push(current_term.substring(1));
      // Clear the current term
      current_term = ' ';
      // Execute the equation
      var answer = 0;
      var operator = " ";

      // First look for * or / in order to execute the calculation
      // in the correct order
      var multiply_position = equation.indexOf('*');
      var divide_position = equation.indexOf('/');
      // Check if both exist in equation
      if (multiply_position != -1 || divide_position != -1){
        console.log(equation);
        while(multiply_position != -1 || divide_position != -1){
          console.log("Equation: " + equation + "\t , Indexes: " + multiply_position + "," + divide_position);
          // Which is first?
          if((multiply_position < divide_position && multiply_position != -1) || divide_position == -1){
            // Mulitply first
            equation = multiply(equation, multiply_position);
          }
          if((divide_position < multiply_position && divide_position != -1) || multiply_position == -1){
            // Divide first
            equation = divide(equation, divide_position);
          }
          // Update indexes
          multiply_position = equation.indexOf('*');
          divide_position = equation.indexOf('/');
        }
      }

      // Do the remaining summation and subtraction
      for (var i = 0; i < equation.length; i++) {
        // First number
        if (i == 0)
          answer = Number(equation[i]);
        // If it is another number
        else if (equation[i] % 1 == 0 && operator != " ") {
          // Check which operator
          switch (operator) {
            case '+':
              answer += Number(equation[i]);
              operator = " ";
              break;
            case '-':
              answer -= Number(equation[i]);
              operator = " ";
              break;
          }
        }
        // If it is an operator
        else {
          operator = equation[i];
        }
        // Update the calculator display
        updateDisplay(answer);
      }
      // Clear the equation train
      equation = [];
    }
    // '.' is clicked
    else if (clicked == '.') {

    }
    // Clear is clicked
    else if (clicked == 'AC' || clicked == 'CE') {
      current_term = ' ';
      equation = [];
      updateDisplay(' ');
    }
    // '%' is clicked
    else if (clicked == '%' && current_term != ' ') {
      // TODO
    }
    // A normal operator is clicked
    else if(current_term != ' '){
      // Remove the leading whitespace from the term
      // and push it into the equation train
      equation.push(current_term.substring(1));
      // Push the operator into the equation train
      equation.push(clicked);
      // Clear the current term
      current_term = ' ';
      // Update the display with the operator
      updateDisplay(clicked);
    }
  });

});

// Update the display to match the given variable
function updateDisplay(data) {
  $('#display').text(data);
}

// Do multiplication with equation at certain point
function multiply(eq, index){
  eq[index-1] = Number(eq[index-1]) * Number(eq[index+1]);
  eq.splice(index,2);
  return eq;
}

// Do division with equation at certain point
function divide(eq, index){
  eq[index-1] = Number(eq[index-1]) / Number(eq[index+1]);
  eq.splice(index,2);
  return eq;
}
