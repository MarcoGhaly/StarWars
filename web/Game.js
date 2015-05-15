var screenWidth = $(window).width();
var screenHeight = $(window).height();

var spaceShip_moveUnit = 10;

var bullet_moveUnit = 10;
var bullet_width = 10;
var bullet_height = 30;

var asteroid_moveUnit = 8;
var asteroid_width = 100;
var asteroid_height = 100;

var audio_weapon = new Audio('weapon.wav');

var key_left = 37;
var key_right = 39;
var key_up = 38;
var key_down = 40;

var key_space = 32;

var spaceShip;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

setInterval(move, 25);
setInterval(updateBullets, 25);
setInterval(generateAsteroids, 1000);
setInterval(updateAsteroids, 25);
setInterval(detectCollisions, 25);

$(document).ready(function () {
    var body = document.getElementsByTagName('body')[0];
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    spaceShip = document.getElementById('spaceShip');

//    alert('Window: ' + screenHeight + '\n' + 'Space Ship: ' + spaceShip.height);

    spaceShip.style.position = 'absolute';
    spaceShip.style.left = (screenWidth - spaceShip.width) / 2 + 'px';
    spaceShip.style.top = screenHeight - spaceShip.height + 'px';
});

function keyDown(e) {
    setKey(e.keyCode, true);
}

function keyUp(e) {
    setKey(e.keyCode, false);
}

function setKey(keyCode, pressed) {
    if (keyCode === key_left) {
        leftPressed = pressed;
    } else if (keyCode === key_right) {
        rightPressed = pressed;
    }

    if (keyCode === key_up) {
        upPressed = pressed;
    } else if (keyCode === key_down) {
        downPressed = pressed;
    }

    if (keyCode === key_space) {
        spacePressed = pressed;
    }
}

function move() {
    if (leftPressed) {
        var left = parseInt(spaceShip.style.left) - spaceShip_moveUnit;
        if (left > 0) {
            spaceShip.style.left = left + 'px';
        }
    } else if (rightPressed) {
        var left = parseInt(spaceShip.style.left) + spaceShip_moveUnit;
        if (left + spaceShip.width < screenWidth) {
            spaceShip.style.left = left + 'px';
        }
    }

    if (upPressed) {
        var top = parseInt(spaceShip.style.top) - spaceShip_moveUnit;
        if (top > 0) {
            spaceShip.style.top = top + 'px';
        }
    } else if (downPressed) {
        var top = parseInt(spaceShip.style.top) + spaceShip_moveUnit;
        if (top + spaceShip.height < screenHeight) {
            spaceShip.style.top = top + 'px';
        }
    }

    if (spacePressed) {
        var bullet = document.createElement('img');
        bullet.setAttribute('src', 'bullet.png');
        bullet.setAttribute('name', 'bullet');
        bullet.setAttribute('width', bullet_width + 'px');
        bullet.setAttribute('height', bullet_height + 'px');

        bullet.style.position = 'absolute';
        bullet.style.left = parseInt(spaceShip.style.left) + (spaceShip.width - bullet_width) / 2 + 'px';
        bullet.style.top = parseInt(spaceShip.style.top) - bullet_height + 'px';

        document.body.appendChild(bullet);
        audio_weapon.play();
    } else {
        audio_weapon.pause();
    }
}

function updateBullets() {
    var bullets = document.getElementsByName('bullet');
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].style.top = parseInt(bullets[i].style.top) - bullet_moveUnit + 'px';
        if (parseInt(bullets[i].style.top) + bullet_height < 0) {
            document.body.removeChild(bullets[i]);
        }
    }
}

function generateAsteroids() {
    var asteroid = document.createElement('img');
    asteroid.setAttribute('src', 'asteroid.png');
    asteroid.setAttribute('name', 'asteroid');
    asteroid.setAttribute('width', asteroid_width + 'px');
    asteroid.setAttribute('height', asteroid_height + 'px');

    asteroid.style.position = 'absolute';

    if (parseInt(Math.random() * 4) === 0) {
        asteroid.style.left = -asteroid_width + 'px';
        asteroid.style.top = parseInt(Math.random() * (screenHeight / 3)) + 'px';
    } else {
        asteroid.style.left = parseInt(Math.random() * (screenWidth / 2)) + 'px';
        asteroid.style.top = -asteroid_height + 'px';
    }
    document.body.appendChild(asteroid);
}

function updateAsteroids() {
    var asteroids = document.getElementsByName('asteroid');
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].style.top = parseInt(asteroids[i].style.top) + asteroid_moveUnit + 'px';
        asteroids[i].style.left = parseInt(asteroids[i].style.left) + asteroid_moveUnit + 'px';
        if (parseInt(asteroids[i].style.top) > screenHeight) {
            document.body.removeChild(asteroids[i]);
        }
    }
}

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