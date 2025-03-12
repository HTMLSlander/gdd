let currentQuestion = 0;
const totalQuestions = 6; // Updated to include all questions
const answers = {};

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-questions").classList.remove("hidden");
  updateProgressBar();
}

function nextQuestion() {
  if (currentQuestion < totalQuestions - 1) {
    document
      .getElementById(`question-${currentQuestion + 1}`)
      .classList.add("hidden");
    currentQuestion++;
    document
      .getElementById(`question-${currentQuestion + 1}`)
      .classList.remove("hidden");
    updateProgressBar();
  } else {
    showResults();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    document
      .getElementById(`question-${currentQuestion + 1}`)
      .classList.add("hidden");
    currentQuestion--;
    document
      .getElementById(`question-${currentQuestion + 1}`)
      .classList.remove("hidden");
    updateProgressBar();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

function showResults() {
  document.getElementById("quiz-questions").classList.add("hidden");
  document.getElementById("results-screen").classList.remove("hidden");
  calculateWaterIntake();
}

function calculateWaterIntake() {
  // Example calculation (replace with your logic)
  const waterIntake = 2000; // Replace with dynamic calculation
  document.getElementById("water-intake").textContent = waterIntake;
}

function activateNotifications() {
  alert("Notifications feature will be implemented here.");
}

window.addEventListener("load", () => {
  const startScreen = document.getElementById("start-screen");
  const children = startScreen.children; // Get only element children

  // Loop through each child and add the 'show' class with a delay
  Array.from(children).forEach((child, index) => {
    setTimeout(() => {
      child.classList.add("show");
    }, index * 250); // Delay increases by 450ms for each child
  });
});
