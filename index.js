const express = require('express') // Loads the express framework
const app = express() //Creates the app
app.use(express.static('public')); // Serves static files from the public directory
const fs = require('fs') // Loads the file system module
const path = require('path') // Loads the path module

function getRandomNumberInArray(arrayToSearch)
{
  return Math.floor(Math.random() * (arrayToSearch.length));
}

//Loads About page text when they go to about page
app.get('/about', (req, res) => {
  res.send('This is a driving test revision app that helps people prepare for their driving test')
})


function loadQuizQuestionsFromFile(fileName)
{
  return async (req, res) => {
    const questionList = await LoadQuestionListFromFile(fileName);

    if(req.params.id === "random")
      {
        res.json(questionList[getRandomNumberInArray(questionList)]);
      }
      else
      {
        const index = parseInt(req.params.id) - 1;

        if(questionList[index])
        {
          res.json(questionList[index]);
        }
        else
        {
          res.status(404).send('Question not found');
        }
      }
  }
}

app.get('/Quiz/TellMeQuestions/:id', loadQuizQuestionsFromFile('TellMeQuestions.json'));
app.get('/Quiz/ShowMeQuestions/:id', loadQuizQuestionsFromFile('ShowMeQuestions.json'));

// Loads the json files that have the questions based on the file name provided and returns the parsed JSON data
async function LoadQuestionListFromFile(fileName)
{
  const filePath = path.join(__dirname, "Data", fileName);
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

app.get('/Quiz/ShowMeQuestions', async(req, res) => {
    res.json(await LoadQuestionListFromFile('ShowMeQuestions.json'));
});

app.get('/Quiz/TellMeQuestions', async (req, res) => {
    res.json(await LoadQuestionListFromFile('TellMeQuestions.json'));
});

app.listen(3000) // Starts server
