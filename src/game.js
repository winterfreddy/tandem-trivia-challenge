// script file for game screen and game over screen
let qna = [];

fetch('./public/Apprentice_TandemFor400_Data.json')
    .then( (res) => res.json())
    .then( (data) => qna = data);

console.log(qna);