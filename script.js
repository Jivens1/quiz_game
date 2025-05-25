// Questions array with text and answer options
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

// DOM element references
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // Set timer to 10 seconds per your latest request

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

// Display a question
function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

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

// Reset answer area and timer
function resetState() {
  clearInterval(timer);
  timeLeft = 10;
  timerElement.textContent = timeLeft;
  nextButton.style.display = "none";
  feedbackElement.innerText = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Handle user answer selection
function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    feedbackElement.innerText = "Correct! 🎉";
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    feedbackElement.innerText = "Oops! That's not correct.";
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// Display final score
function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

// Handle next button click
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Start countdown timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      feedbackElement.innerText = "Time's up!";
      Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    }
  }, 1000);
}

// Next button click logic
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start the game
startQuiz();
