const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const num = btn.dataset.num;
    const op = btn.dataset.op;
    const dec = btn.dataset.dec;

    if (btn.id === 'clear') { // AC button
      currentInput = '';
      display.value = '';
      resultDisplayed = false;
    } 
    else if (btn.id === 'equals') {
      try {
        currentInput = eval(currentInput.replace(/×/g,'*').replace(/÷/g,'/')).toString();
        display.value = currentInput;
        resultDisplayed = true;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } 
    else if (num !== undefined) {
      if (resultDisplayed) { currentInput = ''; resultDisplayed = false; }
      currentInput += num;
      display.value = currentInput;
    } 
    else if (op !== undefined) {
      if (resultDisplayed) resultDisplayed = false;
      currentInput += op;
      display.value = currentInput;
    } 
    else if (dec !== undefined) {
      if (!currentInput.endsWith('.') && !currentInput.includes('.')) {
        currentInput += dec;
        display.value = currentInput;
      }
    }
  });
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') {
    currentInput += e.key;
    display.value = currentInput;
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
      resultDisplayed = true;
    } catch {
      display.value = 'Error';
      currentInput = '';
    }
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key.toLowerCase() === 'c') {
    currentInput = '';
    display.value = '';
  } else if (e.key === '.') {
    currentInput += '.';
    display.value = currentInput;
  }
});