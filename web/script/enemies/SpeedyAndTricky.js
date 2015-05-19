var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var enemy_moveUnit = 25;
var enemy_width = 200;
var enemy_height = 200;
var toPos_x = 1000;
var toPos_y = 200;
var enemy_Direction = "right";
var flag = true;

// bullet units
var fireBall_width = 30;
var fireBall_height = 30;

// alawys running functions intervals 
//setTimeout(generateSpeedyAndTricky, 1000);
//setTimeout(generateSpeedyAndTricky, 4000);
var updateSpeedAndTrickyBulletsInterval;
var updateSpeedyAndTrickyMoveInterval;

var speedyIntervalStart = false;

function generateSpeedyAndTricky() {

    var enemy = document.createElement('img');
    enemy.setAttribute('src', 'img/pirate.gif');
    enemy.setAttribute('name', 'speedAndTricky');
    enemy.setAttribute('class', 'enemy');
    enemy.setAttribute('width', enemy_width + 'px');
    enemy.setAttribute('height', enemy_height + 'px');
    enemy.strength = 100;

    enemy.style.position = 'absolute';

    enemy.style.left = parseInt(Math.random() * 1000) + 50 + "px";
    enemy.style.top = -enemy.height + "px";

    document.body.appendChild(enemy);

    if (!speedyIntervalStart) {

        // start update movement for enemy and bullets
        updateSpeedyAndTrickyMoveInterval = setInterval(updateSpeedyAndTrickyMove, 25);
        updateSpeedAndTrickyBulletsInterval = setInterval(updateSpeedyAndTrickyBullets, 25);
        speedyIntervalStart = true;
    }
}

function updateSpeedyAndTrickyMove() {

    var enemyShips = document.getElementsByName('speedAndTricky');

    // stop enemy movement if there is no enemy
    if (enemyShips.length === 0) {
        clearInterval(updateSpeedyAndTrickyMoveInterval);
        speedyIntervalStart = false;

        var enemyBullets = document.getElementsByName('enemyBullet');

        for (i = 0; i < enemyBullets.length; i++) {
            document.body.removeChild(enemyBullets[i]);
        }
    } else {

        for (i = 0; i < enemyShips.length; i++) {

            var spaceShip_x;
            var spaceShip_y;

            if (parseInt(enemyShips[i].style.left) >= toPos_x - 50 && parseInt(enemyShips[i].style.left) <= toPos_x + 50
                    && parseInt(enemyShips[i].style.top) >= toPos_y - 50 && parseInt(enemyShips[i].style.top) <= toPos_y + 50) {

                // pause enemy ship
                clearInterval(updateSpeedyAndTrickyMoveInterval);
                setTimeout(function () {
                    updateSpeedyAndTrickyMoveInterval = setInterval(updateSpeedyAndTrickyMove, 25)
                }, 500);

                // enemy fire
                enemyFire(enemyShips[i]);

                // generate new position
                while (true) {

                    toPos_x = parseInt(Math.random() * 1000) + 50;
                    if (Math.abs(toPos_x - parseInt(enemyShips[i].style.left)) > 300)
                        break;
                }

                toPos_y = parseInt(Math.random() * 300) + 50;

                console.log(toPos_x + ", " + toPos_y);

                if (parseInt(enemyShips[i].style.left) > toPos_x) {

                    enemy_Direction = "left";

                } else {
                    enemy_Direction = "right";
                }

            }

            if (enemy_Direction === "right") {

                spaceShip_x = parseInt(enemyShips[i].style.left) + enemy_moveUnit;
                spaceShip_y = parseInt(enemyShips[i].style.top);
                spaceShip_y = ((toPos_y - spaceShip_y) * (spaceShip_x - parseInt(enemyShips[i].style.left)) / (toPos_x - parseInt(enemyShips[i].style.left))) + spaceShip_y;

            } else if (enemy_Direction === "left") {

                spaceShip_x = parseInt(enemyShips[i].style.left) - enemy_moveUnit;
                spaceShip_y = parseInt(enemyShips[i].style.top);
                spaceShip_y = ((toPos_y - spaceShip_y) * (spaceShip_x - parseInt(enemyShips[i].style.left)) / (toPos_x - parseInt(enemyShips[i].style.left))) + spaceShip_y;
            }

            enemyShips[i].style.left = spaceShip_x + 'px';
            enemyShips[i].style.top = spaceShip_y + 'px';
        }

    }

}

function enemyFire(enemyShip) {


    var spaceShip = document.getElementById('spaceShip');

    var bullet = document.createElement('img');
    bullet.setAttribute('src', 'img/fireCircle.gif');
    bullet.setAttribute('name', 'enemyBullet');
    bullet.setAttribute('class', 'enemy_bullet');
    bullet.setAttribute('width', fireBall_width + 'px');
    bullet.setAttribute('height', fireBall_height + 'px');

    bullet.style.position = 'absolute';
    bullet.style.left = parseInt(enemyShip.style.left) + 'px';
    bullet.style.top = parseInt(enemyShip.style.top) + 'px';

    bullet.direct_x = parseInt(spaceShip.style.left)
    bullet.direct_y = parseInt(spaceShip.style.top)
    bullet.moveUnit = 5;

    if (parseInt(bullet.style.top) > bullet.direct_y) {

        bullet.moveUnit *= -1;

    }

    document.body.appendChild(bullet);
}

function updateSpeedyAndTrickyBullets() {

    var enemyShips = document.getElementsByName('speedAndTricky');
    var bullets = document.getElementsByName('enemyBullet');

    if (enemyShips.length === 0 && bullets.length === 0) {

        clearInterval(updateSpeedAndTrickyBulletsInterval);

    } else {

        for (var i = 0; i < bullets.length; i++) {

            var bullet_x = parseInt(bullets[i].style.left);
            var bullet_y = parseInt(bullets[i].style.top) + bullets[i].moveUnit;

            var bullet_x = ((bullet_y - parseInt(bullets[i].style.top)) * (bullets[i].direct_x - parseInt(bullets[i].style.left)) / (bullets[i].direct_y - parseInt(bullets[i].style.top))) + bullet_x;

            bullets[i].style.left = bullet_x + 'px';
            bullets[i].style.top = bullet_y + 'px';

        }

    }



}
