// Add this code to your script.js file or create a new script specifically for navigation

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
          // Toggle the 'active' class on the mobile menu
          mobileMenu.classList.toggle('active');
          
          // Change the icon based on menu state
          const icon = mobileMenuToggle.querySelector('i');
          if (mobileMenu.classList.contains('active')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
      if (mobileMenu && mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(event.target) && 
          !mobileMenuToggle.contains(event.target)) {
          mobileMenu.classList.remove('active');
          
          // Reset the icon
          const icon = mobileMenuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      }
  });
  
  // Also handle mobile menu link clicks (close menu when link is clicked)
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          
          // Reset the icon
          const icon = mobileMenuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      });
  });
});

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const verification = document.getElementById("verification").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would typically send the data to your server
    console.log("Signup attempt:", { email, verification, password });

    // For demo purposes, redirect to index
    alert("Account created successfully!");
    window.location.href = "index.html";
  });
}

// Send verification code
const sendBtn = document.querySelector(".send-btn");
if (sendBtn) {
  sendBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    if (!email) {
      alert("Please enter your email first!");
      return;
    }

    // Here you would typically send a verification code to the email
    alert(`Verification code sent to ${email}!`);
  });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (mobileMenu.className !== "mobile-menu") {
          mobileMenu.classList.remove("mobile-menu-show");
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    }
  });
});

// Initialize mobile menu as hidden
// if (mobileMenu) {
//   mobileMenu.style.display = "none";
// }

// Scroll event for navbar transparency effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header-container");
  if (window.scrollY > 50) {
    header.classList.add("nav-scroll");
  } else {
    header.classList.remove("nav-scroll");
  }
});


const slider = document.querySelector(".slider");
const screen = document.querySelector(".screen");
let isScrolling = false;

// Scroll event listener
screen.addEventListener("scroll", () => {
  if (!isScrolling) {
    isScrolling = true;
    setTimeout(() => {
      const scrollPosition = screen.scrollTop;
      const slideHeight = screen.clientHeight;
      const currentSlide = Math.round(scrollPosition / slideHeight);

      // Snap to the nearest slide
      screen.scrollTo({
        top: currentSlide * slideHeight,
        behavior: "smooth",
      });

      isScrolling = false;
    }, 100); // Adjust the delay for smoother snapping
  }
});

function getCSRFToken() {
  let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  return csrfToken;
}

fetch('/your-endpoint/', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()  // ✅ Include CSRF token
  },
  body: JSON.stringify({ key: "value" })
});
