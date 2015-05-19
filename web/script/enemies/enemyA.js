var screenWidth = $(window).width();
var screenHeight = $(window).height();

var enemyShip;

var initMoveFlag = false;
var enemy_strength = 30;

setInterval(initEnemyMovement, 50);
setInterval(moveEnemyRandomly, 20);

$(document).ready(function () {
    enemyShip = document.getElementById('enemyA');
    enemyShip.style.position = 'absolute';
    enemyShip.style.left = (screenWidth - enemyShip.width) / 2 + 'px';
    enemyShip.style.top = (0 - enemyShip.height) + 'px';
    enemyShip.setAttribute('class', 'enemy');
    enemyShip.strength = enemy_strength;
});


    var bullet ;
    var space ;

    function enemyABullet(){
        space = getElementById("spaceShip");    
        bullet = document.createElement("enemyABullet");
        bullet.setAttribute("src","img/bullet.png");
        bullet.setAttribute("name","enemyABulletName");
        bullet.style.position = "absolute";
        bullet.style.left = enemyShip.style.left;
        bullet.style.top = enemyShip.style.top;
        space.appendChild("enemyABullet"); 
}

function initEnemyMovement() {
//    enemyABullet();
    if ((parseInt(enemyShip.style.top)) < 25) {
        enemyShip.style.top = parseInt(enemyShip.style.top) + 5 + 'px';
    } else {
        initMoveFlag = true;
    }
}

function moveEnemyRandomly() {
    if((parseInt(enemyShip.style.left)) < screenWidth){
        x = parseInt(enemyShip.style.left) + 3;
        y = 50 * Math.sin( x  * 0.05)  + 50;    
    }else {
        x = 20;
        y = 50 * Math.sin( x  * 0.05)  + 50;            
    }
    if (initMoveFlag === true) {
        enemyShip.style.left = x + 'px';
        enemyShip.style.top = y + 'px';
    }
    

    
    
    
// move bullet >> not completed ! 
    
    setInterval(moveBullet,50);

function moveBullet(){
    var x = bullet.style.left - space.style.left;
    var y = bullet.style.top - space.style.top;
    bullet.style.left = x ; 
    bullet.style.top = y ; 
}


}
