// ======================================
// SUPABASE CONNECTION
// ======================================

const SUPABASE_URL = "https://vbkmxuqntwjaxudlcdis.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Lz0Jaef9P3BmpYcfVu3z8A_Caaw5FQQ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ======================================
// PAGE ELEMENTS
// ======================================

const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const bookingsSection = document.getElementById("bookingsSection");
const loginMessage = document.getElementById("loginMessage");
const bookingsList = document.getElementById("bookingsList");
const totalBookings = document.getElementById("totalBookings");
const logoutButton = document.getElementById("logoutButton");


// ======================================
// LOGIN
// ======================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    loginMessage.textContent = "Signing in...";

    const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        loginMessage.textContent = "Login failed. Please check your email and password.";
        return;
    }

    loginMessage.textContent = "";

const { data: userData } = await supabaseClient.auth.getUser();

if (
    !userData.user ||
    userData.user.email.toLowerCase() !== "judy.nafula@strathmore.edu"
) {

    await supabaseClient.auth.signOut();

    loginMessage.textContent = "You are not authorised to access this page.";

    return;

}

showBookingsPage();
});


// ======================================
// SHOW BOOKINGS PAGE
// ======================================

async function showBookingsPage() {

    loginSection.style.display = "none";
    bookingsSection.style.display = "block";

    await loadBookings();

}


// ======================================
// LOAD BOOKINGS FROM SUPABASE
// ======================================

async function loadBookings() {

    bookingsList.textContent = "Loading bookings...";

    const { data, error } = await supabaseClient
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        bookingsList.textContent = "Could not load bookings. Please try again.";

        console.error("Booking loading error:", error);

        return;

    }

    totalBookings.textContent = data.length;

    bookingsList.replaceChildren();

    if (data.length === 0) {

        bookingsList.textContent = "No website bookings yet.";

        return;

    }

    data.forEach(function (booking) {

        const card = document.createElement("div");
        card.className = "booking-card";

        function addDetail(label, value) {

            if (!value) return;

            const detail = document.createElement("p");

            const strong = document.createElement("strong");
            strong.textContent = label + ": ";

            detail.appendChild(strong);
            detail.appendChild(document.createTextNode(value));

            card.appendChild(detail);

        }

        const heading = document.createElement("h3");
        heading.textContent = booking.customer_name;

        card.appendChild(heading);

        addDetail("Phone", booking.phone);
        addDetail("Service", booking.service);
        addDetail("Appointment Type", booking.appointment_type);
        addDetail("Date", booking.appointment_date);
        addDetail("Time", booking.appointment_time);
        addDetail("Location", booking.location);
        addDetail("Directions", booking.directions);
        addDetail("Design Request", booking.design_request);

        bookingsList.appendChild(card);

    });

}


// ======================================
// LOG OUT
// ======================================

logoutButton.addEventListener("click", async function () {

    await supabaseClient.auth.signOut();

    bookingsSection.style.display = "none";
    loginSection.style.display = "block";

    loginForm.reset();

});


// ======================================
// CHECK EXISTING LOGIN SESSION
// ======================================

async function checkLogin() {

    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {

        const userEmail = data.session.user.email;

        if (userEmail.toLowerCase() === "judy.nafula@strathmore.edu") {

            showBookingsPage();

        } else {

            await supabaseClient.auth.signOut();

            loginSection.style.display = "block";
            bookingsSection.style.display = "none";

        }

    }

}