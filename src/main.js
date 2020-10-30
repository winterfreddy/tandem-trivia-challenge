// script file for landing page and navbar

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function refresh() {
    landingModal.style.setProperty('display', 'flex');
    gameOverScreen.style.setProperty('display', 'none');
    gameScreen.style.setProperty('display', 'none');
    idx = 0;
    score = 0;
}