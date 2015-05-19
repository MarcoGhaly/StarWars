var screenWidth = $(window).width();
var screenHeight = $(window).height();

// bullet units
var bullet_moveUnitY = 5;
var bullet_widthY = 20;
var bullet_heightY = 30;

var enemyBigShip;

var initMoveFlag = false;
var bigEnemy_strength = 1000;

var initEnemyMovementInterval;
var moveEnemyRandomlyInterval;
var generateCoorInterval;
var generateBigEnemyBulletsInterval;
var updateLeftEnemyBulletsInterval;

function generateBigEnemy() {

    enemyBigShip = document.createElement('img');
    enemyBigShip.setAttribute('src', 'img/bigenemy.png');
    enemyBigShip.setAttribute('width', 250 + 'px');
    enemyBigShip.setAttribute('height', 150 + 'px');
    enemyBigShip.style.position = 'absolute';
    enemyBigShip.style.left = (screenWidth - enemyBigShip.width) / 2 + 'px';
    enemyBigShip.style.top = (0 - enemyBigShip.height) + 'px';
    enemyBigShip.setAttribute('class', 'enemy');
    enemyBigShip.setAttribute('name', 'bigEnemyShip');
    enemyBigShip.strength = bigEnemy_strength;
    document.body.appendChild(enemyBigShip);
    

    initEnemyMovementInterval = setInterval(initEnemyMovement, 50);
    
}

function initEnemyMovement() {
    alert("sds");
    // alert(enemyBigShip.style.top);
    if ((parseInt(enemyBigShip.style.top)) < 150) {
        enemyBigShip.style.top = parseInt(enemyBigShip.style.top) + 5 + 'px';
        
    } else {
        initMoveFlag = true;
        
        // stop init enemy interval
        clearInterval(initEnemyMovementInterval);

        // start enemy and bullets movement
        moveEnemyRandomlyInterval = setInterval(moveEnemyRandomly, 25);
        generateCoorInterval = setInterval(generateCoor, 3000);
        generateBigEnemyBulletsInterval = setInterval(generateBigEnemyBullets, 3000);
        generateBigEnemyBulletsInterval = setInterval(updateCenterEnemyBullets, 25);
        updateLeftEnemyBulletsInterval = setInterval(updateLeftEnemyBullets, 25);
        updateLeftEnemyBulletsInterval = setInterval(updateRightEnemyBullets, 25);
        

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

    var enemies = document.getElementsByName('bigEnemyShip');

    if (enemies.length === 0) {

        // stop all intervals
        clearInterval(moveEnemyRandomlyInterval);
        clearInterval(generateCoorInterval);
        clearInterval(generateBigEnemyBulletsInterval);
        clearInterval(updateLeftEnemyBulletsInterval);

    }

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
    var enemies = document.getElementsByName('bigEnemyShip');
    for (var i = 0; i < enemies.length; i++) {
        if (initMoveFlag === true) {
            var bullet = document.createElement('img');

            var bullet1 = document.createElement('img');

            var bullet2 = document.createElement('img');

            bullet.setAttribute('src', 'img/rocket.png');
            bullet.setAttribute('name', 'bigEnemyBullet');
            bullet.setAttribute('width', bullet_widthY + 'px');
            bullet.setAttribute('height', bullet_heightY + 'px');
            bullet.setAttribute('class', 'enemy_bullet');

            bullet1.setAttribute('src', 'img/rocket_left.png');
            bullet1.setAttribute('name', 'leftBigEnemyBullet');
            bullet1.setAttribute('width', bullet_widthY + 'px');
            bullet1.setAttribute('height', bullet_heightY + 'px');
            bullet1.setAttribute('class', 'enemy_bullet');
            
            bullet2.setAttribute('src', 'img/rocket_right.png');
            bullet2.setAttribute('name', 'rightBigEnemyBullet');
            bullet2.setAttribute('width', bullet_widthY + 'px');
            bullet2.setAttribute('height', bullet_heightY + 'px');
            bullet2.setAttribute('class', 'enemy_bullet');
            
            bullet.style.position = 'absolute';
            bullet1.style.position = 'absolute';
            bullet2.style.position = 'absolute';

            bullet.style.left = parseInt(enemies[i].style.left) + (enemies[i].width - bullet_widthY) / 2 + 'px';
            bullet.style.top = parseInt(enemies[i].style.top) + enemies[i].height + 'px';

            bullet1.style.left = parseInt(enemies[i].style.left) + (enemies[i].width - bullet_widthY) / 2 - 50 + 'px';
            bullet1.style.top = parseInt(enemies[i].style.top) + enemies[i].height + 'px';

            bullet2.style.left = parseInt(enemies[i].style.left) + (enemies[i].width - bullet_widthY) / 2 + 50 + 'px';
            bullet2.style.top = parseInt(enemies[i].style.top) + enemies[i].height + 'px';

            document.body.appendChild(bullet);
            document.body.appendChild(bullet1);
            document.body.appendChild(bullet2);
        }
    }
}

//update enemy bullets 
function updateCenterEnemyBullets() {
    var bullets = document.getElementsByName('bigEnemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnitY + 'px';
        if (parseInt(bullets[i].style.top) + bullet_heightY > screenHeight) {
            document.body.removeChild(bullets[i]);
        }
    }
}
function updateLeftEnemyBullets() {
    var bullets = document.getElementsByName('leftBigEnemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnitY + 'px';
        bullets[i].style.left = parseInt(bullets[i].style.left) - bullet_moveUnitY + 'px';
        if (parseInt(bullets[i].style.top) + bullet_heightY > screenHeight) {
            document.body.removeChild(bullets[i]);
        }
    }
}

function updateRightEnemyBullets() {
    var bullets = document.getElementsByName('rightBigEnemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnitY + 'px';
        bullets[i].style.left = parseInt(bullets[i].style.left) + bullet_moveUnitY + 'px';

        if (parseInt(bullets[i].style.top) + bullet_heightY > screenHeight) {
            document.body.removeChild(bullets[i]);
        }
    }
}
