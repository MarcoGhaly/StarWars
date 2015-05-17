var screenWidth = $(window).width();
var screenHeight = $(window).height();

// bullet units
var bullet_moveUnit = 5;
var bullet_width = 20;
var bullet_height = 30;

var enemyBigShip;

var initMoveFlag = false;
var bigEnemy_strength = 30;

setInterval(initEnemyMovement, 50);
setInterval(moveEnemyRandomly, 25);
setInterval(generateCoor, 3000);
setInterval(generateBigEnemyBullets, 3000);
setInterval(updateCenterEnemyBullets, 25);
setInterval(updateLeftEnemyBullets, 25);
setInterval(updateRightEnemyBullets, 25);

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



//generate enemy bullets
function generateBigEnemyBullets() {
    if (initMoveFlag === true) {
        
        var bullet = document.createElement('img');
        
        var bullet1 = document.createElement('img');
        
        var bullet2 = document.createElement('img');
        
        bullet.setAttribute('src', 'img/rocket.png');
        bullet.setAttribute('name', 'bigEnemyBullet');
        bullet.setAttribute('width', bullet_width + 'px');
        bullet.setAttribute('height', bullet_height + 'px');

        bullet1.setAttribute('src', 'img/rocket_left.png');
        bullet1.setAttribute('name', 'leftBigEnemyBullet');
        bullet1.setAttribute('width', bullet_width + 'px');
        bullet1.setAttribute('height', bullet_height + 'px');

        bullet2.setAttribute('src', 'img/rocket_right.png');
        bullet2.setAttribute('name', 'rightBigEnemyBullet');
        bullet2.setAttribute('width', bullet_width + 'px');
        bullet2.setAttribute('height', bullet_height + 'px');

        bullet.style.position = 'absolute';
        bullet1.style.position = 'absolute';
        bullet2.style.position = 'absolute';

        bullet.style.left = parseInt(enemyBigShip.style.left) + (enemyBigShip.width - bullet_width) / 2 + 'px';
        bullet.style.top = parseInt(enemyBigShip.style.top) + enemyBigShip.height + 'px';

        bullet1.style.left = parseInt(enemyBigShip.style.left) + (enemyBigShip.width - bullet_width) / 2 - 50 + 'px';
        bullet1.style.top = parseInt(enemyBigShip.style.top) + enemyBigShip.height + 'px';
        
        bullet2.style.left = parseInt(enemyBigShip.style.left) + (enemyBigShip.width - bullet_width) / 2 + 50 + 'px';
        bullet2.style.top = parseInt(enemyBigShip.style.top) + enemyBigShip.height + 'px';
        
        document.body.appendChild(bullet);
        document.body.appendChild(bullet1);
        document.body.appendChild(bullet2);
    }
}

//update enemy bullets 
function updateCenterEnemyBullets() {
    var bullets = document.getElementsByName('bigEnemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnit + 'px';
        if (parseInt(bullets[i].style.top) + bullet_height > screenHeight) {
            document.body.removeChild(bullets[i]);
        }
    }
}
function updateLeftEnemyBullets() {
    var bullets = document.getElementsByName('leftBigEnemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnit + 'px';
        bullets[i].style.left = parseInt(bullets[i].style.left) - bullet_moveUnit + 'px';
        if (parseInt(bullets[i].style.top) + bullet_height > screenHeight) {
            document.body.removeChild(bullets[i]);
        }
    }
}

function updateRightEnemyBullets() {
    var bullets = document.getElementsByName('rightBigEnemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnit + 'px';
        bullets[i].style.left = parseInt(bullets[i].style.left) + bullet_moveUnit + 'px';
        
        if (parseInt(bullets[i].style.top) + bullet_height > screenHeight) {
            document.body.removeChild(bullets[i]);
        }
    }
}



