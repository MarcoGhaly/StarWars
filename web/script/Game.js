var screenWidth = $(window).width();
var screenHeight = $(window).height();

setInterval(detectCollisions, 25);

$(document).ready(function () {
    var body = document.getElementsByTagName('body')[0];
   
});

function detectCollisions() {
    var bullets = document.getElementsByName('bullet');
    var asteroids = document.getElementsByName('asteroid');
    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < asteroids.length; j++) {
            var horizontal = parseInt(bullets[i].style.left) > parseInt(asteroids[j].style.left)
                    && parseInt(bullets[i].style.left) < parseInt(asteroids[j].style.left) + asteroid_width
                    || parseInt(bullets[i].style.left) + bullet_width > parseInt(asteroids[j].style.left)
                    && parseInt(bullets[i].style.left) + bullet_width < parseInt(asteroids[j].style.left) + asteroid_width;

            var vertical = parseInt(bullets[i].style.top) > parseInt(asteroids[j].style.top)
                    && parseInt(bullets[i].style.top) < parseInt(asteroids[j].style.top) + asteroid_height
                    || parseInt(bullets[i].style.top) + bullet_height > parseInt(asteroids[j].style.top)
                    && parseInt(bullets[i].style.top) + bullet_height < parseInt(asteroids[j].style.top) + asteroid_height;

            if (horizontal && vertical) {
                document.body.removeChild(bullets[i]);
                document.body.removeChild(asteroids[j]);
            }
        }
    }
}