var screenWidth = $(window).width();
var screenHeight = $(window).height();

var enemyAShip;

var initMoveFlagA = false;
var enemyA_strength = 30;

setInterval(initEnemyAMovement, 50);
setInterval(moveEnemyARandomly, 20);
setInterval(genarateBulletsA, 3000);
setInterval(updateBulletsA, 30);

$(document).ready(function () {
    enemyAShip = document.getElementById('enemyA');
    enemyAShip.style.position = 'absolute';
    enemyAShip.style.left = (screenWidth - enemyAShip.width) / 2 + 'px';
    enemyAShip.style.top = (0 - enemyAShip.height) + 'px';
    enemyAShip.setAttribute('class', 'enemy');
    enemyAShip.strength = enemyA_strength;
});

var bullet;
var space;



function initEnemyAMovement() {
    if ((parseInt(enemyAShip.style.top)) < 25) {
        enemyAShip.style.top = parseInt(enemyAShip.style.top) + 5 + 'px';
    } else {
        initMoveFlagA = true;
    }
}

function moveEnemyARandomly() {
    if ((parseInt(enemyAShip.style.left)) < screenWidth) {
        x = parseInt(enemyAShip.style.left) + 3;
        y = 50 * Math.sin(x * 0.05) + 50;
    } else {
        x = 20;
        y = 50 * Math.sin(x * 0.05) + 50;
    }
    if (initMoveFlagA === true) {
        enemyAShip.style.left = x + 'px';
        enemyAShip.style.top = y + 'px';
    }
}


// bullet units
var bulletA_moveUnit = 10;


var bulletA_width =100;
var bulletA_height = 70;


function genarateBulletsA() {
    var bulletA = document.createElement('img');
    bulletA.setAttribute('src', 'img/greenBullet.png');
    bulletA.setAttribute('class', 'enemy_bullets');
    bulletA.setAttribute('name', 'enemyA_bullets');
    bulletA.setAttribute('width', bulletA_width + 'px');
    bulletA.setAttribute('height', bulletA_height + 'px');
    bulletA.style.position = 'absolute';

    bulletA.style.left = parseInt(enemyAShip.style.left) + (enemyAShip.width - bulletA_width) / 2 + 'px';
    bulletA.style.top = parseInt(enemyAShip.style.top) + enemyAShip.height + 'px';

    document.body.appendChild(bulletA);
}


function updateBulletsA() {
    var bulletsA = document.getElementsByName('enemyA_bullets');
    for (var i = 0; i < bulletsA.length; i++)
    {
        bulletsA[i].style.top = parseInt(bulletsA[i].style.top) + bulletA_moveUnit + 'px';
        if (parseInt(bulletsA[i].style.top) + bulletA_height > screenHeight) {
            document.body.removeChild(bulletsA[i]);
        }
    }
}
