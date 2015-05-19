var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var spaceCraftEnimy_moveUnitX = 5;
var spaceCraftEnimy_widthX = 80;
var spaceCraftEnimy_heightX = 80;

// bullet units
var bullet_moveUnit = 10;
var bullet_width = 10;
var bullet_height = 30;

// alawys running functions
var updateAsteroidsXInterval;
var genarateBulletsInterval;
var updateBulletsInterval;

var ufoIntervalsStarted = false;


function generateUfoEnemy(){
    
    setTimeout(generateAsteroidsX, 2000);
    setTimeout(generateAsteroidsX, 4000);
    setTimeout(generateAsteroidsX, 6000);
    setTimeout(generateAsteroidsX, 8000);
    setTimeout(generateAsteroidsX, 10000);
    setTimeout(generateAsteroidsX, 12000);
    
}

function generateAsteroidsX() {
    var spaceCraftEnimy = document.createElement('img');
    var spaceCraftEnimy2 = document.createElement('img');
    spaceCraftEnimy.setAttribute('src', 'img/spaceship-Sarah.gif');
    spaceCraftEnimy.setAttribute('class', 'enemy');
    spaceCraftEnimy.setAttribute('name', 'ufo');
    spaceCraftEnimy.style.width = spaceCraftEnimy_widthX + 'px';
    spaceCraftEnimy.style.height = spaceCraftEnimy_heightX + 'px';
    spaceCraftEnimy.style.position = 'absolute';



//        
//    spaceCraftEnimy.style.left = (screenWidth - parseInt(spaceCraftEnimy.style.width)) / 3 + 'px';
//    spaceCraftEnimy.style.top = -spaceCraftEnimy.height + 'px';
    spaceCraftEnimy.style.left = parseInt(Math.random() *
            (screenWidth - spaceCraftEnimy_widthX * 2) + spaceCraftEnimy_widthX) + 'px';
    spaceCraftEnimy.style.top = -spaceCraftEnimy_heightX + 'px';

    spaceCraftEnimy.strength = 10;


    document.body.appendChild(spaceCraftEnimy);

    // start movement intervals
    if (!ufoIntervalsStarted) {
        updateAsteroidsXInterval = setInterval(updateAsteroidsX, 50);
        genarateBulletsInterval = setInterval(genarateBullets, 700);
        updateBulletsInterval = setInterval(updateBullets, 30);
        ufoIntervalsStarted = true;
    }

}

function updateAsteroidsX() {
    spaceCraftEnimys = document.getElementsByName('ufo');
    
     if(spaceCraftEnimys.length === 0){
        
        // stop all intervals
        clearInterval(updateAsteroidsXInterval);
        clearInterval(genarateBulletsInterval);
        clearInterval(updateBulletsInterval);
        ufoIntervalsStarted = false;
        
    }
    
    
    for (var i = 0; i < spaceCraftEnimys.length; i++) {
        spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + spaceCraftEnimy_moveUnitX + 'px';

        if (parseInt(spaceCraftEnimys[i].style.top) > 50)
        {
            spaceCraftEnimys[i].style.left = parseInt(spaceCraftEnimys[i].style.left) - 10 + 'px';
            spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + 2 + 'px';

        }

        if (parseInt(spaceCraftEnimys[i].style.top) > 170)
        {
            spaceCraftEnimys[i].style.left = parseInt(spaceCraftEnimys[i].style.left) + 20 + 'px';
            spaceCraftEnimys[i].style.top = parseInt(spaceCraftEnimys[i].style.top) + 2 + 'px';

        }
        if (parseInt(spaceCraftEnimys[i].style.top) > 300)
        {
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

function genarateBullets() {
    for (var i = 0; i < spaceCraftEnimys.length; i++) {
        var bullet = document.createElement('img');
        bullet.setAttribute('src', 'img/bullet.png');
        bullet.setAttribute('name', 'bulletX');
        bullet.setAttribute('class', 'enemy_bullet');
        bullet.setAttribute('width', bullet_width + 'px');
        bullet.setAttribute('height', bullet_height + 'px');
        bullet.style.position = 'absolute';

        bullet.style.left = parseInt(spaceCraftEnimys[i].style.left) + (spaceCraftEnimys[i].width - bullet_width) / 2 + 'px';
        bullet.style.top = parseInt(spaceCraftEnimys[i].style.top) + spaceCraftEnimys[i].height + 'px';



        document.body.appendChild(bullet);
        //audio_weapon.play();
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
