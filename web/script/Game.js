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

    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            var horizontal = parseInt(bullets[i].style.left) > parseInt(enemies[j].style.left)
                    && parseInt(bullets[i].style.left) < parseInt(enemies[j].style.left) + enemies[j].width
                    || parseInt(bullets[i].style.left) + bullet_width > parseInt(enemies[j].style.left)
                    && parseInt(bullets[i].style.left) + bullet_width < parseInt(enemies[j].style.left) + enemies[j].width;

            var vertical = parseInt(bullets[i].style.top) > parseInt(enemies[j].style.top)
                    && parseInt(bullets[i].style.top) < parseInt(enemies[j].style.top) + enemies[j].height
                    || parseInt(bullets[i].style.top) + bullet_height > parseInt(enemies[j].style.top)
                    && parseInt(bullets[i].style.top) + bullet_height < parseInt(enemies[j].style.top) + enemies[j].height;

            if (horizontal && vertical) {
                enemies[j].strength--;

                var explosion = document.createElement('div');
//                explosion.setAttribute('class', 'explosion');

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
    }
}