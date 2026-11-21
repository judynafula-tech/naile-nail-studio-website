// ======================================
// BUSINESS CONTACT DETAILS
// ======================================

const BUSINESS_WHATSAPP = "254783001830";
const BUSINESS_PHONE = "254783001830";


// ======================================
// MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// ======================================
// BOOKING FORM ELEMENTS
// ======================================

const appointmentType = document.getElementById("appointmentType");

const locationFields = document.getElementById("locationFields");

const studioInfo = document.getElementById("studioInfo");

const bookingForm = document.getElementById("bookingForm");

const locationInput = document.getElementById("location");


// ======================================
// HOUSE CALL AND STUDIO OPTIONS
// ======================================

appointmentType.addEventListener("change", function () {

    const isHouseCall = this.value === "House Call";

    const isStudioVisit = this.value === "In-Person Appointment";

    locationFields.hidden = !isHouseCall;

    studioInfo.hidden = !isStudioVisit;

    locationInput.required = isHouseCall;

});


// ======================================
// PHONE CALL BUTTON
// ======================================

const callButton = document.getElementById("callButton");

if (callButton) {

    callButton.href = `tel:+${BUSINESS_PHONE}`;

}


// ======================================
// FLOATING WHATSAPP BUTTON
// ======================================

const floatingWhatsApp = document.getElementById("floatingWhatsApp");

floatingWhatsApp.href =
    `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
        "Hello! I'd like to enquire about your nail services."
    )}`;

floatingWhatsApp.target = "_blank";

floatingWhatsApp.rel = "noopener";
// =====================================
// CONTACT SECTION WHATSAPP BUTTON
// =====================================

const contactWhatsApp = document.getElementById("contactWhatsApp");

if (contactWhatsApp) {

    contactWhatsApp.href =
        `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
            "Hello! I'd like to enquire about your nail services and prices."
        )}`;

    contactWhatsApp.target = "_blank";
    contactWhatsApp.rel = "noopener";

}


// ======================================
// PREVENT PAST APPOINTMENT DATES
// ======================================

const dateInput = document.getElementById("date");

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

// Booking confirmation message
const bookingConfirmation = document.createElement("p");

bookingConfirmation.className = "booking-confirmation";
bookingConfirmation.style.display = "none";

bookingConfirmation.textContent =
    "Your booking details are ready! Please send the message on WhatsApp to submit your request. Your appointment is confirmed once NAILÉ responds.";

bookingForm.insertAdjacentElement("afterend", bookingConfirmation);
// ======================================
// BOOKING FORM SUBMISSION
// ======================================

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get customer information
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const type = appointmentType.value;
    const date = dateInput.value;
    const time = document.getElementById("time").value;
    const design = document.getElementById("design").value.trim();
    const location = locationInput.value.trim();
    const directions = document.getElementById("directions").value.trim();

    // Check required fields
    if (!name || !phone || !service || !type || !date || !time) {
        alert("Please fill in all the required fields before booking.");
        return;
    }

    // Validate phone number
    const phonePattern = /^[0-9+\s()-]{9,15}$/;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    // Prevent past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date + "T00:00:00");

    if (selectedDate < today) {
        alert("Please select a date that is today or in the future.");
        return;
    }

    // Check house-call location
    if (type === "House Call" && !location) {
        alert("Please enter your area or estate for the house call.");
        locationInput.focus();
        return;
    }

    // Build WhatsApp message
    let message = `Hello! I'd like to book an appointment.

Customer details 

Name: ${name}
Phone: ${phone}

Appointment Details

Service: ${service}
Appointment Type: ${type}
Preferred Date: ${date}
Preferred Time: ${time}`;

    // Include house-call location
    if (type === "House Call") {
        message += `

Location details

Area / Estate: ${location}

Additional Directions: ${directions || "I will explain my location over the phone."}`;
    }

    // Include preferred nail design
    if (design) {
        message += `

Preferred Nail Design:

${design}`;
    }

    message += `

Please confirm your availability and the total price.

Thank you!`;

    // Open WhatsApp
    const whatsappURL =
        `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

bookingConfirmation.style.display = "block";

});
// ======================================
// AUTOMATIC COPYRIGHT YEAR
// ======================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();
    // ======================================
// GALLERY FILTERS
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate selected button

        this.classList.add("active");

        const selectedCategory = this.dataset.filter;

        // Show matching gallery images

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === category
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });

    });

});
// =====================================
// HOUSE CALL WHATSAPP BUTTON
// =====================================

const houseCallWhatsApp = document.getElementById("houseCallWhatsApp");

if (houseCallWhatsApp) {
    houseCallWhatsApp.href =
        `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
            "Hello! I'd like to request a house-call nail appointment."
        )}`;

    houseCallWhatsApp.target = "_blank";
    houseCallWhatsApp.rel = "noopener";
}
// ======================================
// GALLERY LIGHTBOX
// ======================================

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function showLightboxImage(index) {

    currentImageIndex = (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;

}

galleryImages.forEach((img, index) => {

    img.style.cursor = "pointer";

    img.addEventListener("click", function () {

        showLightboxImage(index);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    });

});

function closeLightbox() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", function () {
    showLightboxImage(currentImageIndex - 1);
});

lightboxNext.addEventListener("click", function () {
    showLightboxImage(currentImageIndex + 1);
});

// Close when clicking the dark background

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// Keyboard controls

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showLightboxImage(currentImageIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showLightboxImage(currentImageIndex - 1);
    }

});