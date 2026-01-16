// Current year
document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

// Last modified date
document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

// Hamburger Functionality 
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open"); // show/hide menu
    menuButton.classList.toggle("open"); // change icon (☰ ↔ ❎)
});