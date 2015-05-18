var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var asteroid_moveUnitX = 5;
var asteroid_widthX = 80;
var asteroid_heightX = 80;

// bullet units
var bullet_moveUnit = 10;
var bullet_width = 10;
var bullet_height = 30;

// alawys running functions
setInterval(generateAsteroidsX, 2000);
setInterval(updateAsteroidsX, 50);
setInterval(genarateBullets, 700);
setInterval(updateBullets, 30);


function generateAsteroidsX() {
    var asteroid = document.createElement('img');
    var asteroid2 = document.createElement('img');
    asteroid.setAttribute('src', 'img/spaceship-Sarah.gif');
    asteroid.setAttribute('class', 'enemy');
    asteroid.setAttribute('name', 'ufo');
    asteroid.style.width = asteroid_widthX + 'px';
    asteroid.style.height = asteroid_heightX + 'px';
    asteroid.style.position = 'absolute';
    asteroid.style.left = (screenWidth - parseInt(asteroid.style.width)) / 3 + 'px';
    asteroid.style.top = - asteroid.height + 'px';

    asteroid2.setAttribute('src', 'img/spaceship-Sarah.gif');
    asteroid2.setAttribute('class', 'enemy');
    asteroid2.setAttribute('name', 'ufo');
    asteroid2.style.width = asteroid_widthX + 'px';
    asteroid2.style.height = asteroid_heightX + 'px';
    asteroid2.style.position = 'absolute';
    asteroid2.style.left = (screenWidth - parseInt(asteroid.style.width)) / 3 * 2.5 + 'px';
    asteroid2.style.top = - asteroid.height + 'px';

    asteroid.strength = 10;
    asteroid2.strength = 10;


    document.body.appendChild(asteroid);
    document.body.appendChild(asteroid2);

}

function updateAsteroidsX() {
    asteroids = document.getElementsByName('ufo');
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].style.top = parseInt(asteroids[i].style.top) + asteroid_moveUnitX + 'px';

        if (parseInt(asteroids[i].style.top) > 50)
        {
            asteroids[i].style.left = parseInt(asteroids[i].style.left) - 10 + 'px';
            asteroids[i].style.top = parseInt(asteroids[i].style.top) + 2 + 'px';

        }

        if (parseInt(asteroids[i].style.top) > 170)
        {
            asteroids[i].style.left = parseInt(asteroids[i].style.left) + 20 + 'px';
            asteroids[i].style.top = parseInt(asteroids[i].style.top) + 2 + 'px';

        }
        if (parseInt(asteroids[i].style.top) > 300)
        {
            asteroids[i].style.left = parseInt(asteroids[i].style.left) - 10 + 'px';
            asteroids[i].style.top = parseInt(asteroids[i].style.top) + 2 + 'px';

        }

        if (parseInt(asteroids[i].style.top) > 370)
        {
            asteroids[i].style.left = parseInt(asteroids[i].style.left) - 10 + 'px';
            asteroids[i].style.top = parseInt(asteroids[i].style.top) + 2 + 'px';

        }

    }
}

function genarateBullets() {
    for (var i = 0; i < asteroids.length; i++) {
        var bullet = document.createElement('img');
        bullet.setAttribute('src', 'img/bullet.png');
        bullet.setAttribute('name', 'bulletX');
        bullet.setAttribute('width', bullet_width + 'px');
        bullet.setAttribute('height', bullet_height + 'px');
        bullet.style.position = 'absolute';

        bullet.style.left = parseInt(asteroids[i].style.left) + (asteroids[i].width - bullet_width) / 2 + 'px';
        bullet.style.top = parseInt(asteroids[i].style.top) + asteroids[i].height + 'px';

        document.body.appendChild(bullet);
        audio_weapon.play();
    }
}

function updateBullets() {
    var bullets = document.getElementsByName('bulletX');
    for (var i = 0; i < bullets.length; i++)
    {
        bullets[i].style.top = parseInt(bullets[i].style.top) + bullet_moveUnit + 'px';
        if (parseInt(bullets[i].style.top) + bullet_height < 0) {
            document.body.removeChild(bullets[i]);
        }
    }
}
