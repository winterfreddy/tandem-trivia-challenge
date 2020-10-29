// script file for game screen and game over screen
let qna = [];

fetch('./public/Apprentice_TandemFor400_Data.json')
    .then( (res) => res.json())
    .then( (data) => qna = data);

console.log(qna);

function shuffleQNA() {
    let numArray = [];
    for(let i = 0; i < qna.length; i++) {
        let num = Math.floor(Math.random() * Math.floor(qna.length));
        if(numArray.length < 10 && !numArray.includes(num)) numArray.push(num);
    }
    return numArray.map(num => qna[num]);
}

function renderQuestionCard(entry) {
    let answers = [...entry.incorrect.slice(), entry.correct];
    return {question: entry.question, answers: answers, correct: entry.correct};
}

function startGame() {
    let questions = shuffleQNA();
    let landingModal = document.querySelector('.landing-modal');
    landingModal.style.setProperty('display', 'none');
    questions.forEach( question => {
        console.log(renderQuestionCard(question));
    })
}