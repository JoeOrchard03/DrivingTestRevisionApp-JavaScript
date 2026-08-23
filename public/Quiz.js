let currentQuestionId = 1;
let totalQuestions;
let score = 0; /* Initialises score */

async function getTotalQuestions(endpoint) // Gets the total number of questions in the quiz
{
    const response = await fetch(endpoint);
    const questions = await response.json();

    totalQuestions = questions.length;
    
    return totalQuestions;
}

function resetQuiz() // Resets the quiz to the first question and resets the score
{
    currentQuestionId = 1;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    loadQuestion(currentQuestionId);
}

function updateScore()
{
    document.getElementById("score").innerText =
        `Score: ${score}/${totalQuestions}`;
}

function increaseScore()
{
    score++;
    updateScore();
}


function GetNextQuestionNumber()
{
    currentQuestionId++;

    if (currentQuestionId > totalQuestions)  
    {
        console.log("No more questions available.");
        //currentQuestionId = totalQuestions; // Reset to the last question
        displayFinalScore();
        return null;
    }
    
    return currentQuestionId;
}