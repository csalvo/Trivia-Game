$(document).ready(function() {
  $("#mainButton").on("click", punGame.start);
  $("#answer1, #answer2, #answer3").on("click", function() {
    punGame.results(this.id);
  })
});
var punGame = {
  time: 5,
  counterStarted: false,
  currentPunNumber: 0,
  correct: 0,
  incorrect: 0,
  start: function() {
    $("#mainButton").css("display", "none");
    punGame.nextPun();
  },
  restart: function() {
    $("#mainButton").css("display", "inline");
    punGame.currentPunNumber = 0;
    punGame.correct = 0;
  },
  results: function(answer) {
    if (answer === punGame.puns[punGame.currentPunNumber]['correctAnswer']) {
      $("#pun").text("Correct!");
      punGame.correct++;

    } else if (answer !== punGame.puns[punGame.currentPunNumber]['correctAnswer']) {
      $("#pun").text("Wrong!");
      punGame.incorrect++;
    }
    clearInterval(timer);
    $("#answer1").html("<img src='"+punGame.puns[punGame.currentPunNumber]['picture']+ "'>");
    $("#answer2, #answer3").text("");  
    punGame.currentPunNumber++;
    setTimeout(punGame.nextPun, 3000);
  },
  nextPun: function() {
    if (punGame.currentPunNumber === punGame.puns.length) {
      clearInterval(timer);
      $("#timer").text("You got " + punGame.correct + " out of " + punGame.puns.length + " right!");
      $("#pun").text("Press Start to play again (or not).");
      $("#answer1, #answer2, #answer3").text("");
      punGame.restart();
    } else {
      punGame.time = 11;
      timer = setInterval(punGame.counter, 1000);
      $("#pun").html(punGame.puns[punGame.currentPunNumber]["question"]);
      $("#answer1").html(punGame.puns[punGame.currentPunNumber]['answer1']);
      $("#answer2").text(punGame.puns[punGame.currentPunNumber]['answer2']);
      $("#answer3").text(punGame.puns[punGame.currentPunNumber]['answer3']);
      console.log(punGame.currentPunNumber);
    }
  },
  counter: function() {
    if (punGame.time > 0) {
      punGame.time--;
      var converted = punGame.timeConverter(punGame.time);
      $("#timer").html(converted);
    } else if (punGame.time === 0) {
      if (punGame.currentPunNumber < punGame.puns.length) {
        $("#timer").html("Out of time!");
        clearInterval(timer);
        punGame.currentPunNumber++
          setTimeout(punGame.nextPun, 3000);
      }
    };
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  },
  puns: [{
    question: "Why did the banana go to the doctor?",
    answer1: "It had a splitting headache",
    answer2: "It wasn't peeling well",
    answer3: "It kept getting bruises",
    correctAnswer: "answer2",
    picture: "assets/images/banana.jpg"
  }, {
    question: "What do you call a fancy fish?",
    answer1: "Dinner",
    answer2: "Sofishticated",
    answer3: "Fred",
    correctAnswer: "answer2",
    picture: "assets/images/fish.jpg"
  }, {
    question: "What do you call an alligator in a vest?",
    answer1: "An investigator",
    answer2: "Sherlock",
    answer3: "Fred",
    correctAnswer: "answer1",
    picture: "assets/images/gator.jpg"
  }, {
    question: "What do you call an everyday potato?",
    answer1: "Spuddy",
    answer2: "Too many potatoes",
    answer3: "A commontator",
    correctAnswer: "answer3",
    picture: "assets/images/potato.jpg"
  }, {
    question: "What do you call a labrador that does magic?",
    answer1: "A labracadabrador",
    answer2: "Highly unlikely",
    answer3: "Fred",
    correctAnswer: "answer1",
    picture: "assets/images/labrador.jpg"
  }, {
    question: "What do you call a bear with no teeth?",
    answer1: "Not scary",
    answer2: "Fred",
    answer3: "A gummy bear",
    correctAnswer: "answer3",
    picture: "assets/images/gummybear.jpg"
  }, {
    question: "What do you call a lazy kangaroo?",
    answer1: "A friend",
    answer2: "A pouch potato",
    answer3: "Fred",
    correctAnswer: "answer2",
    picture: "assets/images/kangaroo.jpg"
  }, {
    question: "What do you get when dinosaurs crash their cars?",
    answer1: "A huge mess",
    answer2: "Unsafe driving conditions",
    answer3: "T-Rex",
    correctAnswer: "answer3",
    picture: "assets/images/t-rex.jpg"
  }, {
    question: "What do you call an owl that does magic?",
    answer1: "An owlcadabrador",
    answer2: "Hoodini",
    answer3: "Fred",
    correctAnswer: "answer2",
    picture: "assets/images/owl.jpg"
  }]
};