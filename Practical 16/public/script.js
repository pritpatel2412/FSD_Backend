// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.classList.add('error');
}

// Clear error message
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    inputElement.classList.remove('error');
}

// Clear all errors
function clearAllErrors() {
    ['name', 'email', 'subject', 'message'].forEach(fieldId => {
        clearError(fieldId);
    });
}

// Show form message (success or error)
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message show ${type}`;
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

// Real-time validation
document.getElementById('name').addEventListener('blur', function() {
    if (!validateName(this.value)) {
        showError('name', 'Name must be at least 2 characters long');
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

document.getElementById('subject').addEventListener('blur', function() {
    if (!validateSubject(this.value)) {
        showError('subject', 'Subject must be at least 3 characters long');
    } else {
        clearError('subject');
    }
});

document.getElementById('message').addEventListener('blur', function() {
    if (!validateMessage(this.value)) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        clearError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous errors and messages
    clearAllErrors();
    formMessage.classList.remove('show');
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(formData.name)) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(formData.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateSubject(formData.subject)) {
        showError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    if (!validateMessage(formData.message)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    // If validation fails, stop submission
    if (!isValid) {
        showFormMessage('Please fix the errors above before submitting', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.querySelector('.btn-text').textContent;
    submitButton.classList.add('loading');
    submitButton.querySelector('.btn-text').textContent = 'Sending';
    
    try {
        // Send form data to server
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.querySelector('.btn-text').textContent = originalButtonText;
        
        if (response.ok && result.success) {
            // Show success message
            showFormMessage(result.message, 'success');
            
            // Reset form
            contactForm.reset();
        } else {
            // Show error message
            showFormMessage(result.message || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.querySelector('.btn-text').textContent = originalButtonText;
        
        // Show error message
        showFormMessage('Network error. Please check your connection and try again.', 'error');
        console.error('Error:', error);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(51, 51, 51, 0.95)';
    } else {
        navbar.style.background = 'var(--dark-color)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-item, .service-card, .info-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});
