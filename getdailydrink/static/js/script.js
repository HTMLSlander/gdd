// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", function () {
    if (mobileMenu.className === "mobile-menu mobile-menu-show") {
      mobileMenu.classList.remove("mobile-menu-show");
      mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
      mobileMenu.classList.add("mobile-menu-show");
    }
  });
}


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

// Social auth buttons
const googleAuth = document.querySelector(".google-auth");
if (googleAuth) {
  googleAuth.addEventListener("click", function () {
    alert("Google authentication is not implemented in this demo.");
  });
}

const appleAuth = document.querySelector(".apple-auth");
if (appleAuth) {
  appleAuth.addEventListener("click", function () {
    alert("Apple authentication is not implemented in this demo.");
  });
}

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
