let questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Asia", correct: false },
      { text: "Europe", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Gobi", correct: false },
      { text: "Kalahari", correct: false },
      { text: "Antarctica", correct: true },
      { text: "Sahara", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Nepal", correct: false },
      { text: "Bhutan", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Sri Lanka", correct: false },
    ],
  },
];

let question = document.querySelector("#question");
let answers = document.querySelector("#choices");
let nextBtn = document.querySelector("#next");

let questionIndex = 0;
let score = 0;

function startQuiz() {
  questionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  nextBtn.innerHTML = "Next";
  nextBtn.style.display = "none";
  let currentQuestion = questions[questionIndex];
  let currentQuestionNumber = questionIndex + 1;
  let currentQuestionText = `${currentQuestionNumber}. ${currentQuestion.question}`;
  question.textContent = currentQuestionText;
  currentQuestion.answers.forEach((answer) => {
    let choice = document.createElement("li");
    choice.innerHTML = answer.text;
    answers.appendChild(choice);
    if (answer.correct) {
      choice.dataset.correct = true;
    }
    choice.addEventListener("click", selectAnswer);
  });
}

startQuiz();

function resetState() {
  answers.innerHTML = "";
}

function selectAnswer(e) {
  let selected = e.target;
  let isCorrect = selected.dataset.correct === "true";
  if (isCorrect) {
    score++;
  } else {
    selected.classList.add("incorrect");
  }
  Array.from(answers.children).forEach((answer) => {
    if (answer.dataset.correct === "true") {
      answer.classList.add("correct");
    }
    answer.style.pointerEvents = "none";
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  questionIndex++;
  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    questionIndex = -1;
    score = 0;
  }
});

function showScore() {
  resetState();
  question.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
}
