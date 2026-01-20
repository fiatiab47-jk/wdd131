// Methods
const title = document.querySelector("#title");
const btn = document.querySelector("#btn");
const highlight = document.querySelector(".highlight")
const input = document.querySelector("#nameInput");
const output = document.querySelector("#output");

// Manipulation
// change text
title.textContent = "Let me take you through this lesson.";
title.innerHTML = "<strong>Welcome to Dynamic Web Fundamentals!</strong>";

// change styles
title.style.color = "blue";
btn.style.background = "navy";
btn.style.color = "yellow";
btn.style.padding = "1rem";
highlight.style.background = "orange";
input.style.width = "540px"

// Events
// Click Event
btn.addEventListener("click", () => {
 btn.textContent = "You clicked the button!";
});
// Form & Input Events
input.addEventListener("input", () => {
    output.textContent = input.value;
});
// Event Object (event or e)
button.addEventListener("click", (event) => {
  console.log(event);
});

// Add/Remove Classes
highlight.classList.remove("highlight");
highlight.classList.add("high");
highlight.classList.toggle("high");

