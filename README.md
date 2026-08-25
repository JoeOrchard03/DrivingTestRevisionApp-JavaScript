# Driving Test Revision App

This project is a web-based driving test revision app that I made using node.js/javascript designed to help users prepare for the questions portion of the UK practical driving test. 

## Live Demo:

Use the app here on Render: <br>
https://drivingtestrevisionapp-javascript.onrender.com

## Overview

This project was created to practise developing a web application using JavaScript, Node.js and Express.

The application provides two different quizzes based on the "Tell Me" and "Show Me" sections of the UK driving test. Questions are stored in JSON files and are retrieved through API endpoints created using Express.

## Features

- Tell Me multiple-choice quiz
- Show Me image-based quiz
- Randomised answer order
- Automatic scoring
- Correct and incorrect answer feedback
- Final score calculation
- Dynamic question loading
- Responsive layout
- JSON-based question storage
- REST API endpoints for retrieving questions

## Technologies Used

- **JavaScript** - Quiz logic and interaction
- **Node.js** - Server-side runtime
- **Express.js** - Web server and API endpoints
- **HTML** - Application structure
- **CSS** - Styling and responsive layout
- **JSON** - Quiz question storage
- **Git/GitHub** - Version control and project management

## How It Works

The application uses an Express server to provide API endpoints for
the quiz questions.

For example:

`GET /Quiz/TellMeQuestions/1`

returns the first Tell Me question.

The frontend uses JavaScript's `fetch()` function to request questions
from these endpoints and display them to the user.

The answers are shuffled before being displayed so that their order
changes between questions.

The Show Me quiz uses images as answer options. When an image is
selected, JavaScript checks whether it is the correct answer and
provides visual feedback using green and red borders.

## Running the Project Locally

Use bash for the following:

Clone the repository:

`git clone https://github.com/JoeOrchard03/DrivingTestRevisionApp-JavaScript.git`

Navigate to the project directory:

`cd DrivingTestRevisionApp-JavaScript`

Install the dependencies:

`npm install`

Start the application:

`npm start`

The application will run on:

http://localhost:3000

## What I Learned

This project gave me practical experience with:

- Creating and consuming API endpoints
- Using Node.js and Express
- Working with JSON data
- Using asynchronous JavaScript and fetch()
- Manipulating the DOM
- Managing application state and scoring
- Structuring a small full-stack web application
- Deploying a Node.js application

## Future Improvements

- Adding more questions
- Adding a timer
- Tracking previous quiz results
- Adding a database for question storage
- Adding user accounts and progress tracking

## Live Demo:

Use the app here on Render: <br>
https://drivingtestrevisionapp-javascript.onrender.com
