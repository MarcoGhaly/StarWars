
var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var asteroid_moveUnit = 8;
var asteroid_width = 100;
var asteroid_height = 100;

// alawys running functions
setInterval(generateAsteroids, 1000);
setInterval(updateAsteroids, 25);

function generateAsteroids() {
    var asteroid = document.createElement('img');
    asteroid.setAttribute('src', 'img/asteroid.png');
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