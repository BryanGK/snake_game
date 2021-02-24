const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 10;
const gridSize = 20;
const elementSize = 20;
const snakeInitLength = 20;
const mouthSize = 3;

let snakeBodyLength = 15;
let snakeSpeed = 20;
let snakePosX = 200;
let snakePosY = 200;
let directionX = 0;
let directionY = 0;
let applePosX = 0;
let applePosY = 0;

let gameOver = true;
let score = 0;

let snakeBody = [];

const drawGameBoard = () => {
    for (let i = 0; i < canvas.height / gridSize; i++) {
        for (let j = 0; j < canvas.width / gridSize; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 1) {
                    ctx.fillStyle = 'rgb(96, 108, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(60, 98, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            } else if (i % 2 === 1) {
                if (j % 2 === 0) {
                    ctx.fillStyle = 'rgb(96, 108, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(60, 98, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            }
        }
    }
}

const buildBody = () => {
    const snakeSegment = new SnakeBodySegment(snakePosX, snakePosY, elementSize)
    return snakeBody.unshift(snakeSegment);
}

const drawBody = () => {
    buildBody();
    snakeBody.forEach((elem) => {
        ctx.fillStyle = 'rgb(221, 161, 94)'
        ctx.fillRect(elem.bodyPosX, elem.bodyPosY, elem.width, elem.height)
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
    checkGridPos();
    ctx.fillStyle = 'rgb(221, 161, 94)';
    ctx.fillRect(snakePosX += (snakeSpeed * directionX),
        snakePosY += (snakeSpeed * directionY),
        elementSize,
        elementSize);
}

const checkGridPos = () => {
    if (snakePosX % gridSize === 0 && snakePosY % gridSize === 0) {
        getDirection();
    }
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
    ctx.fillStyle = 'red'
    ctx.fillRect(applePosX, applePosY, elementSize, elementSize)
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
    if (snakePosX  === applePosX && snakePosY === applePosY) {
        randomX();
        randomY();
        snakeBodyLength += 1;
        score++;
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

const checkGameOver = () => {
    if (gameOver === true) {
        document.location.reload();
        alert("Game Over")
    }
}

const playGame = () => {
    setInterval(function () {
        drawGameBoard();
        drawBody();
        drawHead();
        drawApple();
        boundaryCheck();
        appleCheck();
        bodyCheck();
        checkGameOver();
    }, 1000 / framesPerSecond);
    randomX();
    randomY();
}

window.onload = () => {
    drawGameBoard();
    window.addEventListener('keydown', (e) => {
        if ((e.code) === "Space") {
            gameOver = false;
            playGame();
        }
    });
}


