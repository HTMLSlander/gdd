// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Feather icons
  feather.replace();

  // Initialize circle progress bars
  initCircleProgress();

  // Set up challenge state
  setupChallenges();
});

// Mobile menu
const mobileMenu = document.querySelector(".mobile-menu");
let mobileMenuToggle = document.getElementById("mobile-menu-toggle");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", function () {
    if (mobileMenu.className === "mobile-menu mobile-menu-show") {
      mobileMenu.classList.remove("mobile-menu-show");
    } else {
      mobileMenu.classList.add("mobile-menu-show");
    }
  });
}

// User menu
const userMenu = document.querySelector(".user-menu");
let userMenuToggle = document.getElementById("user-menu-toggle");

if (userMenuToggle && userMenu) {
  userMenuToggle.addEventListener("click", function () {
    if (userMenu.classList.contains("user-menu-show") === false) {
      userMenu.classList.add("user-menu-show");
    } else {
      userMenu.classList.remove("user-menu-show");
    }
  });
}
// Function to switch between tabs
function switchTab(tabId) {
  // Hide all tab panels
  const tabPanels = document.querySelectorAll(".tab-panel");
  tabPanels.forEach((panel) => {
    panel.classList.remove("active");
  });

  // Show the selected tab panel
  const selectedPanel = document.getElementById(tabId);
  if (selectedPanel) {
    selectedPanel.classList.add("active");
  }

  // Update the active state of nav buttons
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("data-tab") === tabId) {
      button.classList.add("active");
    }
  });
}

// Function to initialize circle progress bars
function initCircleProgress() {
  const circleProgressElements = document.querySelectorAll(".circle-progress");

  circleProgressElements.forEach((element) => {
    const value = parseInt(element.getAttribute("data-value"));
    const color = element.getAttribute("data-color") || "blue";
    const label = element.getAttribute("data-label") || "";

    // Create SVG
    const size = 100;
    const radius = 40;
    const strokeWidth = 6;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.style.transform = "rotate(-90deg)";

    // Background circle
    const bgCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    bgCircle.setAttribute("cx", size / 2);
    bgCircle.setAttribute("cy", size / 2);
    bgCircle.setAttribute("r", radius);
    bgCircle.setAttribute("fill", "none");
    bgCircle.setAttribute("stroke", "#e5e7eb");
    bgCircle.setAttribute("stroke-width", strokeWidth);

    // Progress circle
    const progressCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    progressCircle.setAttribute("cx", size / 2);
    progressCircle.setAttribute("cy", size / 2);
    progressCircle.setAttribute("r", radius);
    progressCircle.setAttribute("fill", "none");
    progressCircle.setAttribute("stroke", getColorValue(color));
    progressCircle.setAttribute("stroke-width", strokeWidth);
    progressCircle.setAttribute("stroke-dasharray", circumference);
    progressCircle.setAttribute("stroke-dashoffset", strokeDashoffset);
    progressCircle.setAttribute("stroke-linecap", "round");
    progressCircle.style.transition = "stroke-dashoffset 0.5s ease-in-out";

    svg.appendChild(bgCircle);
    svg.appendChild(progressCircle);

    // Create text container
    const textContainer = document.createElement("div");
    textContainer.className = "circle-progress-text";

    // Create value text
    const valueText = document.createElement("span");
    valueText.className = "circle-progress-value";
    valueText.style.color = getColorValue(color);
    valueText.textContent = `${value}%`;

    // Create label text if provided
    const labelText = document.createElement("span");
    labelText.className = "circle-progress-label";
    labelText.textContent = label;

    textContainer.appendChild(valueText);
    textContainer.appendChild(labelText);

    // Clear the element and append new content
    element.innerHTML = "";
    element.appendChild(svg);
    element.appendChild(textContainer);
  });
}

// Helper function to get color value
function getColorValue(color) {
  const colorMap = {
    blue: "#3b82f6",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    green: "#22c55e",
    yellow: "#eab308",
  };

  return colorMap[color] || colorMap.blue;
}

// Setup challenges
function setupChallenges() {
  // Store challenge state in localStorage
  if (!localStorage.getItem("challenges")) {
    localStorage.setItem(
      "challenges",
      JSON.stringify({
        1: { accepted: false, completed: false, progress: 72 },
        2: { accepted: true, completed: true, progress: 100 },
        3: { accepted: false, completed: false, progress: 0 },
      })
    );
  }

  // Store user data in localStorage
  if (!localStorage.getItem("userData")) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        username: "HydrationHero",
        currentXp: 750,
        nextLevelXp: 1000,
        level: 5,
        streakDays: 7,
      })
    );
  }
}

// Accept a challenge
function acceptChallenge(challengeId) {
  const challenges = JSON.parse(localStorage.getItem("challenges"));

  if (challenges && challenges[challengeId]) {
    challenges[challengeId].accepted = true;
    localStorage.setItem("challenges", JSON.stringify(challenges));

    // Update UI
    const button = event.target;
    button.textContent = "Mark Complete";
    button.classList.remove("button-outline");
    button.onclick = function () {
      completeChallenge(challengeId);
    };
  }
}

// Complete a challenge
function completeChallenge(challengeId) {
  const challenges = JSON.parse(localStorage.getItem("challenges"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (
    challenges &&
    challenges[challengeId] &&
    !challenges[challengeId].completed
  ) {
    // Update challenge
    challenges[challengeId].completed = true;
    challenges[challengeId].progress = 100;
    localStorage.setItem("challenges", JSON.stringify(challenges));

    // Get XP reward
    let xpReward = 0;
    if (challengeId === 1) xpReward = 50;
    if (challengeId === 2) xpReward = 100;
    if (challengeId === 3) xpReward = 75;

    // Update user data
    userData.currentXp += xpReward;
    localStorage.setItem("userData", JSON.stringify(userData));

    // Update UI
    const button = event.target;
    const buttonContainer = button.parentElement;
    button.remove();

    const completedText = document.createElement("span");
    completedText.className = "completed-text";
    completedText.textContent = "Completed!";
    buttonContainer.appendChild(completedText);

    // Update progress bar
    const card = buttonContainer.closest(".challenge-card");
    const progressBar = card.querySelector(".progress-fill");
    progressBar.style.width = "100%";
    progressBar.classList.remove("blue");
    progressBar.classList.add("green");

    // Add check icon
    const cardTitle = card.querySelector(".card-title");
    const icon = cardTitle.querySelector("i");
    icon.setAttribute("data-feather", "check-circle");
    icon.classList.remove("icon-blue");
    icon.classList.add("icon-green");
    feather.replace();

    // Show notification
    alert(`Challenge completed! You earned ${xpReward} XP.`);
  }
}

// Share progress
function shareProgress(platform) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  // In a real app, this would open a share dialog
  alert(`Sharing your progress on ${platform}! You earned 25 XP!`);

  // Update XP
  userData.currentXp += 25;
  localStorage.setItem("userData", JSON.stringify(userData));
}
