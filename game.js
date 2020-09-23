var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level); // for tracking the level of the game
    nextSequence();
    started = true; // for changing the header tag
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // storing the id of the button that got clicked
  userClickedPattern.push(userChosenColour); // saving the user users clicked pattern

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // If the user got the most recent answer right above, then check that they have finished their sequence with another if statement.

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence(); //Call nextSequence() after a 1000 millisecond delay.
      }, 1000);
    }
  } else {
    console.log("wrong");
    // playing this sound if the user got one of the answers wrong.
    playSound("wrong");
    // applying "game-over" class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Change the h1 title to say "Game Over, Press Any Key to Restart"
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver(); // calling the startOver()
  }
}

function nextSequence() {
  userClickedPattern = []; //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; // for increasing the levels
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // generating random no. b/w 0-3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // selecting a random colour

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // animating a flash to the button
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // playing the sound for the button colour
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  // reseting the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}