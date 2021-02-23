const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 60;
const gridSize = 25;
const elementSize = 25;
const snakeInitLength = 25;
const mouthSize = 3;
let gameOver = true;
let snakeBodyLength = 25;
let snakeSpeed = 3;
let snakePosX = 220;
let snakePosY = 220;
let directionX = 0;
let directionY = 0;
let applePosX = 0;
let applePosY = 0;

let score = 0;

let snakeBody = [];

class SnakeBodySegment {
    constructor(bodyPosX, bodyPosY, elementSize) {
        this.bodyPosX = bodyPosX;
        this.bodyPosY = bodyPosY;
        this.width = elementSize;
        this.height = elementSize;
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

const drawHead = () => {
    getDirection();
    ctx.fillStyle = 'rgb(221, 161, 94)';
    ctx.fillRect(snakePosX += (snakeSpeed * directionX),
    snakePosY += (snakeSpeed * directionY),
    elementSize,
    elementSize);
}

const drawMouth = () => {
    ctx.fillStyle = 'pink'
    if (directionY === -1) {
        ctx.fillRect(snakePosX, snakePosY - mouthSize, elementSize, mouthSize);
    }
    if (directionY === 1) {
        ctx.fillRect(snakePosX, snakePosY + elementSize, elementSize, mouthSize);
    }
    if (directionX === -1) {
        ctx.fillRect(snakePosX - mouthSize, snakePosY, mouthSize, elementSize);
    }
    if (directionX === 1 || (directionX === 0 && directionY === 0)) {
        ctx.fillRect(snakePosX + elementSize, snakePosY, mouthSize, elementSize);
    }
}

const drawApple = () => {
    ctx.fillStyle = 'red'
    ctx.fillRect(applePosX, applePosY, elementSize, elementSize)
}

const randomX = () => {
    return applePosX = Math.floor(Math.random() * (canvas.width - elementSize)) + 1;
}

const randomY = () => {
    return applePosY = Math.floor(Math.random() * (canvas.height - elementSize)) + 1;
}

function getDirection() {
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
                } else  directionX = -1;
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

const appleCheck = () => {
    if ((snakePosX + elementSize >= applePosX && snakePosX <= applePosX + elementSize) &&
         (snakePosY + elementSize >= applePosY && snakePosY <= applePosY + elementSize)) {
        randomX();
        randomY();
        snakeBodyLength += 5;
        score++;
        console.log('COLLISION');
    }
}

const boundaryCheck = () => {
    if (snakePosX <= 0 || snakePosX >= canvas.width - elementSize) {
        gameOver = true;
    }
    if (snakePosY <= 0 || snakePosY >= canvas.height - elementSize) {
        gameOver = true;
    }
}

const bodyCheck = () => {
    snakeBody.forEach((elem) => {
        bodyPosX = elem.bodyPosX;
        bodyPosY = elem.bodyPosY;
        if (directionY === -1) {
            if ((snakePosX <= bodyPosX + elementSize && snakePosX + elementSize >= bodyPosX) &&
                (snakePosY - mouthSize <= bodyPosY + elementSize && snakePosY >= bodyPosY + elementSize)) {
                gameOver = true;
                }
        }
        if (directionY === 1) {
            if ((snakePosX + elementSize >= bodyPosX && snakePosX <= bodyPosX + elementSize) &&
                (snakePosY + mouthSize >= bodyPosY && snakePosY <= bodyPosY)) {
                gameOver = true;
            }
        }
        if (directionX === -1) {
            if ((snakePosX - mouthSize <= bodyPosX + elementSize && snakePosX >= bodyPosX) &&
                (snakePosY >= bodyPosY && snakePosY <= bodyPosY + elementSize)) {
                gameOver = true;
            }
        }
        if (directionX === 1) {
            if ((snakePosX + mouthSize <= bodyPosX && snakePosX <= bodyPosX + elementSize) &&
                (snakePosY - elementSize <= bodyPosY && snakePosY >= bodyPosY - elementSize)) {
                gameOver = true;
            }
        }
    });
}



const drawGameBoard = () => {
    for (let i = 0; i < canvas.height / gridSize; i++) {
        for (let j = 0; j < canvas.width / gridSize; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 1) {
                    ctx.fillStyle = 'rgb(96, 108, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(60, 74, 24)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            } else if (i % 2 === 1) {
                if (j % 2 === 0) {
                    ctx.fillStyle = 'rgb(96, 108, 56)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(60, 74, 24)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            }
        }
    }
}

window.onload = () => {
        setInterval(function () {
            drawGameBoard();
            drawBody();
            drawHead();
            drawMouth();
            drawApple();
            boundaryCheck();
            appleCheck();
            bodyCheck();
        }, 1000 / framesPerSecond);
        randomX();
        randomY();
    }

