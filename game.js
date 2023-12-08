
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).on("keypress", nextSequence);


function showNextSequence(){
    var patternPostion = 0;
    while (patternPostion < gamePattern.length){
        nextGameColor(patternPostion);
        patternPostion++;
    }
    $(".btn").on("click", buttonClicked);
}

function nextGameColor(patternPostion){
    setTimeout(() => {
        playSound(gamePattern[patternPostion]);
        $("#" + gamePattern[patternPostion]).fadeOut(125).fadeIn(125);
    }, 300 * patternPostion);
}


function buttonClicked(event){
    console.log("button clicked");
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    if (checkAnswer()){
        playSound(userChosenColour);
        animatePress(userChosenColour);
        if (gamePattern.length == userClickedPattern.length){
            userClickedPattern = [];
            $(".btn").off();
            setTimeout(nextSequence, 2000);
        }
    }else {
        $(".btn").off();
        playSound("wrong");
        animatePress(userChosenColour);
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        $(document).on("keypress", restartGame);
    }
}

function restartGame(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("body").removeClass("game-over");
    nextSequence();
}


function checkAnswer (){
    var result; 
    var userColor = userClickedPattern[userClickedPattern.length - 1];
    var gameColor = gamePattern[userClickedPattern.length - 1];
    return userColor == gameColor;
}

function nextSequence(){
    $(document).off();
    var result = Math.floor(Math.random() * 4);
    var nextColor = buttonColours[result];
    gamePattern.push(nextColor);
    level += 1 ;
    $("h1").text("Level " + level);
    showNextSequence();
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.muted = false;
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100
    )
}