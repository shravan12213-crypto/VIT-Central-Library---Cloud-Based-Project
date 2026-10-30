// === EMAILJS CONTACT FORM ===

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize EmailJS with your Public Key
    // (Confirmed from your previous message)
    emailjs.init("CAj0xJSIzZiJBdwMO"); 

    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // 2. Change button text to indicate sending
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // 3. YOUR CREDENTIALS (UPDATED)
            const serviceID = "service_yw57p45";    // 👈 Your NEW Service ID
            const templateID = "template_upwfjgq";  // Your Template ID

            // 4. Collect Parameters
            // These map the HTML input values to the EmailJS variables
            const params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                title: document.getElementById("subject").value, // Maps 'subject' to 'title'
                message: document.getElementById("message").value
            };

            console.log("Sending with params:", params);

            // 5. Send Email
            emailjs.send(serviceID, templateID, params)
                .then(() => {
                    // Success!
                    alert("✅ Message sent successfully!");
                    contactForm.reset();
                })
                .catch((error) => {
                    // Error!
                    console.error("EmailJS Error:", error);
                    // This alert will show you the specific error if it fails again
                    alert("❌ Failed to send: " + JSON.stringify(error));
                })
                .finally(() => {
                    // Reset button
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});