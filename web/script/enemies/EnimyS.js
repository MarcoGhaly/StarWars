var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var spaceCraftEnimy_moveUnitX = 5;
var spaceCraftEnimy_widthX = 80;
var spaceCraftEnimy_heightX = 80;

// bullet units
var bullet_moveUnit = 10;
var bullet_width = 20;
var bullet_height = 30;

// alawys running functions
setInterval(generateAsteroidsX, 1000);
setInterval(updateAsteroidsX, 50);
setInterval(genarateBullets, 1500);
setInterval(updateBullets, 30);


function generateAsteroidsX() {
    var spaceCraftEnimy = document.createElement('img');
    spaceCraftEnimy.setAttribute('src', 'img/spaceship-Sarah.gif');
    spaceCraftEnimy.setAttribute('class', 'enemy');
    spaceCraftEnimy.setAttribute('name', 'ufo');
    spaceCraftEnimy.style.width = spaceCraftEnimy_widthX + 'px';
    spaceCraftEnimy.style.height = spaceCraftEnimy_heightX + 'px';
    spaceCraftEnimy.style.position = 'absolute';

    spaceCraftEnimy.style.left = parseInt(Math.random() *
            (screenWidth - spaceCraftEnimy_widthX * 2) + spaceCraftEnimy_widthX) + 'px';
    spaceCraftEnimy.style.top = -spaceCraftEnimy_heightX + 'px';

    spaceCraftEnimy.strength = 10;

    document.body.appendChild(spaceCraftEnimy);
}

function updateAsteroidsX() {
    spaceCraftEnimys = document.getElementsByName('ufo');
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
    }
}

function genarateBullets() {
    for (var i = 0; i < spaceCraftEnimys.length; i++) {
        var bullet = document.createElement('img');
        bullet.setAttribute('src', 'img/bulletS.png');
        bullet.setAttribute('name', 'bulletX');
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
