// ---------------------------
// Navigation Toggle Hamburger
// ---------------------------
const menuButton = document.querySelector('#menuButton');
const primaryNav = document.querySelector('#primaryNav');

menuButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', `{isOpen}`);
});


// -----------------------------------
// Welcome Message with local storage
// -----------------------------------
const welcomeMessage = document.querySelector('#welcomeMessage');

function getGreeting() {
    const hours = new Date().getHours();
    let greeting = '';

    if (hours < 12) {
        greeting = 'Good morning';
    } else if (hours < 17) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'good evening';
    }

    return greeting;
}

function displayWelcomeMessage() {
    let visits = Number(localStorage.getItem('visits')) || 0;
    visits++;
    localStorage.setItem('visits', visits);

    const greeting = getGreeting();

    if (welcomeMessage) {
        welcomeMessage.textContent =  `${greeting}! Welcome to A.J. Cutz. This is your visit number ${visits}.`;
    }

}
displayWelcomeMessage();


// -----------------------------
// Dynamic Footer Injection
// -----------------------------
function createFooter() {
    const footer = document.createElement('footer');

    // Get last modified date of the document
    const lastModified = document.lastModified;

     footer.innerHTML = `
    <p>&copy; 2026 A.J. Cutz Online Barbershop | Albert Fiati</p>
    <p>Last Modified: ${lastModified}</p>
    `;
    
    document.body.appendChild(footer);
}
createFooter();
// {/* <p><a href="references.html">References</a></p> */}


// --------------------------------
// Services Data (Objects & Array)
// --------------------------------
const services =[
    {
        id: 1,
        name: 'Classic Haircut',
        category: 'Haircut',
        description: 'A clean and professional haircut tailored to your style.',
        priceAdult: 50,
        priceChild: 35,
        duration: 40,
        supportsDye: true,
        image: 'images/haircut.webp' 
    },
    {
        id: 2,
        name: 'Fade & Taper',
        category: 'Haircut',
        description: 'Modern fades, smooth transitions, and crispy finishing.',
        priceAdult: 60,
        priceChild: 40,
        duration: 60,
        supportsDye: true,
        image: 'images/fade.webp' 
    },
    {
        id: 3,
        name: 'Beard Grooming',
        category: 'Grooming',
        description: 'Precision beard trimming for a polished look.',
        priceAdult: 25,
        priceChild: 15,
        duration: 15,
        supportsDye: false,
        image: 'images/beard.webp' 
    },
    {
        id: 4,
        name: 'Kids Haircut',
        category: 'Haircut',
        description: 'Gentle haircut service designed for children.',
        priceAdult: 0,
        priceChild: 30,
        duration: 15,
        supportsDye: false,
        image: 'images/kids.webp' 
    }
];
// Dye add-on pricing object
const dyePricing = { adult: 15, child: 10 };


// ============================
// Render Services to the Page
// ============================
function renderServices() {
    // Select container where services will appear
    const container = document.querySelector('#servicesContainer');
    const message = document.querySelector('#selectedServiceMessage');

    // Stop executing if not on the service page
    if (!container) {
        return;
    }

    // Clear the existing content before rendering
    container.innerHTML = '';
    // loop through the services array using forEach array method
    services.forEach(service => {
        // Determine if the service is premium using conditional logic
        const isPremium = service.priceAdult >= 60;

        // Create an article element for each service
        const card = document.createElement('article');

        // Build the HTML using template literals ONLY
        card.innerHTML = `
            <h3>${service.name}</h3>
            <p><strong>Category:</strong> ${service.category}</p>
            
            <img src="${service.image}" alt="${service.name}" loading= "lazy">
            
            <p>${service.description}</p>
            <p><strong>Duration:</strong> ${service.duration} minutes</p>
            <p><strong>Adult Price:</strong> $${service.priceAdult}</p>
            <p><strong>Child Price:</strong> $${service.priceChild}</p>
            
            <p>${isPremium ? 'Premium service.' : 'Standard service.'}</p>

            ${
                service.supportsDye
                    ? `<label>
                        <input type="checkbox" data-dye="${service.id}"> Add Hair Dye
                        </label>`
                    : `<p><em>Dye not available for this service.</em></p>`
            }

            <button data-id="${service.id}">Select Service</button>
            `;
        // Add the service card to the container
        container.appendChild(card);
    });

        // Attach event listener ONLY ONCE
    if (!container.dataset.listenerAttached) {
        container.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                const serviceId = Number(event.target.dataset.id);
                saveSelectedService(serviceId);
            }
        });
        container.dataset.listenerAttached = 'true';
    }

    // Display saved service if one exists
    displaySelectedService(message);

}



//  ==========================================
//    SAVE SELECTED SERVICE (localStorage)
//    ========================================== 
function saveSelectedService(serviceId) {
    const selectedService = services.find(
        service => service.id === serviceId
    );

    // Check if dye checkbox exist and is checked
    const dyeCheckbox = document.querySelector(
        `input[data-dye="${serviceId}"]`);
    
    const includesDye = dyeCheckbox ? dyeCheckbox.checked : false;

    // Create final object to store
    const finalSelection = {
        ...selectedService,
        includesDye
    };

    // Save to localStorage as a string
    localStorage.setItem(
        'preferredService',
        JSON.stringify(finalSelection)
    );

    // Updated message immediately
    displaySelectedService(
        document.querySelector('#selectedServiceMessage')
    );
}


//  =============================================
//    DISPLAY SAVED SERVICE & CALCULATE TOTAL PRICE
//    ==============================================
function displaySelectedService(messageElement){
    if (!messageElement) {
        return;
    }

    // Retrieve and parse stored service
    const stored = JSON.parse(localStorage.getItem('preferredService'));

    if (stored) {
        // Calculate totals conditionally
        const adultTotal = stored.priceAdult +
            (stored.includesDye ? dyePricing.adult : 0);
        
        const childTotal = stored.priceChild +
            (stored.includesDye ? dyePricing.child : 0);
        
         // Display final message
    messageElement.textContent = `
        Selected service: ${stored.name}.
        Adult total: $${adultTotal}.
        Child total: $${childTotal}.
        ${stored.includesDye ? 'Includes hair dye.' : 'No hair dye added.'}
    `;
    } else {
    messageElement.textContent =
      'You have not selected a preferred service yet.';
    }
    
}


//===================================
// Auto-Fill Service on Contact page
// ==================================
// This function checks if a preferred was saved from the service page.
// If it exists, it automatically selects that service inside the contact form.

function autoFillService() {
    // Select the service dropdown
    const serviceSelect = document.querySelector('#service');
    // if not on contact page, stop function
    if (!serviceSelect) return;
    // If a stored service exists, set dropdown value
    const stored = JSON.parse(localStorage.getItem('preferredService'));
    if (stored) {
        serviceSelect.value = stored.name;
    }
}


// =======================
// CONTACT FORM HANDLER
// =======================
// This function; prevents default form submission, validates required fields,
// creates an appointment in the localStorage, saves appointment in the localStorage
// displays confirmation message
function handleContactForm() {
    // Select form and confirmation message container
    const form = document.querySelector('#contactForm');
    const confirmation = document.querySelector('#formConfirmation');
    //if form doesn't exist on contact page stop 
    if (!form) return;

    // Prevent selecting past dates
    const dateInput = document.querySelector('#appointmentDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today)

    // Add submit event listener
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get trimmed values from form fields
        const fullName = document.querySelector('#fullName').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const service = document.querySelector('#service').value;
        const date = document.querySelector('#appointmentDate').value;

        // Conditional validation check
        if (!fullName || !email || !phone || !service || !date) {
            confirmation.textContent =
                "Please complete all required fields.";
            
            confirmation.style.color = "red";
            return;
        }
        // Create appointment object
        const appointment = {
            fullName,
            email,
            phone,
            service,
            date
        };

        // Store appointment in localStorage
        localStorage.setItem(
            'latestAppointment',
            JSON.stringify(appointment)
        );

        // Display success confirmation using template literal
        // confirmation.textContent =
        //     `Thank you ${fullName}! Your appointment for ${service} on ${date} has been received.`;

        // confirmation.style.color = "green";

        // Reset form after submission
        // Redirect to thank-you page after 1 second
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 2000);

        form.reset();
        });
};


// ==================================
// Thank You Page Message From URL
// ==================================
// This function reads the form data from the url parameters
// and displays a personalized thank-you message.

function displayThankYouMessage() {
    const messageElement = document.querySelector('#thankYouMessage');

    if (!messageElement) return;

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    const fullName = params.get('fullName');
    const service = params.get('service');
    const date = params.get('appointmentDate');

    // Conditional check to ensure values exist
    if (fullName && service && date) {
        messageElement.textContent =
            `Thank you ${fullName}! Your appointment for {service} on ${date} has been submitted successfully. We look forward to serving you!`;
    } else {
        messageElement.textContent =
            "Thank you for contacting A.J. Cutz! We will get back to you shortly."
    }
}



//  ===========================
//    INITIALIZE  PAGES
//    =========================== 

renderServices();      // Runs only if services page exists
autoFillService();    // Runs only if contact page exists
handleContactForm();  // Runs only if contact page exists
displayThankYouMessage();





