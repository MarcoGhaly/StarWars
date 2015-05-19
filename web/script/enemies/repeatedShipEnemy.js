var screenWidth = $(window).width();
var screenHeight = $(window).height();

var repeated_width = 80;
var repeated_height = 50;
var enemyRepeatedShip;
var initMoveFlagR = false;
var reverseMove = false;

// bullet units
var bullet_moveUnitR = 5;
var bullet_widthR = 20;
var bullet_heightR = 30;


var repeatedEnemy_strength = 30;
//setInterval(initEnemyMovementR, 60);
//setInterval(moveRepeatedEnemies, 60);
//setInterval(generateRepeatedBulletsRandomly, 1000);
//setInterval(moveRepeatedBullets, 25);
$(document).ready(function () {
    for (var j = -(screenHeight / 2); j < (0 - repeated_height); j = j + (20 + repeated_height)) {
        for (var i = 300; i < (screenWidth - 300); i = i + (10 + repeated_width)) {
            enemyRepeatedShip = document.createElement('img');
            enemyRepeatedShip.setAttribute('src', 'img/repeatedShip.png');
            enemyRepeatedShip.setAttribute('class', 'enemy');
            enemyRepeatedShip.setAttribute('name', 'repeatedEnemy');
            enemyRepeatedShip.strength = repeatedEnemy_strength;
            enemyRepeatedShip.style.width = repeated_width + 'px';
            enemyRepeatedShip.style.height = repeated_height + 'px';
            enemyRepeatedShip.style.position = 'absolute';
            enemyRepeatedShip.style.left = i + 'px';
            enemyRepeatedShip.style.top = j + 'px';
            document.body.appendChild(enemyRepeatedShip);
        }
    }
});

function initEnemyMovementR() {
    var repeatedEnemies = document.getElementsByName('repeatedEnemy');
    if ((parseInt(repeatedEnemies[0].style.top)) < 0) {
        for (var y = 0; y < repeatedEnemies.length; y++) {
            repeatedEnemies[y].style.top = parseInt(repeatedEnemies[y].style.top) + 5 + 'px';
        }
    } else {
        initMoveFlagR = true;
    }
}
// the Normal movement of the enemies
function moveRepeatedEnemies() {

    var repeatedEnemies1 = document.getElementsByName('repeatedEnemy');

    if ((parseInt(repeatedEnemies1[0].style.left)) < 20) {
        reverseMove = true;
    }

    if ((parseInt(repeatedEnemies1[8].style.left)) > (screenWidth - 80)) {
        reverseMove = false;
    }



    if (initMoveFlagR === true) {

        if (reverseMove === true) {

            for (var c = 0; c < repeatedEnemies1.length; c++) {
                repeatedEnemies1[c].style.left = parseInt(repeatedEnemies1[c].style.left) + 5 + 'px';
            }
        } else {
            for (var d = 0; d < repeatedEnemies1.length; d++) {
                repeatedEnemies1[d].style.left = parseInt(repeatedEnemies1[d].style.left) - 5 + 'px';
            }
        }

        if (reverseMove === false) {
            for (var d = 0; d < repeatedEnemies1.length; d++) {
                repeatedEnemies1[d].style.left = parseInt(repeatedEnemies1[d].style.left) - 5 + 'px';
            }
        } else {
            for (var d = 0; d < repeatedEnemies1.length; d++) {
                repeatedEnemies1[d].style.left = parseInt(repeatedEnemies1[d].style.left) + 5 + 'px';
            }
        }

    }
}

// generate the bullets Randomly 
function generateRepeatedBulletsRandomly() {
    if (initMoveFlagR === true) {
        var repeatedEnemiesS = document.getElementsByName('repeatedEnemy');
        for (var v = 0; v < repeatedEnemiesS.length; v++) {
            if (parseInt(Math.random() * 45) === 0) {
                var repeated_bullet = document.createElement('img');
                repeated_bullet.setAttribute('src', 'img/rocket.png');
                repeated_bullet.setAttribute('name', 'repeatedBullet');
                repeated_bullet.style.width = bullet_widthR + 'px';
                repeated_bullet.style.height = bullet_heightR + 'px';
                repeated_bullet.style.position = 'absolute';
                repeated_bullet.style.left = parseInt(repeatedEnemiesS[v].style.left) + (repeatedEnemiesS[v].width - bullet_widthR) / 2 + 'px';
                repeated_bullet.style.top = parseInt(repeatedEnemiesS[v].style.top) + repeatedEnemiesS[v].height + 'px';
                document.body.appendChild(repeated_bullet);
            }

        }
    }
}

//move bullets 
function moveRepeatedBullets() {
    var repeatedbullets = document.getElementsByName('repeatedBullet');
    for (var i = 0; i < repeatedbullets.length; i++) {
        repeatedbullets[i].style.top = parseInt(repeatedbullets[i].style.top) + bullet_moveUnitR + 'px';
        if (parseInt(repeatedbullets[i].style.top) + repeatedbullets > screenHeight) {
            document.body.removeChild(repeatedbullets[i]);
        }
    }
}



