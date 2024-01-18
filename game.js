var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = true;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4) + 0;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $("h1").text("Level " + level);
  level++;
}

//at btn class, attach click listener.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var musicPlayer = new Audio(
    "sounds/" + name + ".mp3"
  );
  musicPlayer.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (event) {
  if (started) {
    started = false;
    nextSequence();
  }
  // console.log(event.key);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
    // console.log("success");
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 2000);

    var wrongPlayer = new Audio(
      "sounds/wrong.mp3"
    );
    wrongPlayer.play();

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    // console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}
