
var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var asteroid_moveUnit = 6;
var asteroid_width = 75;
var asteroid_height = 75;
var asteroid_strength = 30;

// alawys running functions
//var generateAsteroidsInterval = setInterval(generateAsteroids, 500);
var updateAsteroidsInterval;

var updateAstroidIntervalStarted = false;

function generateAsteroids() {
    var asteroid = document.createElement('img');
    asteroid.setAttribute('src', 'img/asteroid.png');
    asteroid.setAttribute('class', 'enemy');
    asteroid.setAttribute('name', 'asteroid');
    asteroid.style.width = asteroid_width + 'px';
    asteroid.style.height = asteroid_height + 'px';
    asteroid.style.position = 'absolute';

    if (parseInt(Math.random() * 3) === 0) {
        asteroid.style.left = -asteroid_width + 'px';
        asteroid.style.top = parseInt(Math.random() * (screenHeight / 2)) + 'px';
    } else {
        asteroid.style.left = parseInt(Math.random() * (screenWidth * 2 / 3)) + 'px';
        asteroid.style.top = -asteroid_height + 'px';
    }
    asteroid.strength = asteroid_strength;
    document.body.appendChild(asteroid);

    if (!updateAstroidIntervalStarted) {
        // start update interval
        updateAsteroidsInterval = setInterval(updateAsteroids, 30);
        updateAstroidIntervalStarted = true;
    }
}

function updateAsteroids() {
    var asteroids = document.getElementsByName('asteroid');

    if (asteroids.length === 0) {
        clearInterval(updateAsteroidsInterval);
        updateAstroidIntervalStarted = false;
    }
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].style.top = parseInt(asteroids[i].style.top) + asteroid_moveUnit + 'px';
        asteroids[i].style.left = parseInt(asteroids[i].style.left) + asteroid_moveUnit * 1.5 + 'px';
        if (parseInt(asteroids[i].style.top) > screenHeight) {
            document.body.removeChild(asteroids[i]);
        }
    }
}
