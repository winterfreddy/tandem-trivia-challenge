// script file for game screen and game over screen
let qna = [];

fetch('./public/Apprentice_TandemFor400_Data.json')
    .then( (res) => res.json())
    .then( (data) => qna = data);

console.log(qna);

function shuffleQNA() {
    let numArray = [];
    // while(numArray.length < 10) {
    for(let i = 0; i < qna.length; i++) {
        let num = Math.floor(Math.random() * Math.floor(qna.length));
        if(numArray.length < 10 && !numArray.includes(num)) numArray.push(num);
    }
    // return numArray;
    return numArray.map(num => qna[num]);
} 