// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")

// Form submission
const loginForm = document.getElementById("login-form")
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // Here you would typically send the data to your server
    console.log("Login attempt:", { email, password })

    // For demo purposes, redirect to index
    alert("Login successful!")
    window.location.href = "index.html"
  })
}

const signupForm = document.getElementById("signup-form")
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value
    const verification = document.getElementById("verification").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Here you would typically send the data to your server
    console.log("Signup attempt:", { email, verification, password })

    // For demo purposes, redirect to index
    alert("Account created successfully!")
    window.location.href = "index.html"
  })
}

// Send verification code
const sendBtn = document.querySelector(".send-btn")
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value
    if (!email) {
      alert("Please enter your email first!")
      return
    }

    // Here you would typically send a verification code to the email
    alert(`Verification code sent to ${email}!`)
  })
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.className !== "mobile-menu") {
          mobileMenu.classList.remove("mobile-menu-show")
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        }
      }
    }
  })
})

// Scroll event for navbar transparency effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header-container")
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("nav-scroll")
    } else {
      header.classList.remove("nav-scroll")
    }
  }
})

// Social auth buttons
const googleAuth = document.querySelector(".google-auth")
if (googleAuth) {
  googleAuth.addEventListener("click", () => {
    alert("Google authentication is not implemented in this demo.")
  })
}

const appleAuth = document.querySelector(".apple-auth")
if (appleAuth) {
  appleAuth.addEventListener("click", () => {
    alert("Apple authentication is not implemented in this demo.")
  })
}

// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle-btn")

  // Function to apply theme
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-theme")
      if (themeToggleBtn) themeToggleBtn.classList.add("active")
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.classList.add("active")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-theme")
      if (themeToggleBtn) themeToggleBtn.classList.remove("active")
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.classList.remove("active")
      localStorage.setItem("theme", "light")
    }
  }

  // Check if there's a saved theme preference in localStorage
  const savedTheme = localStorage.getItem("theme")

  // Apply the saved theme or default to light
  if (savedTheme === "dark") {
    applyTheme(true)
  }

  // Add event listener for main theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-theme")
      applyTheme(!isDarkMode)
    })
  }

  // Add event listener for mobile theme toggle
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-theme")
      applyTheme(!isDarkMode)
    })
  }

  // Mobile menu toggle - updated to handle theme toggler visibility
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      if (mobileMenu.className === "mobile-menu mobile-menu-show") {
        mobileMenu.classList.remove("mobile-menu-show")
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      } else {
        mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>'
        mobileMenu.classList.add("mobile-menu-show")
      }
    })
  }

  // Existing code for badges
  const badges = document.querySelectorAll(".badge-container")

  if (badges.length > 0) {
    // Add the 'filled' class to badges after a short delay
    setTimeout(() => {
      badges.forEach((badge) => {
        badge.classList.add("filled")
      })
    }, 500)
  }

  // New code to ensure footer is at the bottom
  function adjustFooter() {
    const footer = document.querySelector("footer")
    const body = document.body
    const html = document.documentElement

    const pageHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )

    const viewportHeight = window.innerHeight

    if (pageHeight < viewportHeight) {
      footer.style.marginTop = `${viewportHeight - pageHeight + 100}px`
    } else {
      footer.style.marginTop = "0"
    }
  }

  // Run on load
  adjustFooter()

  // Run on resize
  window.addEventListener("resize", adjustFooter)
})

