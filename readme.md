
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
## Project Title : Simon Game
Simon is a memory game that uses colors to help you remember patterns. 

Visit [Simon game](https://en.wikipedia.org/wiki/Simon_(game)) for more information.

This project is published as a GitHub page: [https://mrasti.github.io/simongame/](https://mrasti.github.io/simongame/)

## Description of the Game

1. Once the player clicks on the start button, "score" is set to zero and one circle lights up. Player will be allowed to start clicking on  circles after the circle is off. 
![Imgur](https://i.imgur.com/ywgfvBQ.png#thumbnail)

2. Once player clicks on one circle, if this is the correct one the next sequence starts. So the first circle and the second circle will light up and off in a sequence. After that, clicking is allowed and player needs to replicate the sequence.
3. Adding one circle to the sequence in each round will continue until player clicks on one wrong circle. At this point the wrong click will be shown in red and an alert pops up on screen.
4. If player closes the alert window, score box is still showing the final score and by clicking on the quit button this value will reset.
5. Player can either quit or restart the game at any point.

## Technologies Used
+ HTML5
+ CSS
+ javascript
+ Bootstrap

## Code Breakdown

+ As the first step buttons and circles were created in html. Each circle is made by creating a div and styling that in css.
```css
#c0{
    width: 60px;
    height: 60px;
    background-image: linear-gradient(#FEEE8B, rgb(67, 151, 97));
    box-shadow: -2px 2px 15px 2px rgba(255, 255,255, .8);
}
```
+ In javascript file, some global variables are defined and an EventListener is added to the start button.
```javascript
var rndCircles= [];
var timerVar;
var currentIndex = 0;
var clickIndex = 0;
var clickAllowed = false;
var score= 0;
```
```javascript
document.querySelector("#start").addEventListener('click', function(evt){
    lightOffAll();
    resetValues();
    resetScore();
    document.querySelector('#score').innerText = "Score: " + score;
    lightPath();
});
```
The following functions are used to reset the values and circles when start button is clicked:
```javascript
function lightOffAll(){
    for(var i=0; i<circleElems.length; i++){
        if(circleElems[i].hasAttribute('style')){
            circleElems[i].removeAttribute('style');
        };
    };
}
```
```javascript
function resetValues(){
    clearInterval(timerVar);
    rndCircles= [];
    clickIndex = 0;
    clickAllowed = false;
}
```
```javascript
function resetScore(){
    score = 0;
    document.querySelector('#score').innerText = "Score";
}
```
+ After reseting the values, lightPath() function is called. This function selects a random number in the range of [0,3] and pushes this number to rndCircles. 
```javascript
function lightPath(){
    clickAllowed = false;
    if(timerVar){
        clearInterval(timerVar);
    }
    currentIndex = 0;
    rndCircles.push(Math.floor(Math.random()*4));
    timerVar = setInterval(lightUp, 1000);
}
```
lightPath() also sets an interval which calls lightUP() function every one second. This function light ups the circles in the sequence that rndCircles defines.
```javascript
timerVar = setInterval(lightUp, 1000);
```
+ Every time that lightUP() is called, a style attribute is added to the target circle. This attribute changes background-image for the circle which will create the lighting up effect. The style attribute is removed after 350 ms. 
```javascript
function lightUp(){
    if(currentIndex === rndCircles.length){
        clearInterval(timerVar);
        clickAllowed = true;
        return;
    }
    document.querySelector("#c" + rndCircles[currentIndex]).setAttribute('style', 'background-image: linear-gradient(rgb(208,228,246), #F2F4F8)');
    setTimeout(() => {
        document.querySelector("#c" + rndCircles[currentIndex]).removeAttribute('style');
        currentIndex++;
    }, 350);
}
```
lightUp() will continue runnig until currentIndex reaches the length of rndCircles. Once this happens, timerVar is cleared and clickAllowed is set to true in order to let the player start replicating the sequence.
```javascript
if(currentIndex == rndCircles.length){
        clearInterval(timerVar);
        clickAllowed = true;
        return;
    }
```
+ The array circleElems is created to store the four divs that make the circles and add an EventListener to all of them. After every click by player, the target circle is compared to the related element in rndCircles. If player clicked on the right circle, this circle will light up in green and clickIndex increases by one.
```javascript
if("c"+rndCircles[clickIndex] === evt.target.id){
            evt.target.setAttribute('style', 'background-image: linear-gradient(rgb(208,228,246), lightgreen)');
            setTimeout(() => {
                evt.target.removeAttribute('style');
            }, 350);
            clickIndex++;
```
This continues until clickIndex reaches the length of rndCircles. At this point, addScore() is called, clickIndex is set to zero and lightPath() is called to create the next sequence.
```javascript
if (clickIndex === rndCircles.length){
                addToScore();
                clickIndex = 0;
                lightPath();
            }
```
```javascript
function addToScore(){
    score++;
    document.querySelector('#score').innerText = "Score: " + score;
}
```
+ If any of the clicks choose a wrong circle, the circle will ligth up in red and an alert will pop up on screen. The function resetValues() clears timeVar and the game will end.
```javascript
else{
            evt.target.setAttribute('style', 'background-image: linear-gradient(rgb(96,84,60), rgb(84,41,41))');
            setTimeout(() => {
                evt.target.removeAttribute('style');
                alert("You lost!");
            }, 350); 
            resetValues()
        }
```
+ Player can quit the game at any point by clicking on quit button.
```javascript
document.querySelector('#quit').addEventListener('click', function(evt){
    clearInterval(timerVar);
    lightOffAll();
    resetValues();
    resetScore();
});
```
## Future Additions

1. A set of sounds can be added to the game in order to make every circle recognizable by a different sound.
2. More circles can be added to create different levels for the game. 