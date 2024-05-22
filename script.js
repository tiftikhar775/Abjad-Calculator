// highlights corresponding numerical value when abjad key is hovered over.
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'abjad-calc-button' and store them in a NodeList
    const abjadButtons = document.querySelectorAll('.abjad-calc-button');

    // Iterate over each button in the NodeList
    abjadButtons.forEach(button => {
        // Add a 'mouseover' event listener to each button
        button.addEventListener('mouseover', function () {
            // Extract the numerical part of the button's ID and construct the corresponding numerical cell's ID
            const id = this.id.replace('abjad-', 'num-');
            // Get the numerical cell element using the constructed ID
            const numCell = document.getElementById(id);
            // If the numerical cell exists, add the 'highlight' class to it
            if (numCell) {
                numCell.classList.add('highlight');
            }
        });

        // Add a 'mouseout' event listener to each button
        button.addEventListener('mouseout', function () {
            // Extract the numerical part of the button's ID and construct the corresponding numerical cell's ID
            const id = this.id.replace('abjad-', 'num-');
            // Get the numerical cell element using the constructed ID
            const numCell = document.getElementById(id);
            // If the numerical cell exists, remove the 'highlight' class from it
            if (numCell) {
                numCell.classList.remove('highlight');
            }
        });
    });
});



// display abjad key values within textbox on click

// make textbox readonly


// calculate button functionality

// clear button functionality 











