const main = document.querySelector("main");
const startSection = document.querySelector(".section--start");
const startButton = document.querySelector(".player-pick--btn");
let player1Choice = null;
let currentTurnSign = document.querySelector(".current-turn--sign");
startButton.addEventListener("click", function () {
    setTimeout(startGame, 400);
})

function startGame() {
    player1Choice = document.querySelector("input[name=select-sign]:checked").value;
    startSection.classList.add("disabled");
    main.classList.remove("disabled");

    if (player1Choice === "x") {
        currentTurnSign.style.background = "url(\"img/icon-x-gray.svg\")";
        currentTurnSign.style.backgroundSize = "contain";
    } else {
        currentTurnSign.style.background = "url(\"img/icon-o-gray.svg\")";
        currentTurnSign.style.backgroundSize = "contain";
    }

}

// Test function
// let gameBoard = document.querySelectorAll(".section--game div");
// gameBoard.forEach(element =>  {
//     element.addEventListener("mouseover", function () {
//         element.classList.add("game-hover-o");
//     })
//     element.addEventListener("mouseleave", function() {
//         element.classList.remove("game-hover-o");
//     })
// })