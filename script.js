const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

//for what time mole will pop up
function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}

//from which hole mole will pop up
function randomHole(holes) {
    // console.log(holes.length);
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        console.log("Ah na same hole");
        return randomHole(holes);
    }
    // console.log(hole);
    lastHole=hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    // console.log(time, hole);
    hole.classList.add('up'); //mole will come up
    //mole will disappear
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    },time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true,10000);
}

function bonk(e) {
    console.log(e);
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));