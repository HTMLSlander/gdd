// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            mobileMenu.style.display = 'block';
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        }
    });
}

// Form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Here you would typically send the data to your server
        console.log('Login attempt:', { email, password });
        
        // For demo purposes, redirect to index
        alert('Login successful!');
        window.location.href = 'index.html';
    });
}

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const verification = document.getElementById('verification').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log('Signup attempt:', { email, verification, password });
        
        // For demo purposes, redirect to index
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
}

// Send verification code
const sendBtn = document.querySelector('.send-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', function() {
        const email = document.getElementById('email').value;
        if (!email) {
            alert('Please enter your email first!');
            return;
        }
        
        // Here you would typically send a verification code to the email
        alert(`Verification code sent to ${email}!`);
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.style.display === 'block') {
                    mobileMenu.style.display = 'none';
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Initialize mobile menu as hidden
if (mobileMenu) {
    mobileMenu.style.display = 'none';
}

// Scroll event for navbar transparency effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-container');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    } else {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
    }
});

// // Social auth buttons
// const googleAuth = document.querySelector('.google-auth');
// if (googleAuth) {
//     googleAuth.addEventListener('click', function() {
//         alert('Google authentication is not implemented in this demo.');
//     });
// }

// const appleAuth = document.querySelector('.apple-auth');
// if (appleAuth) {
//     appleAuth.addEventListener('click', function() {
//         alert('Apple authentication is not implemented in this demo.');
//     });
// }