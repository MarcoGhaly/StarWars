var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var enemy_moveUnit = 5;
var enemy_width = 100;
var enemy_height = 100;
var toPos_x = 100;
var toPos_y = 200;
var enemy_Direction = "left";
var flag = true;

var audio_weapon = new Audio('audio/weapon.wav');

// bullet units
var bullet_moveUnit = 10;
var bullet_width = 10;
var bullet_height = 30;


// alawys running functions
setTimeout(generateEnemy, 1000);
setInterval(updateEnemyBullets, 25);
var enemyMove = setInterval(updateEnemyMove, 25);



function generateEnemy() {

    var enemy = document.createElement('img');
    enemy.setAttribute('src', 'img/pirate.gif');
    enemy.setAttribute('name', 'speedAndTricky');
    enemy.setAttribute('class', 'enemy');
    enemy.setAttribute('width', enemy_width + 'px');
    enemy.setAttribute('height', enemy_height + 'px');
    //enemy.stregnth = 3;

    enemy.style.position = 'absolute';

    enemy.style.left = 1000 + "px";
    enemy.style.top = -100 + "px";

    if (parseInt(enemy.style.left) > toPos_x) {

        enemy_moveUnit *= -1;
    }

    document.body.appendChild(enemy);
}

function updateEnemyMove() {

    var enemyShip = document.getElementsByName('speedAndTricky')[0];

    if (parseInt(enemyShip.style.left) <= toPos_x && parseInt(enemyShip.style.left) >= toPos_x - 20
            && parseInt(enemyShip.style.top) >= toPos_y && parseInt(enemyShip.style.top) <= toPos_y + 20) {

        // pause enemy ship
        clearInterval(enemyMove);
        setTimeout(function () {
            enemyMove = setInterval(updateEnemyMove, 25)
        }, 500);

        // enemy fire
        enemyFire();

        // generate new position
        toPos_x = parseInt(Math.random() * 1000) + 50;
        toPos_y = parseInt(Math.random() * 600) + 50;

        if (parseInt(enemyShip.style.left) > toPos_x  ) {

            enemy_moveUnit *= -1;
            
        }else{
            enemy_moveUnit *= -1;
        }
    }


    var spaceShip_x = parseInt(enemyShip.style.left) + enemy_moveUnit;
    var spaceShip_y = parseInt(enemyShip.style.top);
    spaceShip_y = ((toPos_y - spaceShip_y) * (spaceShip_x - parseInt(enemyShip.style.left)) / (toPos_x - parseInt(enemyShip.style.left))) + spaceShip_y;


    enemyShip.style.left = spaceShip_x + 'px';
    enemyShip.style.top = spaceShip_y + 'px';

}

function enemyFire() {

    var enemyShip = document.getElementsByName('speedAndTricky')[0];
    var spaceShip = document.getElementById('spaceShip');

    var bullet = document.createElement('img');
    bullet.setAttribute('src', 'img/bullet.png');
    bullet.setAttribute('name', 'enemyBullet');
    bullet.setAttribute('width', bullet_width + 'px');
    bullet.setAttribute('height', bullet_height + 'px');

    bullet.style.position = 'absolute';
    bullet.style.left = parseInt(enemyShip.style.left) + 'px';
    bullet.style.top = parseInt(enemyShip.style.top) + 'px';

    bullet.direct_x = parseInt(spaceShip.style.left)
    bullet.direct_y = parseInt(spaceShip.style.top)
    bullet.moveUnit = 5;

    if (parseInt(bullet.style.left) > bullet.direct_x ) {

        bullet.moveUnit *= -1;

    }

    document.body.appendChild(bullet);
    audio_weapon.play();

}

function updateEnemyBullets() {

    var bullets = document.getElementsByName('enemyBullet');

    for (var i = 0; i < bullets.length; i++) {


        var bullet_x = parseInt(bullets[i].style.left);
        var bullet_y = parseInt(bullets[i].style.top) + bullets[i].moveUnit;

        var bullet_x = ((bullet_y - parseInt(bullets[i].style.top))*(bullets[i].direct_x - parseInt(bullets[i].style.left))/(bullets[i].direct_y - parseInt(bullets[i].style.top))) + bullet_x;

        bullets[i].style.left = bullet_x + 'px';
        bullets[i].style.top = bullet_y + 'px';

    }

}
