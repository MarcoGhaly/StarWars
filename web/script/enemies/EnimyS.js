var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var spaceCraftEnimy_moveUnitX = 5;
var spaceCraftEnimy_widthX = 80;
var spaceCraftEnimy_heightX = 80;

// bullet units
var bullet_moveUnit = 15;
var bullet_widthX = 20;
var bullet_heightX = 30;

// alawys running functions
var updateAsteroidsXInterval;
var genarateBulletsInterval;
var updateBulletsInterval;

var ufoIntervalsStarted = false;


function generateUfoEnemy() {
    setTimeout(generateAsteroidsX, 2000);
    setTimeout(generateAsteroidsX, 4000);
    setTimeout(generateAsteroidsX, 6000);
    setTimeout(generateAsteroidsX, 8000);
    setTimeout(generateAsteroidsX, 10000);
    setTimeout(generateAsteroidsX, 12000);
}

function generateAsteroidsX() {
    var spaceCraftEnimy = document.createElement('img');
    spaceCraftEnimy.setAttribute('src', 'img/spaceship-Sarah.gif');
    spaceCraftEnimy.setAttribute('class', 'enemy');
    spaceCraftEnimy.setAttribute('name', 'ufo');
    spaceCraftEnimy.style.width = spaceCraftEnimy_widthX + 'px';
    spaceCraftEnimy.style.height = spaceCraftEnimy_heightX + 'px';
    spaceCraftEnimy.style.position = 'absolute';

    spaceCraftEnimy.style.left = parseInt(Math.random() *
            (screenWidth - spaceCraftEnimy_widthX * 4) + spaceCraftEnimy_widthX * 2) + 'px';
    spaceCraftEnimy.style.top = -spaceCraftEnimy_heightX + 'px';

    spaceCraftEnimy.strength = 10;

    document.body.appendChild(spaceCraftEnimy);

    // start movement intervals
    if (!ufoIntervalsStarted) {
        updateAsteroidsXInterval = setInterval(updateAsteroidsX, 50);
        genarateBulletsInterval = setInterval(genarateBullets, 1500);
        updateBulletsInterval = setInterval(updateBullets, 50);
        ufoIntervalsStarted = true;
    }
}

function updateAsteroidsX() {
    spaceCraftEnimys = document.getElementsByName('ufo');

    if (spaceCraftEnimys.length === 0) {
        // stop all intervals
        clearInterval(updateAsteroidsXInterval);
        clearInterval(genarateBulletsInterval);
        ufoIntervalsStarted = false;
    } else {
        for (var i = 0; i < spaceCraftEnimys.length; i++) {
            spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + spaceCraftEnimy_moveUnitX + 'px';

            if (parseInt(spaceCraftEnimys[i].style.top) > 50) {
                spaceCraftEnimys[i].style.left = parseInt(spaceCraftEnimys[i].style.left) - 10 + 'px';
                spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + 2 + 'px';
            }

            if (parseInt(spaceCraftEnimys[i].style.top) > 170) {
                spaceCraftEnimys[i].style.left = parseInt(spaceCraftEnimys[i].style.left) + 20 + 'px';
                spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + 2 + 'px';
            }

            if (parseInt(spaceCraftEnimys[i].style.top) > 300) {
                spaceCraftEnimys[i].style.left = parseInt(spaceCraftEnimys[i].style.left) - 10 + 'px';
                spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + 2 + 'px';
            }

            if (parseInt(spaceCraftEnimys[i].style.top) > 370) {
                spaceCraftEnimys[i].style.left = parseInt(spaceCraftEnimys[i].style.left) - 10 + 'px';
                spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + 2 + 'px';
            }

            if (parseInt(spaceCraftEnimys[i].style.top) > screenHeight) {
                document.body.removeChild(spaceCraftEnimys[i]);
            }
        }
    }
}

function genarateBullets() {
    for (var i = 0; i < spaceCraftEnimys.length; i++) {
        var bullet = document.createElement('img');
        bullet.setAttribute('src', 'img/bulletS.png');
        bullet.setAttribute('name', 'bulletX');
        bullet.setAttribute('class', 'enemy_bullet');
        bullet.setAttribute('width', bullet_widthX + 'px');
        bullet.setAttribute('height', bullet_heightX + 'px');
        bullet.style.position = 'absolute';

        bullet.style.left = parseInt(spaceCraftEnimys[i].style.left) + (spaceCraftEnimys[i].width - bullet_widthX) / 2 + 'px';
        bullet.style.top = parseInt(spaceCraftEnimys[i].style.top) + spaceCraftEnimys[i].height + 'px';

        document.body.appendChild(bullet);
    }
}

function updateBullets() {
    spaceCraftEnimys = document.getElementsByName('ufo');
    var bullets = document.getElementsByName('bulletX');

    if (spaceCraftEnimys.length === 0 && bullets.length === 0) {
        clearInterval(updateBulletsInterval);
    } else {
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnit + 'px';
            if (parseInt(bullets[i].style.top) + bullet_heightX < 0) {
                document.body.removeChild(bullets[i]);
            }
        }
    }
}
