//Variables = qNumber(null), timer(num), score(num), initials(text)
let timer = 90;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
const MAX_HIGH_SCORES = 7;

//DOM Objects = START BUTTON, ANSWER BUTTONS, QUESTION CONTAINER, QUESTION ELEMENT
const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highScoresButton = document.getElementById("showScoresButton");

//LocalStorage Objects
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//

startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

//function to start the game
//called when start button is clicked, should run the function to display questions and the function to start the timer

function startGame() {
  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  startClock();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}

//function to display the questions
//should load one object from the questions array into the proper html elements, then run the function to collect answers
function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
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

//function to start the timer
//should run a countdown that is displayed in the HTML, when time is up, should run the game over function
function startClock() {
  countdown.innerHTML = "??????????????! ?????? ????????????! " + timer;
  if (timer <= 0) {
    gameOver();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}

//function to collect answers
//should listen for what answer the user clicks on, compare it to the correct answer, and decrease the timer if wrong. should then run the next question function
//unless the current question is the last, then it should run the game over function
function selectAnswer(e) {
  const selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timer = timer - 10;
    console.log(timer);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}

//function to clear the current question
//should empty the HTML elements that are occupied with the currently displayed question
function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//function for game over
//should grab the current time remaining and set it as the score, hide the questions area, display the score to the user, and give them the chance to try again or submit
//their high scores via a text box for intials and the high scores function
function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "??????????";
  clearQuestion();
  showResults();
  startButton.innerText = "???????????? ??????????";
  startButton.classList.remove("hide");
  timer = 90;
  score = 0;
}

function showResults() {
  finalScore = timer;
  if (finalScore < 0) {
    finalScore = 0;
  }
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `???? ?????????????? ??????????: ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="?????????????? ???????? ????'??"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
}

//function to submit high scores
//should grab the users score and initials and add it to the high scores object, ranked numerically, and run the function to display the high scores
function submitScores(e) {
  const score = {
    score: finalScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}

//function to display high scores
//should populate the HTML with a ranked display of the high scores and and provide the option to clear the scores via a function
function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h2>?????????????? ????????</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">???????????????? ????????</button>`;
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="scoresList">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}

//function to clear high scores
//should fire on click, and erase the values of the high scores object
function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3>???????????????????? ??????????????</h3>";
  document.getElementById("clearScores").classList.add("hide");
}

/////
//Questions go Here
/////
const questions = [
  {
    question: "???? ?????????????? ???? ???????????????????? - ?????? ?????? ?????????",
    answers: [
      { text: "with time to time", correct: false },
      { text: "from time to time", correct: true },
      { text: "sometime", correct: false },
      { text: "for time to time", correct: false }
    ]
  },
  {
    question: "?????????????? ????????????",
    answers: [
      { text: "to learn", correct: false },
      { text: "to study", correct: false },
      { text: "to educate", correct: false },
      { text: "to teach", correct: true }
    ]
  },
  {
    question: "???????????? / ??????????",
    answers: [
      { text: "about", correct: false },
      { text: "since", correct: false },
      { text: "for", correct: false },
      { text: "some", correct: true }
    ]
  },
  {
    question: "??????????????, ?????????????? ????????",
    answers: [
      { text: 'to know', correct: false },
      { text: 'to educate', correct: false },
      { text: 'to teach', correct: false },
      { text: 'to study', correct: true }
    ]
  },
  {
    question: "??????????",
    answers: [
      { text: "together", correct: true },
      { text: "with", correct: false },
      { text: "always", correct: false },
      { text: "with you", correct: false }
    ]
  },
  {
    question: "????????????????",
    answers: [
      { text: "dangerous", correct: false },
      { text: "serious", correct: false },
      { text: "important", correct: true },
      { text: "signature", correct: false }
    ]
  },
  {
    question: "????????????",
    answers: [
      { text: "signature", correct: true },
      { text: "write", correct: false },
      { text: "typewrite", correct: false },
      { text: "style", correct: false }
    ]
  },
  {
    question: "????????????",
    answers: [
      { text: "comunity", correct: false },
      { text: "politeness", correct: false },
      { text: "courtesy", correct: false },
      { text: "friendship", correct: true }
    ]
  },
  {
    question: "??????????????????",
    answers: [
      { text: "negative", correct: false },
      { text: "stealth", correct: false },
      { text: "envy", correct: true },
      { text: "nonsense", correct: false }
    ]
  }
];
