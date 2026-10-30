// VIT Library Authentication System
// Uses browser alerts for notifications

// Simulated user database (in a real app, this would be server-side)
const users = [
    { prn: 'VIT001', email: 'student1@vit.edu', password: 'password123', name: 'Test Student 1' },
    { prn: 'VIT002', email: 'student2@vit.edu', password: 'password456', name: 'Test Student 2' }
];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const signupContainer = document.getElementById("signup-container");
    const showSignupLink = document.getElementById("show-signup");
    const showLoginLink = document.getElementById("show-login");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const messageBox = document.getElementById("message-box");

    // Toggle between Login and Sign Up forms
    if (showSignupLink) {
        showSignupLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginContainer.style.display = "none";
            signupContainer.style.display = "block";
            hideMessage();
            clearForms();
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            signupContainer.style.display = "none";
            loginContainer.style.display = "block";
            hideMessage();
            clearForms();
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const emailOrPRN = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value;

            // Validate inputs
            if (!emailOrPRN || !password) {
                alert("❌ Error: Please fill in all fields.");
                return;
            }

            // Find user
            const user = users.find(u => 
                (u.email === emailOrPRN || u.prn === emailOrPRN) && u.password === password
            );

            if (user) {
                // Success - show browser alert
                alert(`✅ Login Successful!\n\nWelcome back, ${user.name}!\n\nRedirecting to home page...`);
                
                // Store user session
                sessionStorage.setItem('loggedInUser', JSON.stringify({
                    prn: user.prn,
                    name: user.name,
                    email: user.email
                }));

                // Redirect after alert is closed
                window.location.href = "../index.html";
            } else {
                // Error - show browser alert
                alert("❌ Login Failed\n\nInvalid email/PRN or password.\nPlease check your credentials and try again.");
            }
        });
    }

    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("signup-name").value.trim();
            const prn = document.getElementById("signup-prn").value.trim();
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value;

            // Validate inputs
            if (!name || !prn || !email || !password) {
                alert("❌ Error: Please fill in all fields.");
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("❌ Error: Please enter a valid email address.");
                return;
            }

            // Validate PRN format
            if (prn.length < 4) {
                alert("❌ Error: Please enter a valid PRN number (minimum 4 characters).");
                return;
            }

            // Validate password length
            if (password.length < 6) {
                alert("❌ Error: Password must be at least 6 characters long.");
                return;
            }

            // Check if user already exists
            const existingUser = users.find(u => u.email === email || u.prn === prn);
            if (existingUser) {
                alert("❌ Registration Failed\n\nAn account with this email or PRN already exists.\nPlease login instead.");
                return;
            }

            // Add new user to database
            users.push({ prn, email, password, name });

            // Success - show browser alert
            alert(`✅ Registration Successful!\n\nAccount created for: ${name}\nPRN: ${prn}\n\nYou can now login with your credentials.`);
            
            // Switch to login form
            signupContainer.style.display = "none";
            loginContainer.style.display = "block";
            clearForms();
        });
    }

    // Message Box Functions (backup for non-critical messages)
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${type}`;
        messageBox.style.display = "block";
        
        if (type === "error") {
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }
    }

    function hideMessage() {
        messageBox.textContent = "";
        messageBox.style.display = "none";
        messageBox.className = "message-box";
    }

    function clearForms() {
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
    }

    // Check if user is already logged in
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser && window.location.pathname.includes('login.html')) {
        const user = JSON.parse(loggedInUser);
        alert(`ℹ️ Already Logged In\n\nYou are logged in as ${user.name}.\n\nRedirecting to home page...`);
        window.location.href = "../index.html";
    }
});