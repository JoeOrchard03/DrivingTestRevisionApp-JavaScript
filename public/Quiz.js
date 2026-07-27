let currentQuestion; /* Initialises current question */

async function loadQuestion()
{
    const response = await fetch("/Quiz/TellMeQuestions/1"); /* Loads the first question */
    const question = await response.json();

    document.getElementById("feedback").innerText = ""; // Clears the feedback text when loading a new question

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
    }
    else
    {
        feedback.innerText = "Incorrect!";
        feedback.style.color = "red";
    }
}

// Since we are using 'defer' in the HTML script tag, we can instantly run 
// our code and bind listeners safely because the DOM is fully loaded.
loadQuestion();
document.getElementById("nextQuestion").addEventListener("click", loadQuestion);
document.getElementById("submitAnswer").addEventListener("click", checkAnswer);