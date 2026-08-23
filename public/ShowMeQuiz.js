console.log("ShowMeQuiz.js loaded");

let currentQuestion;

async function loadQuestion(questionToLoad = "1")
{
    const response = await fetch(`/Quiz/ShowMeQuestions/${questionToLoad}`); /* Loads the specified question */
    const question = await response.json();
    
    currentQuestion = question; /* Store current question */ 

    document.getElementById("feedback").innerText = ""; // Clears the feedback text when loading a new question
    document.getElementById("nextQuestion").disabled = true; // Disables the next question button when loading a new question

    document.getElementById("question").innerText = question.question; //Gets the question text and displays it in the paragraph with id "question"

    let shuffledAnswers = question.answers.sort(() => Math.random() - 0.5); // Shuffles the answers randomly
    
    const images = document.querySelectorAll(".show-me-answer"); // Selects all the images in the div with id "imageAnswers"

    images.forEach((image, index) => {
        image.src = shuffledAnswers[index].image;
        image.dataset.correct = shuffledAnswers[index].correct; // Sets the correct value of the image to the correct value of the answer

        image.classList.remove("correct", "incorrect"); // Removes the correct and incorrect classes from the image
        image.style.pointerEvents = "auto"; // Enables pointer events for the image
    });
}

function checkImageAnswer(selectedImage) // Checks the selected image answer and provides feedback
{
    const images = document.querySelectorAll(".show-me-answer"); // Selects all the images in the div with id "imageAnswers"
    
    const feedback = document.getElementById("feedback");

    images.forEach(image => {
        image.style.pointerEvents = "none"; // Disables pointer events for all images
    });

    if(selectedImage.dataset.correct === "true")
    {
        selectedImage.classList.add("correct"); // Adds the correct class to the selected image

        feedback.innerText = "Correct!";
        feedback.style.color = "green";

        increaseScore(); // Increases the score if the selected image is correct
    }
    else
    {
        selectedImage.classList.add("incorrect"); // Adds the incorrect class to the selected image

        feedback.innerText = "Incorrect!";
        feedback.style.color = "red";

        images.forEach(image => {
            if(image.dataset.correct === "true")
            {
                image.classList.add("correct"); // Adds the correct class to the correct image
            }
        });
    }

    document.getElementById("nextQuestion").disabled = false; // Enables the next question button after an answer is selected
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

    document.getElementById("imageAnswers").style.display = "none"; // Hide the image answers
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
    await getTotalQuestions("/Quiz/ShowMeQuestions");
    updateScore();
    await loadQuestion();
}

init();

document.getElementById("homeButton").addEventListener("click", () => {
    window.location.href = "/";
});

document.getElementById("nextQuestion").addEventListener("click", nextQuestion);

document.querySelectorAll(".show-me-answer").forEach(image => {
    image.addEventListener("click", () => {
        checkImageAnswer(image);
    });
})