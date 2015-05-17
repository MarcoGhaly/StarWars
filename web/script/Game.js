var screenWidth = $(window).width();
var screenHeight = $(window).height();
var frames = [];

setInterval(detectCollisions, 50);

$(document).ready(function () {
    var body = document.getElementsByTagName('body')[0];

    for (var i = 0; i < 48; i++) {
        frames[i] = i;
    }
});

function detectCollisions() {
    var bullets = document.getElementsByName('bullet');
    var enemies = document.getElementsByClassName('enemy');

    for (var j = 0; j < enemies.length; j++) {
        for (var i = 0; i < bullets.length; i++) {
            // Collisions with bullets
            if (isColliding(bullets[i], enemies[j])) {
                enemies[j].strength--;

                var explosion = document.createElement('div');
                explosion.style.position = 'absolute';
                document.body.appendChild(explosion);

                var explosion_fps;

                if (enemies[j].strength === 0) {
                    explosion.style.backgroundImage = 'url(img/explosion.png)';
                    explosion.style.left = parseInt(enemies[j].style.left) + 'px';
                    explosion.style.top = parseInt(enemies[j].style.top) + 'px';
                    explosion.style.width = '256px';
                    explosion.style.height = '256px';
                    explosion_fps = 50;

                    document.body.removeChild(enemies[j]);
                } else {
                    explosion.style.backgroundImage = 'url(img/explosion_hit.png)';
                    explosion.style.left = parseInt(bullets[i].style.left) + 'px';
                    explosion.style.top = parseInt(bullets[i].style.top) + 'px';
                    explosion.style.width = '25px';
                    explosion.style.height = '25px';
                    explosion_fps = 150;
                }

                jQuery(explosion).animateSprite({
                    fps: explosion_fps,
                    animations: {
                        explode: frames
                    },
                    loop: false,
                    complete: function () {
                        document.body.removeChild(explosion);
                    }
                });

                document.body.removeChild(bullets[i]);
            }
        }

        // Collisions with bullets
        var spaceShip = document.getElementById('spaceShip');
        if (isColliding(spaceShip, enemies[j])) {
            var explosion = document.createElement('div');
            explosion.style.backgroundImage = 'url(img/explosion.png)';
            explosion.style.position = 'absolute';

            explosion.style.left = parseInt(enemies[j].style.left) + 'px';
            explosion.style.top = parseInt(enemies[j].style.top) + 'px';
            explosion.style.width = '256px';
            explosion.style.height = '256px';
            explosion_fps = 50;

            document.body.appendChild(explosion);

            jQuery(explosion).animateSprite({
                fps: explosion_fps,
                animations: {
                    explode: frames
                },
                loop: false,
                complete: function () {
                    document.body.removeChild(explosion);
                }
            });

            document.body.removeChild(spaceShip);
        }
    }

    var enemyBullets = document.getElementsByName('enemyBullet');
    for (var i = 0; i < bullets.length; i++) {
        if (isColliding(spaceShip, enemyBullets[i])) {
            var explosion = document.createElement('div');
            explosion.style.backgroundImage = 'url(img/explosion_hit.png)';
            explosion.style.position = 'absolute';
            
            explosion.style.left = parseInt(bullets[i].style.left) + 'px';
            explosion.style.top = parseInt(bullets[i].style.top) + 'px';
            explosion.style.width = '25px';
            explosion.style.height = '25px';
            explosion_fps = 150;

            document.body.appendChild(explosion);

            jQuery(explosion).animateSprite({
                fps: explosion_fps,
                animations: {
                    explode: frames
                },
                loop: false,
                complete: function () {
                    document.body.removeChild(explosion);
                }
            });

            document.body.removeChild(enemyBullets[i]);
        }
    }
}

function isColliding(firstObject, secondObject) {
    var horizontal = parseInt(firstObject.style.left) > parseInt(secondObject.style.left)
            && parseInt(firstObject.style.left) < parseInt(secondObject.style.left) + secondObject.width
            || parseInt(firstObject.style.left) + firstObject.width > parseInt(secondObject.style.left)
            && parseInt(firstObject.style.left) + firstObject.width < parseInt(secondObject.style.left) + secondObject.width;

    var vertical = parseInt(firstObject.style.top) > parseInt(secondObject.style.top)
            && parseInt(firstObject.style.top) < parseInt(secondObject.style.top) + secondObject.height
            || parseInt(firstObject.style.top) + firstObject.height > parseInt(secondObject.style.top)
            && parseInt(firstObject.style.top) + firstObject.height < parseInt(secondObject.style.top) + secondObject.height;

    if (horizontal && vertical) {
        return true;
    } else {
        return false;
    }
}