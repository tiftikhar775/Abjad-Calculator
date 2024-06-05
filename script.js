document.addEventListener('DOMContentLoaded', function () {
    const inputArea = document.getElementById('output');
    const abjadButtons = document.querySelectorAll('.abjad-calc-button');
    let selectionCounts = {};

    abjadButtons.forEach(button => {
        const numId = button.id.replace('abjad-', 'num-');
        const ordId = button.dataset.ord;

        // Highlight text on hover
        button.addEventListener('mouseover', function () {
            highlight(numId, ordId, button.classList.contains('sun') ? 'highlight-sun' : 'highlight-moon');
        });

        // Remove text highlight on mouseout if not selected
        button.addEventListener('mouseout', function () {
            if (!selectionCounts[button.id]) {
                unhighlight(numId, ordId, button.classList.contains('sun') ? 'highlight-sun' : 'highlight-moon');
            }
        });

        // Highlight background on click
        button.addEventListener('click', function () {
            const char = button.getAttribute('data-char');
            const currentText = inputArea.value;
            const lastChar = currentText[currentText.length - 1];

            if (char === 'ّ' && lastChar) {
                inputArea.value = currentText.slice(0, -1) + lastChar + 'ّ';
            } else {
                inputArea.value += char;
            }

            // Update the selection count
            if (!selectionCounts[button.id]) {
                selectionCounts[button.id] = 0;
            }
            selectionCounts[button.id]++;
            updateSelectionDisplay(button, numId, ordId, selectionCounts[button.id]);
        });
    });

    function highlight(numId, ordId, highlightClass) {
        const numCell = document.getElementById(numId);
        const ordCell = document.getElementById(ordId);
        if (numCell) numCell.classList.add(highlightClass);
        if (ordCell) ordCell.classList.add(highlightClass);
    }

    function unhighlight(numId, ordId, highlightClass) {
        const numCell = document.getElementById(numId);
        const ordCell = document.getElementById(ordId);
        if (numCell) numCell.classList.remove(highlightClass);
        if (ordCell) ordCell.classList.remove(highlightClass);
    }

    function updateSelectionDisplay(button, numId, ordId, count) {
        const isSun = button.classList.contains('sun');
        const highlightClass = isSun ? 'highlight-selected-sun' : 'highlight-selected-moon';
        
        // Highlight the button with background color
        button.classList.add('highlight');

        // Highlight background of the numerical and ordinal values
        highlight(numId, ordId, highlightClass);

        // Add or update the count badge
        let badge = button.querySelector('.count-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.classList.add('count-badge');
            button.appendChild(badge);
        }
        badge.textContent = count;
    }

    function clearOutput() {
        const output = document.getElementById('output');
        const abjadValue = document.getElementById('abjadValue');
        output.value = '';
        abjadValue.value = '';

        // Reset all highlights and counts
        abjadButtons.forEach(button => {
            const numId = button.id.replace('abjad-', 'num-');
            const ordId = button.dataset.ord;
            button.classList.remove('highlight');
            unhighlight(numId, ordId, 'highlight-sun');
            unhighlight(numId, ordId, 'highlight-moon');
            unhighlight(numId, ordId, 'highlight-selected-sun');
            unhighlight(numId, ordId, 'highlight-selected-moon');
            const badge = button.querySelector('.count-badge');
            if (badge) badge.remove();
        });
        selectionCounts = {};
    }

    function deleteChar() {
        const output = document.getElementById('output');
        const deletedChar = output.value.slice(-1);
        output.value = output.value.slice(0, -1);

        abjadButtons.forEach(button => {
            if (button.getAttribute('data-char') === deletedChar) {
                const numId = button.id.replace('abjad-', 'num-');
                const ordId = button.dataset.ord;
                if (selectionCounts[button.id]) {
                    selectionCounts[button.id]--;
                    if (selectionCounts[button.id] === 0) {
                        button.classList.remove('highlight');
                        unhighlight(numId, ordId, 'highlight-sun');
                        unhighlight(numId, ordId, 'highlight-moon');
                        unhighlight(numId, ordId, 'highlight-selected-sun');
                        unhighlight(numId, ordId, 'highlight-selected-moon');
                        const badge = button.querySelector('.count-badge');
                        if (badge) badge.remove();
                        delete selectionCounts[button.id];
                    } else {
                        const badge = button.querySelector('.count-badge');
                        if (badge) badge.textContent = selectionCounts[button.id];
                    }
                }
            }
        });
    }

    function calculate() {
        const output = document.getElementById('output').value;
        const abjadValue = document.getElementById('abjadValue');

        const abjadValues = {
            'ّ': 0, 'أ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10,
            'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100,
            'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
        };

        let sum = 0;
        let uniqueChars = new Set();
        let shaddaValue = 0;

        for (let i = 0; i < output.length; i++) {
            let char = output[i];
            if (char === 'ّ' && i > 0) {
                let prevChar = output[i - 1];
                shaddaValue += abjadValues[prevChar];
            } else {
                sum += abjadValues[char] || 0;
                uniqueChars.add(char);
            }
        }

        sum += shaddaValue;
        sum += uniqueChars.size;
        abjadValue.value = sum;
    }

    window.clearOutput = clearOutput;
    window.deleteChar = deleteChar;
    window.calculate = calculate;

    // Reset highlights and counts on page load/refresh
    clearOutput();
});

document.querySelectorAll('.arabic-char').forEach(char => {
    char.addEventListener('mouseover', () => {
        // Add hover classes to related ordinal and numerical values
        const ordId = char.getAttribute('data-ord-id');
        const numId = char.getAttribute('data-num-id');
        
        document.getElementById(ordId).classList.add('sun-hover');
        document.getElementById(numId).classList.add('moon-hover');
    });

    char.addEventListener('mouseout', () => {
        // Remove hover classes from related ordinal and numerical values
        const ordId = char.getAttribute('data-ord-id');
        const numId = char.getAttribute('data-num-id');
        
        document.getElementById(ordId).classList.remove('sun-hover');
        document.getElementById(numId).classList.remove('moon-hover');
    });
});
