const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C++", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "HTML stands for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Marketing Language", correct: false },
      { text: "High Text Machine Language", correct: false }
    ]
  },
  {
    question: "CSS is used for?",
    answers: [
      { text: "Data Storage", correct: false },
      { text: "Styling web pages", correct: true },
      { text: "Creating database", correct: false },
      { text: "Operating systems", correct: false }
    ]
  },
  {
  question: "Which company created JavaScript?",
  answers: [
    { text: "Google", correct: false },
    { text: "Mozilla", correct: false },
    { text: "Netscape", correct: true },
    { text: "Microsoft", correct: false }
  ]
  },
  {
  question: "Which HTML element is used to display the largest heading?",
  answers: [
    { text: "<h1>", correct: true },
    { text: "<h6>", correct: false },
    { text: "<header>", correct: false },
    { text: "<title>", correct: false }
  ]
  },
  {
   question: "Which CSS property changes text color?",
   answers: [
    { text: "font-style", correct: false },
    { text: "text-color", correct: false },
    { text: "color", correct: true },
    { text: "background-color", correct: false }
  ]
  },
  {
    question: "Which HTML tag is used to display images?",
    answers: [
    { text: "<pic>", correct: false },
    { text: "<image>", correct: false },
    { text: "<img>", correct: true },
    { text: "<src>", correct: false }
  ]
  },
  {
    question: "Which symbol is used for comments in CSS?",
    answers: [
    { text: "// comment", correct: false },
    { text: "# comment", correct: false },
    { text: "/* comment */", correct: true },
    { text: "<!-- comment -->", correct: false }
  ]
  },
  {
    question: "Which of the following is a JavaScript data type?",
    answers: [
    { text: "float", correct: false },
    { text: "number", correct: true },
    { text: "character", correct: false },
    { text: "letter", correct: false }
  ]
  },

];

const questionBox = document.getElementById("questionBox");
const answerButtons = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");
const scoreCard = document.getElementById("scoreCard");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const progressText = document.getElementById("progressText");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
  scoreCard.classList.add("hide");
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  const current = questions[currentQuestionIndex];
  progressText.innerText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  questionBox.innerText = current.question;

  current.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", () => selectAnswer(button));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.innerText = `${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoLockAnswers();
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function selectAnswer(button) {
  clearInterval(timer);
  const correct = button.dataset.correct === "true";
  if (correct) score++;

  Array.from(answerButtons.children).forEach(btn => {
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    else btn.classList.add("wrong");
    btn.disabled = true;
  });

  nextBtn.style.display = "block";
}

function autoLockAnswers() {
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") btn.classList.add("correct");
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) showQuestion();
  else showScore();
});

function showScore() {
  resetState();
  questionBox.innerHTML = "";
  answerButtons.innerHTML = "";
  progressText.innerText = "";
  scoreCard.classList.remove("hide");
  finalScore.innerText = `Your Score: ${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", startQuiz);


startQuiz();
