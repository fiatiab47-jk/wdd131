// Select elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Click event to the Add Chapter button
button.addEventListener('click', function () {

    // Check if input is not empty
    // .trim() removes spaces at the start and end of the input
    // This ensures the user didn't just type spaces
    if (input.value.trim() !== '') {

        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        
        // Populate li and delete button
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete'); // optional for styling

        // Append delete button to li
        li.append(deleteButton);

        // Append li ot the list
        list.append(li);

         // Add delete functionality
        deleteButton.addEventListener('click', function () {
            list.removeChild(li); // removes this li
            input.focus();        // returns focus to input
        });

        // Clear input and focus
        input.value = '';
        input.focus();

    } else {
        //input is blank
        alert('Please enter a chapter!');
        input.focus();
    }
});