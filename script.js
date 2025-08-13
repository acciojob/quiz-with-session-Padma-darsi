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

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previous answers from sessionStorage (or empty array)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render questions and restore answers
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content

  questions.forEach((question, i) => {
    const questionDiv = document.createElement("div");

    // Add question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    // Add choices
    question.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore checked choice using defaultChecked (adds [checked="true"] to HTML)
      if (userAnswers[i] === choice) {
        radio.defaultChecked = true;
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

// Submit quiz
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = resultText;

  // Save score to localStorage
  localStorage.setItem("score", score);
});

// Restore score if previously submitted
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Initial render
renderQuestions();
