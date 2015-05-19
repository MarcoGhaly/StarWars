var scence = 0;

setInterval(manageGame, 50);

$(document).ready(function () {
    generateAsteroidsX();
});

//function manageGame() {
//    if (scence === 0) {
//        var enemies = document.getElementsByName('ufo');
//        if (enemies.length === 0) {
//            generateEnemy();
//            scence = 1;
//        }
//    } else if (scence === 1) {
//        var enemies = document.getElementsByName('speedAndTricky');
//        if (enemies.length === 0) {
//            generateEnemy();
//            scence = 1;
//        }
//    }
//}