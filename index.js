const express = require('express')
const app = express() //Creates the app

app.listen(3000) // Starts server

//When someone visits the home page
//req is what the user asked for, res is what you send back to the user
app.get('/', (req, res) => { 
  res.send('Home page') //res.send is used to send text back to the browser
})

//Loads About page text when they go to about page
app.get('/about', (req, res) => {
  res.send('About page')
})

//Loads Hello JSON when going to api/test page
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello JSON' })
})