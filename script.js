const game = (() => {
    let currentTurn = null;
    let ties = 0;
    let playerXScore = 0;
    let playerOScore = 0;
    const getTurn = () => currentTurn;
    const setTurn = (turn) => {
        currentTurn = turn;
    }
    const gameInit = () => {
        setTurn( document.querySelector("input[name=select-sign]:checked").value);
    }

    return {playerXScore, playerOScore, ties, gameInit, getTurn, setTurn};
})();

const gameBoard = (() => {
    const board = new Array(9).fill(' ');
    const isWin = (sign) => {
        const winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]]; // diagonal
        for (const combination of winComb) {
            if (combination.every(index => board[index] === sign)) {
                if (sign === "x") {
                    game.playerXScore++;
                } else {
                    game.playerOScore++;
                }
                return true;
            }
        }
        return false;
    };
    const isTie = () => {
        if (!board.includes(' ')) {
            game.ties++;
            return true;
        }
        return false;
    }
    const isEmpty = (index) => {
        return board[index] === ' ';
    }
    const selectPosition = (index, sign) => {
        board[index] = sign;
    }
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = ' ';
        }
    }

    return {isEmpty, selectPosition, isWin, isTie, resetBoard};
})();

const displayController = (() => {
    const startButton = document.querySelector(".player-pick--btn");
    const main = document.querySelector("main");
    const startSection = document.querySelector(".section--start");
    const postGameSection = document.querySelector(".section--post-game");
    const overlay = document.getElementById("overlay");
    const currentTurnSign = document.querySelector(".current-turn--sign");
    const gameBoardCells = document.querySelectorAll(".section--game div");
    const playerXScore = document.querySelectorAll(".player-score")[0];
    const playerOScore = document.querySelectorAll(".player-score")[2];
    const ties = document.querySelectorAll(".player-score")[1];
    const winner = document.querySelector(".winner-header");
    const congratulations = document.querySelector(".congratulations");
    const restartButton = document.querySelectorAll(".button")[0];
    const continueButton = document.querySelectorAll(".button")[1];
    const resetButton = document.querySelector(".reset-btn");

    const startGame = () => {
        startButton.addEventListener("click", function () {
            setTimeout(() => {
                startSection.classList.add("disabled");
                main.classList.remove("disabled");
                game.gameInit();
                if (game.getTurn() === "x") {
                    setTurnSign("x");
                } else {
                    setTurnSign("o");
                }
            }, 400);
        })
    };
    const setTurnSign = (sign) => {
        if (sign === "x") {
            currentTurnSign.style.background = "url(\"img/icon-x-gray.svg\")";
            currentTurnSign.style.backgroundSize = "contain";
        } else {
            currentTurnSign.style.background = "url(\"img/icon-o-gray.svg\")";
            currentTurnSign.style.backgroundSize = "contain";
        }
    }
    const playTurn = (sign, i) => {
        let className = "game-select-" + sign;
        gameBoardCells[i].classList.add(className);
        if (sign === "x") {
            game.setTurn("o");
            setTurnSign("o");
        } else {
            game.setTurn("x");
            setTurnSign("x");
        }
        gameBoard.selectPosition(i, sign);
        if (gameBoard.isWin(sign)) {
            overlay.classList.toggle("active");
            postGameSection.classList.toggle("active");
            congratulations.innerText = "congratulations!";
            winner.innerText = sign + " won!";
        }  else {
            if (gameBoard.isTie()) {
                overlay.classList.toggle("active");
                postGameSection.classList.toggle("active");
                winner.innerText = "It's a tie!";
                congratulations.innerText = "";
            }
        }
        updateScore();
    }

    const updateBoard = () => {
        for (let i = 0; i < 9; i++) {
            gameBoardCells[i].addEventListener("mouseover", function () {
                if (game.getTurn() === "x") {
                    gameBoardCells[i].classList.add("game-hover-x");
                } else {
                    gameBoardCells[i].classList.add("game-hover-o");
                }
            })
        }

        for (let i = 0; i < 9; i++) {
            gameBoardCells[i].addEventListener("mouseout", function () {
                gameBoardCells[i].classList.remove("game-hover-x");
                gameBoardCells[i].classList.remove("game-hover-o");
            })
        }

        for (let i = 0; i < 9; i++) {
            gameBoardCells[i].addEventListener("click", function () {

                if (gameBoard.isEmpty(i)) {
                    if (game.getTurn() === "x") {
                        playTurn("x", i);

                    } else {
                        playTurn("o", i);
                    }
                }
            })
        }

        continueButton.addEventListener("click", function () {
            resetBoard();
            overlay.classList.toggle("active");
            postGameSection.classList.toggle("active");
        })

        restartButton.addEventListener("click", function () {
            window.location.reload();
        })

        resetButton.addEventListener("click", function () {
            resetBoard();
        })

    }
    const updateScore = () => {
        playerXScore.innerText = game.playerXScore;
        playerOScore.innerText = game.playerOScore;
        ties.innerText = game.ties;
    }
    const resetBoard = () => {
        gameBoard.resetBoard();
        for (let i = 0; i < 9; i++) {
            gameBoardCells[i].classList.remove("game-select-x");
            gameBoardCells[i].classList.remove("game-select-o");
        }
    }

    return {startGame, updateBoard};
})();

displayController.startGame();
displayController.updateBoard();