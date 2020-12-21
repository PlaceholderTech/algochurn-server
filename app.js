const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
require('dotenv/config');

const app = express();
app.use(bodyParser.json());


// Import routes

const questionsRoute = require('./routes/questions');

app.use('/questions', questionsRoute);


app.get('/', (req, res) => {
    res.send('We are on home')
})

// Connect to MongoATLAS DB
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB');
})

// Listen to server

app.listen(PORT);