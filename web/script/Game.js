var screenWidth = $(window).width();
var screenHeight = $(window).height();
var frames = [];

var explosion_audio = new Audio('audio/explosion1.mp3');

var startButtonBlinkInterval;

$(document).ready(function () {

    // move background
    var element = document.querySelector('#panning');
    var panning = new Motio(element, {
        fps: 200, // Frames per second. More fps = higher CPU load.
        speedY: 110 // Negative horizontal speed = panning to left.
    })
    panning.play(); // start animation

    startButtonBlinkInterval = setInterval(function () {
        $("#startButton").fadeIn(1000).fadeOut(1000)
    }, 1000);

});

function beginGame() {

    // clear screen
    document.body.removeChild(document.getElementById("startScreen"));
    document.body.removeChild(document.getElementById("startButton"));


    for (var i = 0; i < 48; i++) {
        frames[i] = i;
    }

    setInterval(detectCollisions, 50);

    // life bar
    putLifeBar();


    // score bar
    var score = document.createElement("span");
    score.setAttribute("id", "score");
    score.style.color = "white";
    score.style.fontSize = 22 + "px";
    score.innerHTML = "200";
    document.getElementById("score_bar").appendChild(score);


    // make tries bar visible
    document.getElementById("try_bar").style.visibility = "visible";

    generateSpaceShip();

    beginLevel1();



}

function putLifeBar() {

    for (var i = 0; i < 5; i++) {
        var heart = document.createElement("img");
        heart.setAttribute("name", "life");
        heart.setAttribute("width", "20");
        heart.setAttribute("height", "20");
        heart.setAttribute("src", "img/heart.png");
        heart.style.marginRight = "5px";
        document.getElementById("life_bar").appendChild(heart);
    }

}

function playExplosionSound() {

    explosion_audio.play();
}

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

                    // update score
                    updateScore(100);

                    // play explosion sound
                    playExplosionSound();


                    explosion.style.backgroundImage = 'url(img/explosion_medium.png)';
                    explosion.style.left = parseInt(enemies[j].style.left) + 'px';
                    explosion.style.top = parseInt(enemies[j].style.top) + 'px';
                    explosion.style.width = '128px';
                    explosion.style.height = '128px';
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

        // Collisions with enemies
        var spaceShip = document.getElementById('spaceShip');
        if (isColliding(spaceShip, enemies[j])) {

            destroySpaceShip();
        }
    }

    var enemyBullets = document.getElementsByClassName('enemy_bullet');
    for (var i = 0; i < enemyBullets.length; i++) {
        if (isColliding(enemyBullets[i], spaceShip)) {

            // reduce space life
            reduceLife();

            var explosion = document.createElement('div');
            explosion.style.backgroundImage = 'url(img/explosion_hit.png)';
            explosion.style.position = 'absolute';

            explosion.style.left = parseInt(enemyBullets[i].style.left) + 'px';
            explosion.style.top = parseInt(enemyBullets[i].style.top) + 'px';
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

function destroySpaceShip() {

    playExplosionSound();

    reduceTries();

    var spaceShip = document.getElementById('spaceShip');

    var explosion = document.createElement('div');
    explosion.style.backgroundImage = 'url(img/explosion_medium.png)';
    explosion.style.position = 'absolute';

    explosion.style.left = parseInt(spaceShip.style.left) + 'px';
    explosion.style.top = parseInt(spaceShip.style.top) + 'px';
    explosion.style.width = '128px';
    explosion.style.height = '128px';
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

function reduceLife() {

    var lifes = document.getElementsByName("life");
    document.getElementById("life_bar").removeChild(lifes[0]);
    if (lifes.length === 0)
        destroySpaceShip();

}

function increaseLife() {

    var lifes = document.getElementsByName("life");


    if (lifes.length < 5) {

        var heart = document.createElement("img");
        heart.setAttribute("name", "life");
        heart.setAttribute("width", "20");
        heart.setAttribute("height", "20");
        heart.setAttribute("src", "img/heart.png");
        heart.style.marginRight = "5px";
        document.getElementById("life_bar").appendChild(heart);

    }
}


function isColliding(smallerObject, biggerObject) {
    var horizontal = parseInt(smallerObject.style.left) > parseInt(biggerObject.style.left)
            && parseInt(smallerObject.style.left) < parseInt(biggerObject.style.left) + biggerObject.width
            || parseInt(smallerObject.style.left) + smallerObject.width > parseInt(biggerObject.style.left)
            && parseInt(smallerObject.style.left) + smallerObject.width < parseInt(biggerObject.style.left) + biggerObject.width;

    var vertical = parseInt(smallerObject.style.top) > parseInt(biggerObject.style.top)
            && parseInt(smallerObject.style.top) < parseInt(biggerObject.style.top) + biggerObject.height
            || parseInt(smallerObject.style.top) + smallerObject.height > parseInt(biggerObject.style.top)
            && parseInt(smallerObject.style.top) + smallerObject.height < parseInt(biggerObject.style.top) + biggerObject.height;

    if (horizontal && vertical) {
        return true;
    } else {
        return false;
    }
}

function updateScore(increaseScore) {

    var score = document.getElementById("score");
    score.innerHTML = parseInt(score.innerHTML) + increaseScore;

}

function reduceTries() {

    var tryNumber = document.getElementById("tryNumber");

    if (parseInt(tryNumber.innerHTML) > 0) {

        tryNumber.innerHTML = parseInt(tryNumber.innerHTML) - 1;
        removeAllLifes();
        setTimeout(function () {
            generateSpaceShip(), putLifeBar()
        }, 2000);
    } else if (parseInt(tryNumber.innerHTML) === 0) {

        putGameOverScreen();
        stopLevel1();
        stopBackgroundMusic();

    }



}

function putGameOverScreen() {

    var screen = document.createElement("img");
    screen.setAttribute("id", "endScreen");
    screen.style.paddingLeft = 330 + "px";
    screen.style.paddingTop = 130 + "px";
    screen.style.marginLeft = 110 + "px";
    screen.setAttribute("src", "img/gameover.png");
    document.body.appendChild(screen);

}

function putHappyEndScreen() {

    var score = document.getElementById("score");
    
    document.body.innerHTML = "<div style=\"position: absolute ;left:350px; top:150px\" id=\"happyEnd\"><p style=\"color: white; font-size: 50px\">Congratulations, you are alive!</p><p style=\"color: white; font-size: 50px; margin-left:80px;\">Score: " + score.innerHTML + "<span id=\"finalScore\"></span></p></div>";

    var happyEnd = document.getElementById("happyEnd");
    var step = 1;
    var theInterval;

    setTimeout(function () {

        theInterval = setInterval(function () {

            if (step === 1) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 2;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Game Makers</p>";
                }

            } else if (step === 2) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 3;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Marco Ghaly</p><img style=\"top:25px; left:450px; position: absolute\"  src=\"img/dragon_right.gif\" width=\"100px\" height=\"100px\" />";
                }

            } else if (step === 3) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 4;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Mohamed Gaber</p><img style=\"top:0px; left:500px; position: absolute\"  src=\"img/pirate.gif\" width=\"170px\" height=\"170px\" />";
                }

            } else if (step === 4) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 5;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Mohamed Elahmady</p><img style=\"top:50px; left:600px; position: absolute\"  src=\"img/bigenemy.png\" width=\"100px\" height=\"60px\" />";
                }

            } else if (step === 5) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 6;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Ahmed Ali</p><img style=\"top:30px; left:430px; position: absolute\"  src=\"img/ewess_enemy.png\" width=\"150px\" height=\"90px\" />";
                }

            } else if (step === 6) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 7;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Sarah Aabed</p><img style=\"top:40px; left:450px; position: absolute\"  src=\"img/spaceship-Sarah.gif\" width=\"100px\" height=\"70px\" />";
                }

            } else if (step === 7) {

                if (parseInt(happyEnd.style.top) < -200) {
                    step = 8;
                    happyEnd.style.top = screenHeight + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 50px; margin-left:150px\">Ahmed Adel</p><img style=\"top:60px; left:450px; position: absolute\"  src=\"img/repeatedShip.png\" width=\"80px\" height=\"40px\" />";
                }

            } else if (step === 8) {

                if (parseInt(happyEnd.style.top) < -200) {

                    happyEnd.style.top = screenHeight - 550 + "px";
                    happyEnd.innerHTML = "<p style=\"color: white; font-size: 100px; margin-left:150px\">The End</p>";
                    clearInterval(theInterval);
                }
            }

            happyEnd.style.top = parseInt(happyEnd.style.top) - 2 + "px";

        }, 10);


    }, 2000);



}


function removeAllLifes() {
    var lifes = document.getElementsByName("life");
    var len = lifes.length;
    for (i = 0; i < len; i++) {
        document.getElementById("life_bar").removeChild(lifes[0]);
    }
}
