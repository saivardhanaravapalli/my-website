document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typing Effect for Hero Section ---
    const typingElement = document.getElementById('typing-text');
    const roles = ['Web Developer', 'Software Engineer', 'Creative Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    if(typingElement) setTimeout(typeEffect, 1000);


    // --- 2. Button Ripple Effect (Interactive Element) ---
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });


    // --- 3. Form Validation (Interactive Element) ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate Name
            const nameInput = document.getElementById('nameInput');
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }
            
            // Validate Email
            const emailInput = document.getElementById('emailInput');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            // Validate Message
            const messageInput = document.getElementById('messageInput');
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }

            // Show Success Message
            if (isValid) {
                // Simulate sending data
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    formSuccess.classList.remove('d-none');
                    contactForm.reset();
                    
                    // Remove validation classes
                    ['nameInput', 'emailInput', 'messageInput'].forEach(id => {
                        document.getElementById(id).classList.remove('is-valid');
                    });

                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('d-none');
                    }, 5000);
                }, 1000);
            }
        });

        // Real-time validation removal on input
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }

});
