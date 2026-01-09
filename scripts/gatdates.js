// Current year
document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

// Last modified date
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;