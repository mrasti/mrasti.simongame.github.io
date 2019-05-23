
var rndCircles= [];
var timerVar;
document.querySelector("#start").addEventListener('click', function(evt){
    rndCircles = [];
    lightPath();
});

function lightPath(){
    console.log("*******************");
    console.log(timerVar);
    if(timerVar){
        clearInterval(timerVar);
    }
    rndCircles.push(Math.floor(Math.random()*4));
    console.log(rndCircles);
    console.log(rndCircles.length-1);
    console.log("last element " + rndCircles[rndCircles.length-1]);
    lightUp();
    timerVar = setInterval(lightPath, 1500);
}

function lightUp(){
    document.querySelector("#c" + rndCircles[rndCircles.length-1]).setAttribute('style', 'background-image: linear-gradient(rgb(208,228,246), #F2F4F8');
    setTimeout(() => {
        document.querySelector("#c" + rndCircles[rndCircles.length-1]).removeAttribute('style');
    }, 350);
}