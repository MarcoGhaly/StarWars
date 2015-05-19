var scence = 0;
var level1_audio = new Audio('audio/level1.mp3');

var backgroundMusicInterval;

setInterval(manageGame, 5000);

$(document).ready(function () {

    level1_audio.play();
    playBackgroundMusic();
    generateUfoEnemy();
    

});

function playBackgroundMusic() {

    backgroundMusicInterval = setInterval(function () {
        level1_audio.play()
    }, 5000);

}

function stopBackgroundMusic() {

    clearInterval(backgroundMusicInterval);

}

function manageGame() {
    if (scence === 0) {

        var enemies = document.getElementsByName('ufo');
        if (enemies.length === 0) {

            var interval = setInterval(generateAsteroids, 500);
            setTimeout(function () {
                clearInterval(interval)
            }, 10000);

            scence = 1;
        }
    } else if (scence === 1) {
        var enemies = document.getElementsByName('asteroid');
        if (enemies.length === 0) {
            generateSpeedyAndTricky();
            scence = 2;
        }

    }
    if (scence === 2) {

        var enemies = document.getElementsByName('speedAndTricky');
        if (enemies.length === 0) {

            var interval = setInterval(generateAsteroids, 300);
            setTimeout(function () {
                clearInterval(interval)
            }, 15000);

            scence = 3;
        }
    }
    else if (scence === 3) {
        var enemies = document.getElementsByName('asteroid');
        if (enemies.length === 0) {
            
            generateBigEnemy();
            scence = 4;
        }
    }
}