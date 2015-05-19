var screenWidth = $(window).width();
var screenHeight = $(window).height();
var frames = [];

setInterval(detectCollisions, 50);

$(document).ready(function () {
    var body = document.getElementsByTagName('body')[0];

    for (var i = 0; i < 48; i++) {
        frames[i] = i;
    }


    // life bar
    for (var i = 0; i < 5; i++) {
        var heart = document.createElement("img");
        heart.setAttribute("name", "life");
        heart.setAttribute("width", "20");
        heart.setAttribute("height", "20");
        heart.setAttribute("src", "img/heart.png");
        heart.style.marginRight = "5px";
        document.getElementById("life_bar").appendChild(heart);
    }
    
    // score bar
    var score = document.createElement("span");
    score.setAttribute("id", "score");
    score.style.color="white";
    score.style.fontSize = 22+"px";
    score.innerHTML="0";
    document.getElementById("score_bar").appendChild(score);
        

});

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

    var spaceShip = document.getElementById('spaceShip');

    var explosion = document.createElement('div');
    explosion.style.backgroundImage = 'url(img/explosion.png)';
    explosion.style.position = 'absolute';

    explosion.style.left = parseInt(spaceShip.style.left) + 'px';
    explosion.style.top = parseInt(spaceShip.style.top) + 'px';
    explosion.style.width = '256px';
    explosion.style.height = '256px';
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

function updateScore(increaseScore){
    
    var score = document.getElementById("score");
    score.innerHTML = parseInt(score.innerHTML) + increaseScore;
    
}