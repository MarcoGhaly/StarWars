var screenWidth = $(window).width();
var screenHeight = $(window).height();

var enemyAShip;

var initMoveFlagA = false;
var enemyA_strength = 300;

var bullet;
var space;

var interval_initEnemyAMovement;
var interval_moveEnemyARandomly;
var interval_genarateBulletsA;
var interval_updateBulletsA;

function generateEnemyA() {
    enemyAShip = document.createElement('img');
    enemyAShip.setAttribute('class', 'enemy');
    enemyAShip.setAttribute('name', 'enemyA');
    enemyAShip.setAttribute('src', 'img/ewess_enemy.png');
    enemyAShip.style.position = 'absolute';
    enemyAShip.style.width = 250 + 'px';
    enemyAShip.style.height = 200 + 'px';
    enemyAShip.style.left = (screenWidth - 250) / 2 + 'px';
    enemyAShip.style.top = -200 + 'px';


    enemyAShip.strength = enemyA_strength;
    document.body.appendChild(enemyAShip);

    interval_initEnemyAMovement = setInterval(initEnemyAMovement, 50);
    interval_moveEnemyARandomly = setInterval(moveEnemyARandomly, 20);
    interval_genarateBulletsA = setInterval(genarateBulletsA, 1000);
    interval_updateBulletsA = setInterval(updateBulletsA, 30);
}

function initEnemyAMovement() {
    if ((parseInt(enemyAShip.style.top)) < 0) {
        enemyAShip.style.top = parseInt(enemyAShip.style.top) + 10 + 'px';
    } else {
        initMoveFlagA = true;
    }
}

function moveEnemyARandomly() {
    if (document.getElementsByName('enemyA').length === 0) {
        clearInterval(interval_initEnemyAMovement);
        clearInterval(interval_moveEnemyARandomly);
        clearInterval(interval_genarateBulletsA);
    } else {
        if ((parseInt(enemyAShip.style.left)) < screenWidth) {
            x = parseInt(enemyAShip.style.left) + 3;
        } else {
            x = -enemyAShip.width;
        }
        y = 50 * Math.sin(x * 0.05) + 50;

        if (initMoveFlagA === true) {
            enemyAShip.style.left = x + 'px';
            enemyAShip.style.top = y + 'px';
        }
    }
}

// bullet units
var bulletA_moveUnit = 10;


var bulletA_width = 100;
var bulletA_height = 70;

function genarateBulletsA() {
    var bulletA = document.createElement('img');
    bulletA.setAttribute('src', 'img/greenBullet.png');
    bulletA.setAttribute('class', 'enemy_bullet');
    bulletA.setAttribute('name', 'enemyA_bullet');
    bulletA.setAttribute('width', bulletA_width + 'px');
    bulletA.setAttribute('height', bulletA_height + 'px');
    bulletA.style.position = 'absolute';

    bulletA.style.left = parseInt(enemyAShip.style.left) + (enemyAShip.width - bulletA_width) / 2 + 'px';
    bulletA.style.top = parseInt(enemyAShip.style.top) + enemyAShip.height + 'px';

    document.body.appendChild(bulletA);
}


function updateBulletsA() {
    var ships = document.getElementsByName('enemyA');
    var bulletsA = document.getElementsByName('enemyA_bullet');

    if (ships.length === 0 && bulletsA.length === 0) {
        clearInterval(interval_updateBulletsA);
    } else {
        for (var i = 0; i < bulletsA.length; i++) {
            bulletsA[i].style.top = parseInt(bulletsA[i].style.top) + bulletA_moveUnit + 'px';
            if (parseInt(bulletsA[i].style.top) + bulletA_height > screenHeight) {
                document.body.removeChild(bulletsA[i]);
            }
        }
    }
}
