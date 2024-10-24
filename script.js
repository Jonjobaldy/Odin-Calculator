const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let currentInput = "";
let previousInput = "";
let operator = "";
let result = "";

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0){
        return "NOPE";
    }
    return a / b;
}

function operate(operator,a,b) {
    a = parseFloat(previousInput);
    b = parseFloat(currentInput);

    if (operator === "+") { 
        return add(a,b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "*") {
        return multiply(a,b);
    } else if (operator === "/") {
        return divide(a,b);
    } else {
        return "No operator selected";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.textContent;

        if (value === "AC") {
            clearDisplay();
        } else if (value === "=") {
            if (previousInput && currentInput && operator) {
                result = operate(operator, previousInput, currentInput);
                display.innerText = result;
                previousInput = result; // Store result for next operations
                currentInput = ""; // Reset current input
            }
        } else if (["/", "*", "+", "-"].includes(value)) {
            if (currentInput !== "") {
                if (previousInput !== "") {
                    // Perform the previous operation before storing the new operator
                    previousInput = operate(operator, previousInput, currentInput);
                    display.innerText = previousInput;
                } else {
                    previousInput = currentInput; // Set the previous input if it's the first operation
                }
                operator = value; // Store the current operator
                currentInput = ""; // Clear current input to receive the next number
            }
        } else {
            appendToDisplay(value); // Handle numbers and decimal points
        }
    })
})

function appendToDisplay(value) {
    currentInput += value;
    display.innerText = currentInput;
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    result = "";
    display.innerText = currentInput;
}