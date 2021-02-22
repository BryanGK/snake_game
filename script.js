const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 60;
const snakeSpeed = 1;
const snakeElementSize = 10;
const snakeInitLength = 2;
let snakeBodyLength = 2;
let snakePosX = 300;
let snakePosY = 250;
let directionX = 0;
let directionY = 0;

const drawGameBoard = () => {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawHead = () => {
    ctx.fillStyle = 'red';

    getDirection();

    boundaryCheck();

    ctx.fillRect(snakePosX += (snakeSpeed * directionX),
        snakePosY += (snakeSpeed * directionY),
        snakeElementSize,
        snakeElementSize);
}

const drawBody = () => {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = snakeElementSize;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
}

function getDirection() {
    window.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowUp':
                directionX = 0;
                directionY = -snakeSpeed;
                break;
            case 'ArrowDown':
                directionX = 0;
                directionY = snakeSpeed;
                break;
            case 'ArrowLeft':
                directionX = -snakeSpeed;
                directionY = 0;
                break;
            case 'ArrowRight':
                directionX = snakeSpeed;
                directionY = 0;
                break;
            default:
                console.log('Ignored');
                break;
        }
    });
}

function boundaryCheck() {
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
    }, 1000 / framesPerSecond);
}