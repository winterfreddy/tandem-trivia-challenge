// script file for game screen and game over screen
let qna = [];
let questions = [];
let idx = 0;

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
    let landingModal = document.querySelector('.landing-modal');
    landingModal.style.setProperty('display', 'none');
    let gameScreen = document.querySelector('.game-modal');
    gameScreen.style.setProperty('display', 'flex');
    handleQuestion();
}

function handleQuestion() {
    if(idx >= questions.length) {
        console.log("reached the end!");
    }
    let numQuestion = document.querySelector('.num-question');
    let questionPrompt = document.querySelector('.question-prompt');
    numQuestion.textContent = `Question #${idx+1}`;
    let questionCard = renderQuestionCard(questions[idx]);
    questionPrompt.textContent = questionCard.question;
    renderAns(questionCard.answers);
    idx++;
}