const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 60;
const snakeSpeed = 1;
const snakeElementSize = 10;
const snakeInitLength = 2;
let snakeBodyLength = 2;
let snakePosX = 300;
let snakePosY = 250;

const drawGameBoard = () => {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawHead = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(snakePosX, snakePosY, snakeElementSize, snakeElementSize);
}

const drawBody = () => {
    ctx.fillStyle = 'black';
    for (let i = 1; i <= snakeBodyLength; i++) {
        ctx.fillRect((snakePosX - (snakeElementSize * i)),
            snakePosY, snakeElementSize, snakeElementSize);
    }
}

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            moveUp(e.code);
            break
        case 'ArrowDown':
            moveDown();
            break
        case 'ArrowLeft':
            moveLeft();
            break
        case 'ArrowRight':
            moveRight();
            break
        default:
            console.log('Ignored');
            break
    }
})

const moveUp = () => {
    setInterval(() => {
        snakePosX = snakePosX;
        if (snakePosY > 0) {
            snakePosY -= snakeSpeed;
        }
    }, 1000 / framesPerSecond);
}

const moveDown = () => {
    setInterval(() => {
        if (snakePosY < canvas.height - snakeElementSize) {
            snakePosY += snakeSpeed;
        }
    }, 1000 / framesPerSecond);
}

const moveLeft = () => {
    setInterval(() => {
        if (snakePosX > 0) {
            snakePosX -= snakeSpeed;
        }
    }, 1000 / framesPerSecond);
}

const moveRight = () => {
    setInterval(() => {
        if (snakePosX < canvas.width - snakeElementSize) {
            snakePosX += snakeSpeed;
        }
    }, 1000 / framesPerSecond);
}

window.onload = function () {
    setInterval(function () {
        drawGameBoard();
        drawBody();
        drawHead();
    }, 1000 / framesPerSecond);
}