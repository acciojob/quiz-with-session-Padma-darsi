//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load previous answers from sessionStorage (or empty array)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Load last score from localStorage (if available)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render questions and restore answers
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((question, i) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    question.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore selection from sessionStorage
      if (userAnswers[i] === choice) {
        radio.checked = true; // This sets the property
        radio.setAttribute("checked", "true"); // For Cypress tests
      }

      // Save answer on change
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Handle quiz submission
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] && userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display and store the score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);

  // Optional: Clear sessionStorage after submission if you want fresh start next time
  // sessionStorage.removeItem("progress");
});

// Initial render
renderQuestions();

