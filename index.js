const express = require('express') // Loads the express framework
const app = express() //Creates the app

//When someone visits the home page
//req is what the user asked for, res is what you send back to the user
app.get('/', (req, res) => { 
  res.send('Driving test revision app: Home Page') //res.send is used to send text back to the browser
})

//Loads About page text when they go to about page
app.get('/about', (req, res) => {
  res.send('This is a driving test revision app that helps people prepare for their driving test')
})

//Loads questions page
app.get('/questions', (req, res) => {
  res.json([
      {
      question: "What does this sign mean?",
      answer: "Stop"
      },
      {
      question: "What is the speed limit on a dual carriageway in Wales?",
      answer: "70mph"
      }
    ]
  )})


app.listen(3000) // Starts server
