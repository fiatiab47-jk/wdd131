const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}


// Stars incorporation
document.addEventListener("DOMContentLoaded", () => {
  const starLabels = document.querySelectorAll(".stars label");
  const starInputs = document.querySelectorAll(".stars input");

  // Insert star character in each label
  starLabels.forEach(label => {
    label.innerHTML = "★";
  });

  // Optional: show filled stars when one is clicked
  starInputs.forEach(input => {
    input.addEventListener("change", () => {
      starLabels.forEach(label => label.style.color = "#1d1c1c"); // reset
      const checkedIndex = Array.from(starInputs).indexOf(document.querySelector(".stars input:checked"));
      for (let i = 0; i <= checkedIndex; i++) {
        starLabels[i].style.color = "gold"; // fill selected stars
      }
    });
  });
});


// Product array
const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];


// Populated product options dynamically
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product");
    if (productSelect) {
        products.forEach(p => {
            const option = document.createElement("option");
            option.value = p.id // value = product id
            option.textContent = p.name; // display = product name
            productSelect.appendChild(option);
        });
    }

    // Review counter for review.html
    const reviewCountSpan = document.getElementById("reviewCount");
    if (reviewCountSpan) {
        let count = localStorage.getItem("reviewCount") || 0;
        count = parseInt(count) + 1;
        localStorage.setItem("reviewCount", count);
        reviewCountSpan.textContent = count;
    }
});