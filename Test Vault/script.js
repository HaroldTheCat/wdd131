// script.js

let enteredCode = "";
const correctCode = "1234"; // Set your desired code here

function enterDigit(digit) {
    if (enteredCode.length < 4) { // Assuming a 4-digit code
        enteredCode += digit;
        document.getElementById("display").innerText = enteredCode;
    }
}

function clearDisplay() {
    enteredCode = "";
    document.getElementById("display").innerText = "";
}

function checkCode() {
    if (enteredCode === correctCode) {
        alert("Safe Opened!");
        // Add your code to "open" the safe here
    } else {
        alert("Incorrect Code. Try Again.");
        clearDisplay();
    }
}