let currentQuestion; /* Initialises current question */

async function loadQuestion(questionToLoad = "1")
{
    const response = await fetch(`/Quiz/TellMeQuestions/${questionToLoad}`); /* Loads the specified question */
    const question = await response.json();
    
    currentQuestion = question; /* Store current question */ 

    document.getElementById("feedback").innerText = ""; // Clears the feedback text when loading a new question
    document.getElementById("submitAnswer").disabled = false; // Enables the submit button when loading a new question
    document.getElementById("nextQuestion").disabled = true; // Disables the next question button when loading a new question

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

        increaseScore(); // Increase score if the answer is correct
    }
    else
    {
        //Find the correct answer from the current question's answers array
        const correctAnswer = currentQuestion.answers.find(answer => answer.correct === true || answer.correct === "true");
        const correctAnswerText = correctAnswer.text;

        //Print the correct answer
        feedback.innerText = `Incorrect!\n\n The correct answer is:\n ${correctAnswerText}`;
        feedback.style.color = "red";
    }

    document.getElementById("submitAnswer").disabled = true; // Disable the submit button after a correct answer
    document.getElementById("nextQuestion").disabled = false; // Enable the next question button after a correct answer
}

function nextQuestion() // Loads the next question
{
    const questionNumber = GetNextQuestionNumber();

    if (questionNumber !== null)
    {
        loadQuestion(questionNumber);
    }
}

function displayFinalScore()
{
    const feedback = document.getElementById("feedback");

    document.getElementById("radioButtons").style.display = "none"; // Hide the radio buttons
    document.getElementById("submitAnswer").style.display = "none"; // Hide the submit button
    document.getElementById("nextQuestion").style.display = "none"; // Hide the next question button
    document.getElementById("score").style.display = "none"; // Hide the score display
    document.getElementById("question").style.display = "none"; // Hide the question text

    const halfScore = totalQuestions / 2;

    switch(true)
    {
        case score === 0:
            feedback.innerText = `You scored ${score}/${totalQuestions}. Better luck next time!`;
            break;
        case score < halfScore:
            feedback.innerText = `You scored ${score}/${totalQuestions}. Keep practicing!`;
            break;
        case score === halfScore:
            feedback.innerText = `You scored ${score}/${totalQuestions}. Not bad!`;
            break;
        case score > halfScore && score < totalQuestions:
            feedback.innerText = `You scored ${score}/${totalQuestions}. Great job!`;
            break;
        case score === totalQuestions:
            feedback.innerText = `You scored ${score}/${totalQuestions}. Perfect score! Well done!`;
            break;
        default:
            feedback.innerText = `You scored ${score}/${totalQuestions}.`;
    }
}

async function init()
{
    await getTotalQuestions("/Quiz/TellMeQuestions");
    updateScore();
    await loadQuestion();
}

init();

// Since we are using 'defer' in the HTML script tag, we can instantly run 
// our code and bind listeners safely because the DOM is fully loaded.
document.getElementById("homeButton").addEventListener("click", () => { window.location.href = "/"; });
document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
document.getElementById("submitAnswer").addEventListener("click", checkAnswer);