var screenWidth = $(window).width();
var screenHeight = $(window).height();

var enemyBigShip;

var initMoveFlag = false;
var bigEnemy_strength = 30;

setInterval(initEnemyMovement, 50);
setInterval(moveEnemyRandomly, 25);
setInterval(generateCoor, 3000);

$(document).ready(function () {
    enemyBigShip = document.getElementById('bigEnemyShip');
    enemyBigShip.style.position = 'absolute';
    enemyBigShip.style.left = (screenWidth - enemyBigShip.width) / 2 + 'px';
    enemyBigShip.style.top = (0 - enemyBigShip.height) + 'px';
    enemyBigShip.setAttribute('class', 'enemy');
    enemyBigShip.strength = bigEnemy_strength;
});

function initEnemyMovement() {
   // alert(enemyBigShip.style.top);
    if ((parseInt(enemyBigShip.style.top)) < 150) {
        enemyBigShip.style.top = parseInt(enemyBigShip.style.top) + 5 + 'px';
    } else {
        initMoveFlag = true;
    }
}

function generateCoor() {
    while (true) {
        enemyLeft = getRandomLeft(20, screenWidth - 20);
        if (Math.abs(parseInt(enemyBigShip.style.left) - enemyLeft) > 300) {
            break;
        }
    }

    enemyTop = getRandomTop(0, 300);

    deltaX = 5;
    if (parseInt(enemyBigShip.style.left) > enemyLeft) {
        deltaX *= -1;
    }
}

function moveEnemyRandomly() {
    x = parseInt(enemyBigShip.style.left) + deltaX;
    y = ((enemyTop - parseInt(enemyBigShip.style.top)) * (x - parseInt(enemyBigShip.style.left)) / (enemyLeft - parseInt(enemyBigShip.style.left))) + parseInt(enemyBigShip.style.top);
    if (initMoveFlag === true) {
        enemyBigShip.style.left = x + 'px';
        enemyBigShip.style.top = y + 'px';
    }
}

//generate random left and top attributes
function getRandomLeft(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTop(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}