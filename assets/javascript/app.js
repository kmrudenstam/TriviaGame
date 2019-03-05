// questions and answers array to make up the game
var questions = [
  {
    title: "Britney Spears' first song was...?",
    answers: ['A. Sometimes', 'B. Baby One More Time', 'C. Oops! I Did It Again', 'D. Toxic'],
    correct: 1
  },
  {
    title: "Which basketball player was in 'Space Jam'?",
    answers: ['A. Dennis Rodman', 'B. Kobe Bryant', 'C. Tim Hardaway', 'D. Michael Jordan'],
    correct: 3
    }, 
  {
    title: "NSYNC consisted of Justin Timberlake, Lance Bass, JC Chasez, Joey Fatone, and _______?",
    answers: ['A. Brian Litrell', 'B. Nick Carter', 'C. Chris Kirkpatrick', 'D. Joey McIntyre'],
    correct: 2
  }, 
  {
    title: "'Tamagotchi' is a Japanese portmanteau of what two words?",
    answers: ['A. Egg + Friend','B. Egg + Computer', 'C. Egg + Watch', 'D. Egg + Pet'],
    correct: 2
  }
];
console.log(questions);

// variables
var timer = 20;
var clock;
var score = 0;
var currentQuestion = 0;

$(document).ready(function() {
  // start game when "start" is clicked 
  $('#start').click(function(e){
    $('.start').hide();
    $('.quiz').show();
    showQuestion ();
    $('.timer').html('<p>Time remaining: <span class="time">20</span></p>');
    timerHolder();
  });

  $('.quiz ul').on('click', 'li', function() {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  });

  // check if current answer is correct and move to following questions when player press "next"
  $('#next').click(function(e) {
    if ($('li.selected').length) {
      var guess = parseInt($('li.selected').attr('id'));
      checkAnswer(guess);
      timerHolder();
      timer = 20;
      $('.time').html(timer);
    } else {
      alert('Please select an answer');
    }
  });

  // timer function
  function timerHolder() {
    clearInterval(clock);
    clock = setInterval(seconds, 1000);
    function seconds() {
      if (timer === 0) {
        alert("Time's Up! See how you did");
        clearInterval(clock);
        showSummary();
      } else if (timer > 0) {
        timer--;
      }
      $('.time').html(timer);
    }
  }

  $('#restart').click(function(e) {
    restart();
  })

});


function showQuestion() {
  var question = questions[currentQuestion];
  $('.quiz h2').text(question.title);
  $('.quiz ul').html('');
  for (var i=0; i<question.answers.length; i++) {
    $('.quiz ul').append("<li id='"+i+"'>"+question.answers[i]+"</li>");
  }
}

function checkAnswer(guess) {
  var question = questions[currentQuestion];
  if(question.correct === guess) {
    score++;
  }
  currentQuestion++;
  if(currentQuestion >= questions.length) {
    showSummary();
  } else {
    showQuestion();
    
  }
}

function showSummary() {
  $('.quiz').hide();
  $('.summary').show();
  $('.summary p').text("Congrats! You scored " + score + " out of " + questions.length + " correct!");
}

function restart() {
  $('.summary').hide();
  $('.quiz').show();
  timer = 20;
  score = 0;
  currentQuestion = 0;
  showQuestion();
  timerHolder();
}
