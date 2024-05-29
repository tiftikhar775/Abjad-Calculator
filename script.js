document.addEventListener('DOMContentLoaded', function () {
    const abjadButtons = document.querySelectorAll('.abjad-calc-button');

    abjadButtons.forEach(button => {
        button.addEventListener('mouseover', function () {
            // Highlight numerical cell
            const numId = this.id.replace('abjad-', 'num-');
            const numCell = document.getElementById(numId);
            if (numCell) {
                numCell.classList.add('highlightNum');
            }

            // Highlight ordinal cell
            const ordId = this.dataset.ord;
            const ordCell = document.getElementById(ordId);
            if (ordCell) {
                ordCell.classList.add('highlightOrd');
            }
        });

        button.addEventListener('mouseout', function () {
            // Remove highlight from numerical cell
            const numId = this.id.replace('abjad-', 'num-');
            const numCell = document.getElementById(numId);
            if (numCell) {
                numCell.classList.remove('highlightNum');
            }

            // Remove highlight from ordinal cell
            const ordId = this.dataset.ord;
            const ordCell = document.getElementById(ordId);
            if (ordCell) {
                ordCell.classList.remove('highlightOrd');
            }
        });
    });
});

// keep keys highlighted when clicked

// display abjad key values within textbox on click
function addCharacter(char) {
    const output = document.getElementById('output');
    output.value = output.value + char;
}

// clear button functionality
function clearOutput() {
    const output = document.getElementById('output');
    const abjadValue = document.getElementById('abjadValue');
    output.value = '';
    abjadValue.value = '';
}

// delete char functionality
function deleteChar() {
    const output = document.getElementById('output');
    output.value = output.value.slice(0, -1);
}


// calculate button functionality
// Abjad Formula:   
// sum of numerical value of all characters + number of unique characters + value of letters with  ّ 
function calculate() {
    const output = document.getElementById('output').value;
    const abjadValue = document.getElementById('abjadValue');

    // assign values to arabic chars
    const abjadValues = {
        'أ': 1, 'ب': 2, 'ج': 3, 'د': 4, '٥': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10,
        'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100,
        'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
    };

    let sum = 0;
    let uniqueChars = new Set();

    // Calculate the sum of numerical values of characters
    for (let char of output) {
        sum += abjadValues[char] || 0;
        // count num of unique chars
        uniqueChars.add(char);
    }

    // add total value of unique chars to sum
    sum += uniqueChars.size;

    // Display the result
    abjadValue.value = sum;
}










