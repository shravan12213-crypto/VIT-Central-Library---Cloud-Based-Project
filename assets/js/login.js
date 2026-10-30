// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const signupContainer = document.getElementById("signup-container");
    const showSignupLink = document.getElementById("show-signup");
    const showLoginLink = document.getElementById("show-login");

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageBox = document.getElementById("message-box");

    // --- Toggle between Login and Sign Up forms ---
    if (showSignupLink) {
        showSignupLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginContainer.style.display = "none";
            signupContainer.style.display = "block";
            hideMessage();
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            signupContainer.style.display = "none";
            loginContainer.style.display = "block";
            hideMessage();
        });
    }

    // --- Form Handlers ---
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            console.log(`Attempting login with: ${email}`);
            
            // Placeholder logic: Simulate a successful login
            // In a real app, you'd send this to a server
            if (email) {
                showMessage("Login successful! Redirecting...", "success");
                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            } else {
                showMessage("Please fill in all fields.", "error");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            console.log(`Attempting signup for: ${name} (${email})`);

            // Placeholder logic: Simulate a successful signup
            if (name && email) {
                showMessage("Sign up successful! Please login.", "success");
                // Switch to the login form
                signupContainer.style.display = "none";
                loginContainer.style.display = "block";
            } else {
                showMessage("Please fill in all fields.", "error");
            }
        });
    }

    // --- Message Box Functions ---
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${type}`; // Applies 'success' or 'error' class
        messageBox.style.display = "block";
    }

    function hideMessage() {
        messageBox.textContent = "";
        messageBox.style.display = "none";
    }
});