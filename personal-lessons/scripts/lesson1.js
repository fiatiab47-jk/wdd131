console.log("lesson1.js is connected");

// Select elements from the DOM
const input = document.querySelector("#itemInput");
const button = document.querySelector("#addBtn");
const list = document.querySelector("#itemList");

// Listen for a click event 
button.addEventListener("click", () => {
    // Reads the current text inside the input field
    // Stores it as a string in itemText
    const itemText = input.value;
    // checks if user typed anything
    if (itemText === "") return;
    // Creates a new list in memory, but not visible on the page yet
    const li = document.createElement("li");

    // Sets the text of the list item to what the user typed
    li.textContent = itemText;

    // Creates a new <button> element
    const deleteBtn = document.createElement("button");
    // Add delete functionality
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        list.removeChild(li);
    });
    // Add button to list item, then list item to list
    li.appendChild(deleteBtn);
    list.appendChild(li);
    // Clear the input field
    input.value = "";

});