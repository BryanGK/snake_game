const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const framesPerSecond = 10;
const gridSize = 20;
const elementSize = 20;
const snakeInitLength = 20;
const mouthSize = 3;

let snakeBodyLength = 4;
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
    if (snakePosX < 0 || snakePosX >= canvas.width - elementSize) {
        gameOver = true;
        snakeSpeed = -snakeSpeed;
    }
    if (snakePosY < 0 || snakePosY >= canvas.height - elementSize) {
        gameOver = true;
        snakeSpeed = -snakeSpeed;
    }
}

const appleCheck = () => {
    if ((snakePosX + elementSize > applePosX &&
        snakePosX < applePosX + elementSize) &&
        (snakePosY + elementSize > applePosY &&
            snakePosY < applePosY + elementSize)) {
        randomX();
        randomY();
        snakeBodyLength += 1;
        score++;
        console.log('COLLISION');
    }
}

const bodyCheck = () => {
    snakeBody.forEach((elem) => {
        bodyPosX = elem.bodyPosX;
        bodyPosY = elem.bodyPosY;
        if (directionY === -1) {
            if ((snakePosX <= bodyPosX + elementSize &&
                snakePosX + elementSize >= bodyPosX) &&
                (snakePosY - mouthSize <= bodyPosY + elementSize &&
                snakePosY >= bodyPosY + elementSize)) {
                gameOver = true;
                console.log('up')
            }
        }
        if (directionY === 1) {
            if ((snakePosX + elementSize >= bodyPosX &&
                snakePosX <= bodyPosX + elementSize) &&
                (snakePosY + mouthSize >= bodyPosY &&
                    snakePosY <= bodyPosY)) {
                gameOver = true;
                console.log('dn')
            }
        }
        if (directionX === -1) {
            if ((snakePosX - mouthSize <= bodyPosX + elementSize &&
                snakePosX >= bodyPosX) &&
                (snakePosY >= bodyPosY &&
                    snakePosY <= bodyPosY + elementSize)) {
                gameOver = true;
                console.log('left')
            }
        }
        if (directionX === 1) {
            if ((snakePosX + mouthSize <= bodyPosX &&
                snakePosX <= bodyPosX + elementSize) &&
                (snakePosY - elementSize <= bodyPosY &&
                    snakePosY >= bodyPosY - elementSize)) {
                gameOver = true;
                console.log('right')
            }
        }
    });
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

