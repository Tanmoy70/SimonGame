// Step 1

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattren = [];

var userClickedPattren = [];

function nextSequence() {
  userClickedPattren = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattren.push(randomChosenColors);

  //Step 2

  $("#" + randomChosenColors)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColors);
}

//Step 3

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattren.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattren.length - 1);
});

// Step 4

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Step 5

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Step 7

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Step 8

function checkAnswer(currentLevel) {
  if (gamePattren[currentLevel] === userClickedPattren[currentLevel]) {
    console.log("success");

    if (userClickedPattren.length === gamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("worng");

    gameOver();

    stratOver();
  }
}

//Step 9

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game over, Press any key to restart");
}

//Step 10

function stratOver() {
  level = 0;
  gamePattren = [];
  started = false;
}
