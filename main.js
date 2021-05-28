let buttons = document.querySelectorAll("button");
let operations = document.querySelector(".operations");
let result = document.querySelector(".result");
let evaluate = document.querySelector("button[data='='");

// Basic operations for a standard calculator.
const plus = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

/* Parser for operations, It does not cover edge cases for now or capture incorrect
 * operations entered. I will modify and adjust for those cases in the future.
 */

const operate = (arr) => {
  let i = 1;
  let result = 0;

  // First we check for the division and multiplication operators in the expression
  // and proceed to use the basic operation functions defined above once found.
  while (arr.includes("*") || arr.includes("/")) {
    console.log(arr);

    if (arr[i] === "/" || arr[i] === "*") {
      switch (arr[i]) {
        case "*":
          result = multiply(+arr[i - 1], +arr[i + 1]);
          arr.splice(i - 1, 3, result);
          i = -1;
          break;
        case "/":
          result = divide(+arr[i - 1], +arr[i + 1]);
          arr.splice(i - 1, 3, result);
          i = -1;
          break;
      }
    }

    i += 2;
  }

  i = 1;

  // Lastly we check for the addition and subtraction operators in the expression
  // and proceed to use the basic operation functions defined above once found.
  while (arr.includes("-") || arr.includes("+")) {
    if (arr[i] === "+" || arr[i] === "-") {
      switch (arr[i]) {
        case "+":
          result = plus(+arr[i - 1], +arr[i + 1]);
          arr.splice(i - 1, 3, result);
          i = -1;
          break;
        case "-":
          result = subtract(+arr[i - 1], +arr[i + 1]);
          arr.splice(i - 1, 3, result);
          i = -1;
          break;
      }
    }
    i += 2;
  }

  // Once all operations are done, we return the arr.
  return arr;
};

const updateOperationState = (operation, value) => {
  if (value === "") {
    operation.innerText = "";
    result.innerText = "";
  } else if (value.match(/[\+\-\*\/]/)) {
    operation.innerText += `\u00A0${value}\u00A0`;
  } else if (value !== "=") {
    operation.innerText += `${value}`;
  }
};

// Event Listeners for each button except the equal symbol.

buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    updateOperationState(operations, e.target.getAttribute("data"));
    // updateResult(operations, result);
  });
});

evaluate.addEventListener("click", () => {
  // console.log(operations.innerText.split("\u00A0"));
  // console.log(operate(operations.innerText.split("\u00A0")));
  result.innerText = operate(operations.innerText.split("\u00A0"));
});
