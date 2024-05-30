document.addEventListener('DOMContentLoaded', function () {
    const inputArea = document.getElementById('output');
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

        // Combine letters with shadda
        button.addEventListener('click', () => {
            const char = button.getAttribute('data-char');
            const currentText = inputArea.value;
            const lastChar = currentText[currentText.length - 1];

            if (char === 'ّ' && lastChar) {
                // If shadda is clicked it should combine with last char
                inputArea.value = currentText.slice(0, -1) + lastChar + 'ّ';
            } else {
                inputArea.value += char;
            }
        });
    });
});

// Clear button functionality
function clearOutput() {
    const output = document.getElementById('output');
    const abjadValue = document.getElementById('abjadValue');
    output.value = '';
    abjadValue.value = '';
}

// Delete char functionality
function deleteChar() {
    const output = document.getElementById('output');
    output.value = output.value.slice(0, -1);
}

// Calculate button functionality
// Abjad Formula:   
// sum of numerical value of all characters + number of unique characters + value of letters with ّ
function calculate() {
    const output = document.getElementById('output').value;
    const abjadValue = document.getElementById('abjadValue');

    // Assign values to Arabic chars
    const abjadValues = {
        'ّ': 0, 'أ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10,
        'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100,
        'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
    };

    let sum = 0;
    let uniqueChars = new Set();
    let shaddaValue = 0;

    // Calculate the sum of numerical values of characters
    for (let i = 0; i < output.length; i++) {
        let char = output[i];
        if (char === 'ّ' && i > 0) {
            let prevChar = output[i - 1];
            shaddaValue += abjadValues[prevChar];
            console.log(`Shadda detected. Adding ${abjadValues[prevChar]} for character ${prevChar}`);
        } else {
            sum += abjadValues[char] || 0;
            uniqueChars.add(char);
            console.log(`Adding ${abjadValues[char] || 0} for character ${char}`);
        }
    }

    // Add the value of letters with shadda
    sum += shaddaValue;
    console.log(`Total shadda value: ${shaddaValue}`);

    // Add total value of unique chars to sum
    sum += uniqueChars.size;
    console.log(`Unique characters count: ${uniqueChars.size}`);

    // Display the result
    abjadValue.value = sum;
    console.log(`Total Abjad value: ${sum}`);
}
