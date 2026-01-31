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


// Temples Array
        
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...

  {
    templeName: "Atlanta Georgia Temple",
    location: "Sandy Springs, Georgia",
    dedicated: " 1983, June, 1 to 4 ",
    area: 34500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/atlanta-georgia-temple/atlanta-georgia-temple-13940-main.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "57 Independence Ave, North Ridge, Accra",
    dedicated: "2004, January, 11 ",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Bangkok Thailand Temple",
    location: "Makkasan, Ratchathewi, Bangkok",
    dedicated: "2023, October, 22",
    area: 48525,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bangkok-thailand-temple/bangkok-thailand-temple-40037-main.jpg"
  }
];


function displayTemples(filteredTemples) {
  // Select the container where temple cards will be added
  const container = document.querySelector("#temples");
  container.innerHTML = "";     // Clear previous cards

  // Loop through each temple object
  filteredTemples.forEach(temple => {
      // Create a Card section
      const card = document.createElement("section");

      // Temple name
      const name = document.createElement("h2");
      name.textContent = temple.templeName;

      // Temple Location
      const location = document.createElement("p");
      location.textContent = `Location: ${temple.location}`;

      // Temple dedication date
      const dedicated = document.createElement("p");
      dedicated.textContent = `Dedicated: ${temple.dedicated}`;

      // Temple area
      const area = document.createElement("p");
      area.textContent = `Size: ${temple.area} sq ft`;


      // Temple images with lazy loading
      const img = document.createElement("img");
      img.src = temple.imageUrl;
      img.alt = temple.templeName;
      img.loading = "lazy";
    
      img.style.opacity = 0;
      img.style.transition = "opacity 0.5s ease-in";
    
      img.addEventListener("load", () => {
        img.style.opacity = 1; // fade in when image is fully loaded
      });
    


      // Add all element to the card
      card.append(name, location, dedicated, area, img);

      // Add card the page
      container.appendChild(card);

  });
}

// Event Listeners for Menu Filtering 
const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page jump
    const filter = link.textContent.toLowerCase();

    let filtered = [];

    switch(filter) {
      case "home":
        filtered = temples;
        break;
      case "old":
        filtered = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
        break;
      case "new":
        filtered = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
        break;
      case "large":
        filtered = temples.filter(t => t.area > 90000);
        break;
      case "small":
        filtered = temples.filter(t => t.area < 10000);
        break;
    }

    displayTemples(filtered);
  });
});

// Initial Load 
// show all temples when page loads
displayTemples(temples);

 