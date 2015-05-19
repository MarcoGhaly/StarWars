var screenWidth = $(window).width();
var screenHeight = $(window).height();

var audio_dragon = new Audio('audio/dragon.wav');

var DIRECTION_LEFT = -1;
var DIRECTION_RIGHT = 1;

var dragon_moveUnitX = 10;
var dragon_moveUnitY = 1;
var dragon_width = 250;
var dragon_height = 250;
var dragon_strength = 200;

var flame_moveUnitX = 5;
var flame_moveUnitY = 5;
var flame_width = 50;
var flame_height = 100;

var interval_updateDragons;
var interval_generateFlames;
var interval_updateFlames;

function generateDragon() {
    var dragon = document.createElement('img');
    dragon.setAttribute('src', 'img/dragon_right.gif');
    dragon.setAttribute('class', 'enemy');
    dragon.setAttribute('name', 'dragon');
    dragon.style.width = dragon_width + 'px';
    dragon.style.height = dragon_height + 'px';
    dragon.style.position = 'absolute';

    dragon.style.left = -dragon_width + 'px';
    dragon.style.top = -dragon_height / 4 + 'px';

    dragon.strength = dragon_strength;
    dragon.direction = DIRECTION_LEFT;

    document.body.appendChild(dragon);

    interval_updateDragons = setInterval(updateDragons, 50);
    interval_generateFlames = setInterval(generateFlames, 1000);
    interval_updateFlames = setInterval(updateFlames, 50);
}

function updateDragons() {
    var dragons = document.getElementsByName('dragon');

    if (dragons.length === 0) {
        clearInterval(interval_updateDragons);
        clearInterval(interval_generateFlames);
    } else {
        for (var i = 0; i < dragons.length; i++) {
            dragons[i].style.top = parseInt(dragons[i].style.top) + dragon_moveUnitY + 'px';
            dragons[i].style.left = parseInt(dragons[i].style.left) + dragon_moveUnitX * 1.5 * dragons[i].direction + 'px';

            if (dragons[i].direction === DIRECTION_LEFT && parseInt(dragons[i].style.left) < 0) {
                dragons[i].setAttribute('src', 'img/dragon_right.gif');
                dragons[i].direction = DIRECTION_RIGHT;
            } else if (dragons[i].direction === DIRECTION_RIGHT && parseInt(dragons[i].style.left) + dragons[i].width > screenWidth) {
                dragons[i].setAttribute('src', 'img/dragon_left.gif');
                dragons[i].direction = DIRECTION_LEFT;
            }

            if (parseInt(dragons[i].style.top) > screenHeight) {
                document.body.removeChild(dragons[i]);
            }
        }
    }
}

function generateFlames() {
    var dragons = document.getElementsByName('dragon');
    for (var i = 0; i < dragons.length; i++) {
        var flame = document.createElement('img');

        flame.setAttribute('class', 'enemy_bullet');
        flame.setAttribute('name', 'flame');
        flame.setAttribute('width', flame_width + 'px');
        flame.setAttribute('height', flame_height + 'px');

        flame.style.position = 'absolute';

        if (dragons[i].direction === DIRECTION_LEFT) {
            flame.style.left = parseInt(dragons[i].style.left) - 20 + 'px';
            flame.setAttribute('src', 'img/flame_left.png');
        } else {
            flame.style.left = parseInt(dragons[i].style.left) + dragons[i].width - 30 + 'px';
            flame.setAttribute('src', 'img/flame_right.png');
        }
        flame.style.top = parseInt(dragons[i].style.top) + dragons[i].height / 3 + 'px';



        flame.direction = dragons[i].direction;

        document.body.appendChild(flame);

        audio_dragon.play();
    }
}

function updateFlames() {
    var dragons = document.getElementsByName('dragon');
    var flames = document.getElementsByName('flame');

    if (dragons.length === 0 && flames.length === 0) {
        clearInterval(interval_updateFlames);
    } else {
        for (var i = 0; i < flames.length; i++) {
            flames[i].style.left = parseInt(flames[i].style.left) + flame_moveUnitX * flames[i].direction + 'px';
            flames[i].style.top = parseInt(flames[i].style.top) + flame_moveUnitY + 'px';
            if (parseInt(flames[i].style.top) > screenHeight) {
                document.body.removeChild(flames[i]);
            }
        }
    }
}