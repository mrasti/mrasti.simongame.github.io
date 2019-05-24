
var rndCircles= [];
var timerVar;
var currentIndex = 0;
var clickIndex = 0;
var clickAllowed = false;
var score= 0;
document.querySelector("#start").addEventListener('click', function(evt){
    lightOffAll();
    resetValues();
    resetScore();
    document.querySelector('#score').innerText = "Score: " + score;
    lightPath();
});

function lightPath(){
    clickAllowed = false;
    if(timerVar){
        clearInterval(timerVar);
    }
    currentIndex = 0;
    rndCircles.push(Math.floor(Math.random()*4));
    timerVar = setInterval(lightUp, 1000);
}

function lightUp(){
    if(currentIndex == rndCircles.length){
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

var circleElems = document.querySelectorAll('.circle');
for(var i=0; i<circleElems.length; i++){
    circleElems[i].addEventListener('click', function(evt){
        if(!clickAllowed){
            return;
        }
        if("c"+rndCircles[clickIndex] === evt.target.id){
            evt.target.setAttribute('style', 'background-image: linear-gradient(rgb(208,228,246), lightgreen)');
            setTimeout(() => {
                evt.target.removeAttribute('style');
            }, 350);
            clickIndex++;
            if (clickIndex === rndCircles.length){
                addToScore();
                clickIndex = 0;
                lightPath();
            }
        } else{
            evt.target.setAttribute('style', 'background-image: linear-gradient(rgb(96,84,60), rgb(84,41,41))');
            setTimeout(() => {
                evt.target.removeAttribute('style');
                alert("You lost!");
            }, 350); 
            resetValues()
        }
    });
}

function resetValues(){
    clearInterval(timerVar);
    rndCircles= [];
    clickIndex = 0;
    clickAllowed = false;
}

document.querySelector('#quit').addEventListener('click', function(evt){
    clearInterval(timerVar);
    lightOffAll();
    resetValues();
    resetScore();
});

function addToScore(){
    score++;
    document.querySelector('#score').innerText = "Score: " + score;
}

function resetScore(){
    score = 0;
    document.querySelector('#score').innerText = "Score";
}

function lightOffAll(){
    for(var i=0; i<circleElems.length; i++){
        if(circleElems[i].hasAttribute('style')){
            circleElems[i].removeAttribute('style');
        };
    };
}
