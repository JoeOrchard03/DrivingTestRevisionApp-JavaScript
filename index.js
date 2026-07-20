const express = require('express') // Loads the express framework
const app = express() //Creates the app
const fs = require('fs') // Loads the file system module
const path = require('path') // Loads the path module

function getRandomNumberInArray(arrayToSearch)
{
  return Math.floor(Math.random() * (arrayToSearch.length));
}

//When someone visits the home page
//req is what the user asked for, res is what you send back to the user
app.get('/', (req, res) => { 
  res.send(`
    <h1>Driving Test App</h1>

    <a href="/Quiz/TellMeQuestions/1">
      <button>Tell Me Questions Quiz</button>
    </a>

    <a href="/Quiz/ShowMeQuestions/1">
      <button>Show Me Questions Quiz</button>
    </a>
  `);
});

//Loads About page text when they go to about page
app.get('/about', (req, res) => {
  res.send('This is a driving test revision app that helps people prepare for their driving test')
})

//Loads questions page
app.get('/Quiz/TellMeQuestions/:id', (req, res) => {
  const filePath = path.join(__dirname, 'TellMeQuestions.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const questionList = JSON.parse(jsonData);
  
  if(req.params.id === "random")
  {
      res.send(questionList[getRandomNumberInArray(questionList)].question);
  }
  else
  {
    //Get the first index of the Question list and subtract 1 to get the correct index for the array
    const index = parseInt(req.params.id) - 1;

    //Check if the index exists in the question list
    if(questionList[index]) 
    {
      res.send(questionList[index].question);
    }
    else 
    {
      res.status(404).send('Question not found');
    }
  }
})

app.get('/Quiz/ShowMeQuestions/:id', (req, res) => {
  const filePath = path.join(__dirname, 'ShowMeQuestions.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const questionList = JSON.parse(jsonData);
  
  if(req.params.id === "random")
  {
      res.send(questionList[getRandomNumberInArray(questionList)].question);
  }
  else
  {
    //Get the first index of the Question list and subtract 1 to get the correct index for the array
    const index = parseInt(req.params.id) - 1;

    //Check if the index exists in the question list
    if(questionList[index]) 
    {
      res.send(questionList[index].question);
    }
    else 
    {
      res.status(404).send('Question not found');
    }
  } 
})

// //Loads questions page
// app.get('/questions/:id', (req, res) => {
//   if(req.params.id === "random")
//   {
//       const filePath = path.join(__dirname, 'ShowMeQuestions.json');
//       const jsonData = fs.readFileSync(filePath, 'utf8');
//       const json = JSON.parse(jsonData);
//       res.send(json[getRandomNumberInArray(json)].question);
//   }
//   else{
//     res.send(questions[req.params.id - 1].question);
//   }
// })

app.listen(3000) // Starts server
