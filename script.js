const questions = [
  {
    question: "What is the capital city of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Vancouver", correct: false },
      { text: "Montreal", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the air?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "Who was the first president of the United States?",
    answers: [
      { text: "Thomas Jefferson", correct: false },
      { text: "George Washington", correct: true },
      { text: "Abraham Lincoln", correct: false },
      { text: "John Adams", correct: false }
    ]
  },
  {
    question: "Which country is known for the samba dance?",
    answers: [
      { text: "Argentina", correct: false },
      { text: "Spain", correct: false },
      { text: "Brazil", correct: true },
      { text: "Cuba", correct: false }
    ]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Jane Austen", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Charles Dickens", correct: false }
    ]
  },
  {
    question: "How many players are on a football (soccer) team?",
    answers: [
      { text: "9", correct: false },
      { text: "11", correct: true },
      { text: "7", correct: false },
      { text: "13", correct: false }
    ]
  },
  {
    question: "Who voiced Simba in the 2019 *The Lion King* remake?",
    answers: [
      { text: "Donald Glover", correct: true },
      { text: "Justin Timberlake", correct: false },
      { text: "Chris Pratt", correct: false },
      { text: "Bruno Mars", correct: false }
    ]
  },
  {
    question: "What is 12 × 8?",
    answers: [
      { text: "96", correct: true },
      { text: "98", correct: false },
      { text: "86", correct: false },
      { text: "88", correct: false }
    ]
  },
  {
    question: "What does 'URL' stand for?",
    answers: [
      { text: "Uniform Resource Locator", correct: true },
      { text: "User Reference Link", correct: false },
      { text: "Universal Route Line", correct: false },
      { text: "Unit Resource Label", correct: false }
    ]
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "African Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Polar Bear", correct: false }
    ]
  }
];

// Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";

  // Auto-advance after 1.5 seconds
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      handleNextButton();
    } else {
      showScore();
    }
  }, 1500);
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
