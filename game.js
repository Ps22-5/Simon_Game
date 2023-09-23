var arr=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var started=false;


$(document).on("keydown",function(){ 

if(!started){
started=true;
nextSequence();

}

});

$(".btn").on("click",function(){


    var userChosenColor=$(this).attr("id");//this goes to class and takes the attribute

    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(c){
    var audio=new Audio("sounds/"+c+".mp3");
    audio.play();
}

function animatePress(currentColor){


    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");

    },100);

}

function startOver(){

    level=0;
    gamePattern=[];
    started=false;

}


function nextSequence(){

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber= Math.random();//to generate a random number between 0-0.999
    randomNumber=randomNumber*4;//random number = 0- 3.999
    randomNumber=Math.floor(randomNumber);//num(2.05)=2, num(3.99)=3, num(0.99)=0
    
    var randomChosenColor=arr[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);//blink

    playSound(randomChosenColor);//sound
    
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {

        console.log("success");

       if(userClickedPattern.length === gamePattern.length)
       {
        setTimeout(function(){
            nextSequence();
        },1000);
       }

    } 
    else
    {

        $("h1").text("Game Over, Press Any Key to Restart");
        var audio=new Audio("wrong.mp3");
        audio.play();
        $(document).addClass("game-over");
        setTimeout(function(){
            $(document).removeClass("game-over");
        },200);

        startOver();
    }
    }
