const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 10;
const gridSize = 25;
let snakeSpeed = 10;
const elementSize = 25;
const snakeInitLength = 2;
let snakeBodyLength = 5;
let snakePosX = 295;
let snakePosY = 245;
let directionX = 0;
let directionY = 0;
let applePosX = 0;
let applePosY = 0;

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
    ctx.fillRect(snakePosX - (elementSize * directionX),
        (snakePosY - (elementSize * directionY)),
        elementSize,
        elementSize);

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
                directionY = -1;
                break;
            case 'ArrowDown':
                directionX = 0;
                directionY = 1;
                break;
            case 'ArrowLeft':
                directionX = -1;
                directionY = 0;
                break;
            case 'ArrowRight':
                directionX = 1;
                directionY = 0;
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
        console.log('COLISION X');
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