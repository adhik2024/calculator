const buttons = document.querySelectorAll('.key');
const display_input = document.querySelector('.input');
const display_output = document.querySelector('.output');

let input = '';

for (let key of buttons) {
  const value = key.getAttribute('data-key');

  key.addEventListener('click', () => {
    if (value === 'clear') {
      input = '';
      display_input.innerHTML = '';
      display_output.innerHTML = '';
    } else if (value === 'backspace') {
      input = input.slice(0, -1);
      display_input.innerHTML = input;
    } else if (value === '=') {
      let result = evaluateExpression(input);
      display_output.innerHTML = result;
      input = result.toString();
    } else if (value === 'brackets') {
      if (input.indexOf('(') === -1 ||
          (input.indexOf('(') !== -1 &&
           input.indexOf(')') !== -1 &&
           input.lastIndexOf('(') < input.lastIndexOf(')'))
      ) {
        input += '(';
      } else if (
        (input.indexOf('(') !== -1 &&
         input.indexOf(')') === -1) ||
        (input.indexOf('(') !== -1 &&
         input.indexOf(')') !== -1 &&
         input.lastIndexOf('(') > input.lastIndexOf(')'))
      ) {
        input += ')';
      }

      display_input.innerHTML = input;
    } else if (value === 'percentage') {
      input += '/100*';
      display_input.innerHTML = input;
    } else {
      input += value;
      display_input.innerHTML = input;
    }
  });
}

function evaluateExpression(expression) {
  try {
    // Replace 'x' with '*' for multiplication
    expression = expression.replace(/x/g, '*');
    // Evaluate the expression
    return eval(expression);
  } catch (error) {
    return '';
  }
}