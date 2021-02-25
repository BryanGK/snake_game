const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');
const scoreBoard = document.querySelector('#score span');
const highScore = document.querySelector('#high-score span');
const savedScore = JSON.parse(localStorage.getItem('scoreLocalStorage'));

const framesPerSecond = 10;
const gridSize = 20;
const elementSize = 20;
const snakeInitLength = 20;

let snakeBodyLength = 5;
let snakeSpeed = 20;
let snakePosX = 200;
let snakePosY = 200;
let directionX = 0;
let directionY = 0;
let applePosX = 0;
let applePosY = 0;

let gameOver = true;

let score = 0

let scoreLocalStorage = {
    lastRoundScore: 0,
    highScore: 0,
};

let snakeBody = [];

const drawGameBoard = () => {
    for (let i = 0; i < canvas.height / gridSize; i++) {
        for (let j = 0; j < canvas.width / gridSize; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 1) {
                    ctx.fillStyle = 'rgb(96, 108, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(60, 100, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            } else if (i % 2 === 1) {
                if (j % 2 === 0) {
                    ctx.fillStyle = 'rgb(96, 108, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(60, 100, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            }
        }
    }
}

const drawGameOver = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgb(230, 230, 230)'
    ctx.lineWidth = 10;
    ctx.strokeRect(gridSize, gridSize, canvas.width - (gridSize * 2), canvas.height - (gridSize * 2));
    ctx.fillStyle = 'rgb(230, 230, 230)'
    ctx.font = '100px VT323';
    ctx.fillText('Game Over', 117, canvas.height * .3);
    ctx.font = '36px VT323';
    ctx.fillText('Press Spacebar to start a New Game', 55, canvas.height * .45);
    ctx.font = '24px VT323';
    ctx.fillText('* Use Arrow keys to control Snake *', 132, canvas.height * .63);
    ctx.fillText('* Collect Apples to score points *', 137, canvas.height * .7);
    ctx.fillStyle = 'red';
    ctx.font = '24px VT323';
    ctx.fillText('<-- Avoid hitting the edges or your own tail! -->', 65, canvas.height * .8)
}

const buildBody = () => {
    const snakeSegment = new SnakeBodySegment(snakePosX, snakePosY, elementSize)
    return snakeBody.unshift(snakeSegment);
}

const drawBody = () => {
    buildBody();
    snakeBody.forEach((elem) => {
        ctx.fillStyle = 'rgb(221, 161, 94)';
        ctx.fillRect(elem.bodyPosX, elem.bodyPosY, elem.width, elem.height);
        ctx.strokeStyle = 'rgb(241, 201, 114)';
        ctx.lineWidth = 1;
        ctx.strokeRect(elem.bodyPosX, elem.bodyPosY, elem.width, elem.height);
    });
    if (snakeBody.length > snakeBodyLength)
        snakeBody.pop();
}

class SnakeBodySegment {
    constructor(bodyPosX, bodyPosY, elementSize) {
        this.bodyPosX = bodyPosX;
        this.bodyPosY = bodyPosY;
        this.width = elementSize;
        this.height = elementSize;
    }
}

const drawHead = () => {
    if (snakePosX % gridSize === 0 && snakePosY % gridSize === 0) {
        getDirection();
    }
    ctx.fillStyle = 'rgb(221, 161, 94)';
    ctx.fillRect(snakePosX += (snakeSpeed * directionX),
        snakePosY += (snakeSpeed * directionY),
        elementSize,
        elementSize);
    ctx.strokeStyle = 'rgb(241, 201, 114)';
    ctx.lineWidth = 1;
    ctx.strokeRect(snakePosX, snakePosY, elementSize, elementSize);
}

const getDirection = () => {
    window.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowUp':
                directionX = 0;
                if (directionY === 1) {
                    return;
                } else directionY = -1;
                break;
            case 'ArrowDown':
                directionX = 0;
                if (directionY === -1) {
                    return;
                } else directionY = 1;
                break;
            case 'ArrowLeft':
                directionY = 0;
                if (directionX === 1) {
                    return;
                } else directionX = -1;
                break;
            case 'ArrowRight':
                directionY = 0;
                if (directionX === -1) {
                    return;
                } else directionX = 1;
                break;
            default:
                console.log('Ignored');
                break;
        }
    });
}

const drawApple = () => {
    snakeBody.forEach((elem) => {
        bodyPosX = elem.bodyPosX;
        bodyPosY = elem.bodyPosY;
        if (applePosX === bodyPosX && applePosY === bodyPosY) {
            randomX();
            randomY();
        } else {
            ctx.fillStyle = 'red'
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.arc(applePosX + (elementSize / 2), applePosY + (elementSize / 2), elementSize / 2, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.fill();
        }
    });
}

const randomX = () => {
    applePosX = Math.floor(Math.random() * (canvas.width / gridSize)) * (gridSize);
    if (applePosX < gridSize || applePosX === (canvas.width - gridSize)) {
        randomX();
    }
}

const randomY = () => {
    applePosY = Math.floor(Math.random() * (canvas.height / gridSize)) * (gridSize);
    if (applePosY < gridSize || applePosY === (canvas.height - gridSize)) {
        randomY();
    }
}

const boundaryCheck = () => {
    if (snakePosX < 0 || snakePosX === canvas.width) {
        gameOver = true;
        snakeSpeed = -snakeSpeed;
    }
    if (snakePosY < 0 || snakePosY === canvas.height) {
        gameOver = true;
        snakeSpeed = -snakeSpeed;
    }
}

const appleCheck = () => {
    if (snakePosX === applePosX && snakePosY === applePosY) {
        randomX();
        randomY();
        snakeBodyLength += 1;
        score++;
        scoreBoard.textContent = `SCORE: ${score}`;
    }
}

const bodyCheck = () => {
    snakeBody.forEach((elem) => {
        bodyPosX = elem.bodyPosX;
        bodyPosY = elem.bodyPosY;
        if (directionX === 0 && directionY === 0) {
            return;
        } else if (snakePosY === bodyPosY && snakePosX === bodyPosX) {
            gameOver = true;
        }
    });
}



const createLocalStorage = () => {
    if (savedScore === null) {
        localStorage.setItem('scoreLocalStorage', JSON.stringify(scoreLocalStorage));
        document.location.reload();
    }
}

const displayLastRoundScore = () => {
    scoreBoard.textContent = `SCORE: ${savedScore.lastRoundScore}`;
    highScore.textContent = `HIGH SCORE: ${savedScore.highScore}`;
}

const checkGameOver = () => {
    if (gameOver) {
        scoreLocalStorage.lastRoundScore = score;
        scoreLocalStorage.highScore = savedScore.highScore;
        if (scoreLocalStorage.lastRoundScore > scoreLocalStorage.highScore) {
            scoreLocalStorage.highScore = scoreLocalStorage.lastRoundScore;
            localStorage.setItem('scoreLocalStorage', JSON.stringify(scoreLocalStorage));
        }
        localStorage.setItem('scoreLocalStorage', JSON.stringify(scoreLocalStorage));
        document.location.reload();
    }
}

window.addEventListener('keydown', (e) => {
    if (gameOver && (e.code) === "Space") {
        gameOver = false;
        playGame();
        score = 0;
    }
});


const playGame = () => {
    setInterval(function () {
        drawGameBoard();
        drawApple();
        drawBody();
        drawHead();
        boundaryCheck();
        appleCheck();
        bodyCheck();
        checkGameOver();
    }, 1000 / framesPerSecond);
    randomX();
    randomY();
}

window.onload = () => {
    createLocalStorage();
    drawGameBoard();
    drawGameOver();
    displayLastRoundScore();
}

