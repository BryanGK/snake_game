const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 10;
const gridSize = 20;
const snakeSpeed = 10;
const snakeElementSize = 10;
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
            ctx.fillStyle = 'green';
            ctx.fillRect(gridSize * j, gridSize * i, gridSize, gridSize);
        }
    }
}

const drawHead = () => {
    ctx.fillStyle = 'yellow';
    getDirection();
    ctx.fillRect(snakePosX += (snakeSpeed * directionX),
        snakePosY += (snakeSpeed * directionY),
        snakeElementSize,
        snakeElementSize);
}

const drawBody = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(snakePosX - (snakeElementSize * directionX),
        (snakePosY - (snakeElementSize * directionY)),
        snakeElementSize,
        snakeElementSize);

}

const drawApple = () => {
    ctx.fillStyle = 'red'
    ctx.fillRect(applePosX, applePosY, snakeElementSize, snakeElementSize)
}

const randomX = () => {
    return applePosX = Math.floor(Math.random() * (canvas.width - snakeElementSize)) + 1;
}

const randomY = () => {
    return applePosY = Math.floor(Math.random() * (canvas.height - snakeElementSize)) + 1;
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
}

const boundaryCheck = () => {
    if (snakePosX <= 0 || snakePosX >= canvas.width - snakeElementSize) {
        directionX = -directionX;
    }
    if (snakePosY <= 0 || snakePosY >= canvas.height - snakeElementSize) {
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