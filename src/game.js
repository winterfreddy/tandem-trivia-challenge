// script file for game screen and game over screen
let qna = [];
let questions = [];
let idx = 0;
let score = 0;
let correctAns = "";
let landingModal = document.querySelector('.landing-modal');
let gameScreen = document.querySelector('.game-modal');
let gameOverScreen = document.querySelector('.game-over-screen');
let numQuestion = document.querySelector('.num-question');
let questionPrompt = document.querySelector('.question-prompt');
let scoreText = document.querySelector('.score');
let userError = document.querySelector('.warning');


fetch('./public/Apprentice_TandemFor400_Data.json')
    .then( (res) => res.json())
    .then( (data) => qna = data);

function shuffleQNA() {
    let numArray = [];
    for(let i = 0; i < qna.length; i++) {
        let num = Math.floor(Math.random() * Math.floor(qna.length));
        if(numArray.length < 10 && !numArray.includes(num)) numArray.push(num);
    }
    return numArray.map(num => qna[num]);
}

function shuffleAns(array) {
    if(array.length !== 4) array.push("Blank Space");
    array.sort(() => Math.random() - 0.5);
    return array;
}

function renderQuestionCard(entry) {
    let answers = [...entry.incorrect.slice(), entry.correct];
    let shuffledAnswers = shuffleAns(answers);
    return {question: entry.question, answers: shuffledAnswers, correct: entry.correct};
}

function renderAns(ansArray) {
    for(let i = 0; i < ansArray.length; i++) {
        document.querySelector(`.c${i+1}`).innerHTML = ansArray[i];
    }
}

function startGame() {
    questions = shuffleQNA();
    landingModal.style.setProperty('display', 'none');
    gameOverScreen.style.setProperty('display', 'none');
    gameScreen.style.setProperty('display', 'flex');
    handleQuestion();
}

function handleQuestion() {
    clearAllChecks();
    if(idx >= questions.length) {
        gameOver();
    }
    else {
        numQuestion.textContent = `Question #${idx+1}`;
        let questionCard = renderQuestionCard(questions[idx]);
        questionPrompt.textContent = questionCard.question;
        renderAns(questionCard.answers);
        correctAns = questionCard.correct;
        idx++;
    }
}

function handleAnswer() {
    if(userHasChecked()) {
        let check = checkAnswers();
        check ? score += 100 : score += 0;
        setTimeout(() => {
            handleQuestion();
        }, 2500);
    }
    else {
        userError.style.setProperty('display', 'block');
        setTimeout( () => {
            userError.style.setProperty('display', 'none');
        }, 1500);
    }
}

function userHasChecked() {
    let value = false;
    for(let i = 1; i < 5; i++) {
        if(document.getElementById(`c${i}`).checked === true) {
            value = true;
        }
    }
    return value;
}

function checkAnswers() {
    let value = false;
    for(let i = 1; i < 5; i++) {
        if(document.querySelector(`.c${i}`).innerHTML === correctAns) {
            document.querySelector(`.cbkg${i}`).style.setProperty('background', 'lightgreen');
            if(document.getElementById(`c${i}`).checked === true) {
                value = true;
            }
        }
        else {
            document.querySelector(`.cbkg${i}`).style.setProperty('background', 'red');
        }
    }
    return value;
}

function clearAllChecks() {
    for(let i = 1; i < 5; i++) {
        document.querySelector(`.cbkg${i}`).style.setProperty('background', 'none');
        document.getElementById(`c${i}`).checked = false;
    }
}

function gameOver() {
    gameScreen.style.setProperty('display', 'none');
    gameOverScreen.style.setProperty('display', 'flex');
    scoreText.innerHTML = `${score} out of 1000`;
    idx = 0;
    score = 0;
}