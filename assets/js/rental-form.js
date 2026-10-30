// VIT Library - Book Rental Form Handler

document.addEventListener("DOMContentLoaded", () => {
    const rentalForm = document.querySelector("form");
    
    if (rentalForm) {
        rentalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Get form values
            const studentName = document.getElementById("student_name").value.trim();
            const prnNo = document.getElementById("prn_no").value.trim();
            const bookTitle = document.getElementById("book_title").value.trim();
            const bookCode = document.getElementById("book_code").value.trim();
            const rentalPeriod = document.getElementById("rental_period").value;
            
            // Validate all fields
            if (!studentName || !prnNo || !bookTitle || !bookCode || !rentalPeriod) {
                showNotification("Please fill in all fields.", "error");
                return;
            }
            
            // Validate rental period
            if (rentalPeriod < 1 || rentalPeriod > 10) {
                showNotification("Rental period must be between 1 and 10 days.", "error");
                return;
            }
            
            // Calculate due date
            const today = new Date();
            const dueDate = new Date(today);
            dueDate.setDate(dueDate.getDate() + parseInt(rentalPeriod));
            
            const dueDateStr = dueDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            // Create rental record
            const rentalData = {
                studentName,
                prnNo,
                bookTitle,
                bookCode,
                rentalPeriod,
                issueDate: today.toLocaleDateString('en-IN'),
                dueDate: dueDateStr,
                timestamp: Date.now()
            };
            
            // Save rental to session storage
            saveRental(rentalData);
            
            // Show success message
            showNotification(
                `✓ Rental request submitted successfully!<br>
                <strong>Book:</strong> ${bookTitle}<br>
                <strong>Due Date:</strong> ${dueDateStr}<br>
                Please visit the circulation desk for final confirmation.`,
                "success"
            );
            
            // Clear form
            rentalForm.reset();
            
            // Scroll to top to see message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Save rental to storage
    function saveRental(rentalData) {
        let rentals = JSON.parse(sessionStorage.getItem('bookRentals') || '[]');
        rentals.push(rentalData);
        sessionStorage.setItem('bookRentals', JSON.stringify(rentals));
    }
    
    // Show notification
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        // Insert at top of container
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(notification, container.firstChild);
        }
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 8000);
        }
        
        // Auto-hide error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    }
    
    // Input validation helpers
    const studentNameInput = document.getElementById("student_name");
    const prnInput = document.getElementById("prn_no");
    const rentalPeriodInput = document.getElementById("rental_period");
    
    if (studentNameInput) {
        studentNameInput.addEventListener("blur", function() {
            if (this.value.trim() && this.value.trim().length < 3) {
                this.style.borderColor = "#dc3545";
            } else {
                this.style.borderColor = "";
            }
        });
    }
    
    if (prnInput) {
        prnInput.addEventListener("input", function() {
            // Only allow alphanumeric
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
    }
    
    if (rentalPeriodInput) {
        rentalPeriodInput.addEventListener("input", function() {
            const val = parseInt(this.value);
            if (val > 10) {
                this.value = 10;
                showNotification("Maximum rental period is 10 days.", "error");
            } else if (val < 1 && this.value !== '') {
                this.value = 1;
            }
        });
    }
});