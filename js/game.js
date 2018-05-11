// Store references to the UI
let playButton = document.getElementById("playButton");
let answerButton = document.getElementById("answerButton");
let questionDiv = document.getElementById("question");
let remainingDiv = document.getElementById("remaining");
let correctDiv = document.getElementById("correct");

// Game state
let questions = [];
let currentQuestionIndex = -1;
let correctAnswers = 0;
const NumOfQuestions = 10;

playButton.addEventListener("click", function() {
  // 1. Fetch the questions from the Trivia API
  fetch("https://opentdb.com/api.php?type=boolean&amount=" + NumOfQuestions)
  .then(response => response.json()) 
  .then(function(jsonRes) {
    if (jsonRes.response_code != 0) // OOps, we have an error!
    {
      console.log("Error retrieving questions from the API");
    }
    else // else
    {
      // a. Store the questions in our variable
      questions = jsonRes.results;

      // b. To display the first question we set the following to zero
      currentQuestionIndex = 0;

      // c. Displays the current question
      DisplayCurrentQuestion();

      // d. hide play button and show the answer button
      playButton.style.display = "none";
      answerButton.style.display = "block";
    }
  });
});

answerButton.addEventListener("click", function() {

});

function DisplayCurrentQuestion()
{
  // TODO: Implement this function
  var questionObj = questions[currentQuestionIndex];
  console.log(questionObj.question);
}