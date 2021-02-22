const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 60;
const gridSize = 25;
let snakeSpeed = 2;
const elementSize = 25;
const snakeInitLength = 2;
let snakeBodyLength = 5;
let snakePosX = 295;
let snakePosY = 245;
let directionX = 0;
let directionY = 0;
let applePosX = 0;
let applePosY = 0;

let snakeBody = [];

const drawGameBoard = () => {
    for (let i = 0; i < canvas.height / gridSize; i++) {
        for (let j = 0; j < canvas.width / gridSize; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 1) {
                    ctx.fillStyle = 'rgb(100, 225, 200)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(100, 255, 200)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            } else if (i % 2 === 1) {
                if (j % 2 === 0) {
                    ctx.fillStyle = 'rgb(100, 225, 200)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                } else {
                    ctx.fillStyle = 'rgb(100, 255, 200)';
                    ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
                }
            }
        }
    }
}

const drawHead = () => {
    ctx.fillStyle = 'yellow';
    getDirection();
    ctx.fillRect(snakePosX += (snakeSpeed * directionX),
        snakePosY += (snakeSpeed * directionY),
        elementSize,
        elementSize);
}

const drawBody = () => {
    ctx.fillStyle = 'black';
    
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
        console.log('COLLISION');
    }
}

const boundaryCheck = () => {
    if (snakePosX <= 0 || snakePosX >= canvas.width - elementSize) {
        directionX = -directionX;
    }
    if (snakePosY <= 0 || snakePosY >= canvas.height - elementSize) {
        directionY = -directionY;
    }
}

window.onload = function () {
    setInterval(function () {
        drawGameBoard();
        drawBody();
        drawHead();
        drawApple();
        boundaryCheck();
        appleCheck();
    }, 1000 / framesPerSecond);
    randomX();
    randomY();
}