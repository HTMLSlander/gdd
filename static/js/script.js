// class Questionnaire {
//   constructor() {
//     this.currentQuestionIndex = 0;
//     this.questions = [
//       { question: "What is your gender?", answer: " " },
//       { question: "What is your activity level?", answer: " " },
//       { question: "What is your initial water intake?", answer: " " },
//       { question: "What is your local climate?", answer: " " },
//     ];
//     this.showQuestion();
//   }
  
//   loadEventListeners() {
//     document
//       .querySelector(".btn.next")
//       .addEventListener("click", () => this.nextQuestion());
//     document
//       .querySelector(".btn.prev")
//       .addEventListener("click", () => this.prevQuestion());
//     document
//       .querySelector(".btn.submit")
//       .addEventListener("click", () => this.submitAnswers());
//   }

//   showQuestion() {
//     const questionElem = document.getElementById("question");
//     const answerElem = document.getElementById("answer");
//     const label = document.createElement("label");
//     const input = document.createElement("input");

//     questionElem.appendChild(label);
//     answerElem.appendChild(input);

//     questionElem.innerText = this.questions[this.currentQuestionIndex].question;
//     answerElem.innerText = this.questions[this.currentQuestionIndex].answer;

//     if (this.currentQuestionIndex === this.questions.length - 1) {
//       document.getElementById("next-button").style.display = "none";
//       document.getElementById("submit-button").style.display = "inline-block";
//     } else {
//       document.getElementById("next-button").style.display = "inline-block";
//       document.getElementById("submit-button").style.display = "none";
//     }

//     if (this.currentQuestionIndex === 0) {
//       document.getElementById("prev-button").style.display = "none";
//     } else {
//       document.getElementById("prev-button").style.display = "inline-block";
//     }
//   }

//   nextQuestion() {
//     if (this.currentQuestionIndex < this.questions.length - 1) {
//       this.currentQuestionIndex++;
//       this.showQuestion();
//     }
//   }

//   prevQuestion() {
//     if (this.currentQuestionIndex > 0) {
//       this.currentQuestionIndex--;
//       this.showQuestion();
//     }
//   }

//   submitAnswers() {
//     const resultElem = document.getElementById("result");
//     const finalResult = document.getElementById("final-result");

//     finalResult.innerHTML = "Here are your answers:<br>";
//     this.questions.forEach((q, index) => {
//       finalResult.innerHTML += `${q.question}: ${q.answer}<br>`;
//     });

//     document.querySelector(".background").style.display = "none";
//     resultElem.style.display = "flex";
//   }
// }

// function startQuiz() {
//   console.log("Quiz started");
//   document.querySelector(".welcome-background").style.display = "none";
//   document.querySelector(".warning").classList.add("fade-none");
//   // document.querySelector(".buttons").classList.add("buttons-active");
//   new Questionnaire();
// }

// document.querySelector(".btn.start-quiz").addEventListener("click", startQuiz);

const socket = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    alert(`${data.title}\n${data.message}`);
};
