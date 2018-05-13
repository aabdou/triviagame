// UI references
let questionDiv = document.getElementById("question");
let remainingDiv = document.getElementById("remaining");
let correctDiv = document.getElementById("correct");
let playButton = document.getElementById("playButton");
let answerButton = document.getElementById("answerButton");
// UI references

// Game state
let questions = [];
let currentQuestionIndex = -1;
let correctAnswers = 0;
const NumOfQuestions = 10;
// Game state

// Button event handlers
playButton.addEventListener("click", function() {
  // 1. Go to the server and get 10 questions 
  // 2. If successful, 
  //    a. Store the questions 
  //    b. Set the currentQuestionIndex = 0 
  //    c. Display the question
  //    d. Hide the play button and show the answer button

  fetch("https://opentdb.com/api.php?type=boolean&amount=" + NumOfQuestions)
  .then(response => response.json())
  .then(function(jsonRes){
    if (jsonRes.response_code != 0) // this is an error
    {
      console.log("Error retrieving questions");
    }
    else{ // this is a success!
      // a. Store the questions
      questions = jsonRes.results;

      // b. Set the currentQuestionIndex = 0
      currentQuestionIndex = 0;

      // c. Display the question
      DisplayCurrentQuestion();

      //d. Hide the play button and show the answer button
      playButton.style.display = "none";
      answerButton.style.display = "block";
    }
  });
});

answerButton.addEventListener("click", function() {
  // 1. Get the answer from the user
  let answer = document.querySelector("input[name='answer']:checked").value;
  let question = questions[currentQuestionIndex];
  if (question.correct_answer == answer)
  {
    correctAnswers += 1;
    correctDiv.innerText = "Correct: " + correctAnswers;
  }

  currentQuestionIndex += 1;
  remainingDiv.innerText = "Remaining: " + (NumOfQuestions - currentQuestionIndex);

  if (currentQuestionIndex == NumOfQuestions)
  {
    playButton.style.display = "block";
    answerButton.style.display = "none";
    questionDiv.innerText = "You finished your game. Click Play to play again!";
  }
  else
  {
    DisplayCurrentQuestion();
  }
});

function DisplayCurrentQuestion()
{
  questionDiv.innerHTML = "<p>"+ questions[currentQuestionIndex].question + "</p>";
  questionDiv.innerHTML += "<input type='radio' name='answer' value='True' /> True";
  questionDiv.innerHTML += "<input type='radio' name='answer' value='False' /> False";
}