/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var screenWidth = $(window).width();
var screenHeight = $(window).height();

// enemy units
var asteroid_moveUnit = 10;
var asteroid_widthX = 155;
var asteroid_heightX = 155;
var asteroid_strength = 30;

// alawys running functions
setInterval(generateAsteroidsX, 2000);
setInterval(updateAsteroidsX, 50);

function generateAsteroidsX() {
    var asteroid = document.createElement('img');
    var asteroid2 = document.createElement('img');
    asteroid.setAttribute('src', 'img/spaceship-Sarah.gif');
    asteroid.setAttribute('class', 'enemy');
    asteroid.setAttribute('name', 'ufo');
    asteroid.style.width = asteroid_widthX + 'px';
    asteroid.style.height = asteroid_heightX + 'px';
    asteroid.style.position = 'absolute';
    asteroid.style.left = (screenWidth - parseInt(asteroid.style.width)) / 3 + 'px';
    asteroid.style.top = '0px';

    asteroid2.setAttribute('src', 'img/spaceship-Sarah.gif');
    asteroid2.setAttribute('class', 'enemy');
    asteroid2.setAttribute('name', 'ufo');
    asteroid2.style.width = asteroid_widthX + 'px';
    asteroid2.style.height = asteroid_heightX + 'px';
    asteroid2.style.position = 'absolute';
    asteroid2.style.left = (screenWidth - parseInt(asteroid.style.width)) / 3 * 2 + 'px';
    asteroid2.style.top = '0px';
    

    asteroid.strength = asteroid_strength-20;
    asteroid2.strength = asteroid_strength-20;

    document.body.appendChild(asteroid);
    document.body.appendChild(asteroid2);

}

function updateAsteroidsX() {
    var asteroids = document.getElementsByName('ufo');
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].style.top = parseInt(asteroids[i].style.top) + asteroid_moveUnit + 'px';
     
        if(parseInt(asteroids[i].style.top) > 200)
        {
        asteroids[i].style.left = parseInt(asteroids[i].style.top) + 3 + 'px';

        }
    }
}