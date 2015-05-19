var screenWidth = $(window).width();
var screenHeight = $(window).height();

var spaceShip_moveUnit = 10;

var audio_weaponS = new Audio('audio/weapon.wav');
audio_weaponS.volume = 0.2;

// keys uni-code
var key_left = 37;
var key_right = 39;
var key_up = 38;
var key_down = 40;
var key_space = 32;

// bullet units
var bullet_moveUnit = 20;
var bullet_width = 10;
var bullet_height = 30;

var spaceShip;

// space directions flags
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

// always running functions 
setInterval(move, 25);
setInterval(updateBullets, 25);

$(document).ready(function () {

    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    spaceShip = document.getElementById('spaceShip');

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
        bullet.setAttribute('src', 'img/bullet.png');
        bullet.setAttribute('name', 'bullet');
        bullet.setAttribute('width', bullet_width + 'px');
        bullet.setAttribute('height', bullet_height + 'px');

        bullet.style.position = 'absolute';
        bullet.style.left = parseInt(spaceShip.style.left) + (spaceShip.width - bullet_width) / 2 + 'px';
        bullet.style.top = parseInt(spaceShip.style.top) - bullet_height + 'px';

        document.body.appendChild(bullet);
        audio_weaponS.play();
    } else {
        audio_weaponS.pause();
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
