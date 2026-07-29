let currentQuestion; /* Initialises current question */
let currentQuestionId = 1;
let totalQuestions;
let score = 0; /* Initialises score */

async function loadQuestion(questionToLoad = "1")
{
    const response = await fetch(`/Quiz/TellMeQuestions/${questionToLoad}`); /* Loads the specified question */
    const question = await response.json();

    document.getElementById("feedback").innerText = ""; // Clears the feedback text when loading a new question
    document.getElementById("submitAnswer").disabled = false; // Enables the submit button when loading a new question

    currentQuestion = question; /* Store current question */ 

    document.getElementById("question").innerText = question.question; //Gets the question text and displays it in the paragraph with id "question"

    let shuffledAnswers = question.answers.sort(() => Math.random() - 0.5); // Shuffles the answers randomly
    document.getElementById("label1").innerText = shuffledAnswers[0].text; // Gets the text of the first answer and displays it in the label with id "label1"
    document.getElementById("label2").innerText = shuffledAnswers[1].text; 
    document.getElementById("label3").innerText = shuffledAnswers[2].text;

    document.getElementById("answer1").value = shuffledAnswers[0].correct; // Gets the correct value of the first answer and sets it as the value of the radio button with id "answer1"
    document.getElementById("answer2").value = shuffledAnswers[1].correct;
    document.getElementById("answer3").value = shuffledAnswers[2].correct;

    // Clear previous selection
    document.querySelectorAll('input[name="answer"]').forEach(button => {
    button.checked = false;
    });
}

function GetNextQuestionNumber()
{
    currentQuestionId++;

    if (currentQuestionId > totalQuestions)  
    {
        console.log("No more questions available.");
        currentQuestionId = totalQuestions; // Reset to the last question
        return;
    }
    
    console.log("Current question: " + currentQuestionId);
    loadQuestion(currentQuestionId);   
}

function checkAnswer() // Checks the selected answer and provides feedback
{
    const selected = document.querySelector('input[name="answer"]:checked');

    const feedback = document.getElementById("feedback");

    if (!selected)
    {
        feedback.innerText = "Please select an answer";
        feedback.style.color = "black";
        return;
    }

    if(selected.value === "true")
    {
        feedback.innerText = "Correct!";
        feedback.style.color = "green";

        score++; // Increment score for correct answer
        document.getElementById("score").innerText = `Score: ${score}/${totalQuestions}`; // Update score display
    }
    else
    {
        //Find the correct answer from the current question's answers array
        const correctAnswer = currentQuestion.answers.find(answer => answer.correct === true);
        const correctAnswerText = correctAnswer.text;

        //Print the correct answer
        feedback.innerText = `Incorrect!\n\n The correct answer is:\n ${correctAnswerText}`;
        feedback.style.color = "red";
    }

    document.getElementById("submitAnswer").disabled = true; // Disable the submit button after a correct answer
}

async function getTotalQuestions() // Gets the total number of questions in the quiz
{
    const response = await fetch(`/Quiz/TellMeQuestions`);
    const TellMeQuestions = await response.json();
    
    totalQuestions = TellMeQuestions.length;
    console.log(totalQuestions + " questions in the quiz.");
}

async function setScore() // Sets the initial score to 0
{
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}/${totalQuestions}`; // Update score display
}

async function init()
{
    await getTotalQuestions();
    await setScore();
    await loadQuestion();
}

init();

// Since we are using 'defer' in the HTML script tag, we can instantly run 
// our code and bind listeners safely because the DOM is fully loaded.
document.getElementById("nextQuestion").addEventListener("click", GetNextQuestionNumber);
document.getElementById("submitAnswer").addEventListener("click", checkAnswer);