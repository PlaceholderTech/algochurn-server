const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const Question = require('../models/Question');

// Get all the posts
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch(err) {
        res.json({message: err})
    }
});

// Submit a post
router.post('/', async (req, res) => {

    const question = new Question({
        questionId: uuidv4(),
        title: req.body.title,
        problemStatement: req.body.problemStatement,
        solution: req.body.solution,
        sampleCode: req.body.sampleCode,
        tags: req.body.tags,
        problemDifficulty: req.body.problemDifficulty,
        language: req.body.language,
        companies: req.body.companies
    });

    try {
        const savedQuestion = await question.save();
        res.json(savedQuestion);
    }
    catch(err) {
        res.json({error: err});
    }

})

// Get specific post
router.get('/:questionId', async (req, res) => {
    const questionId = req.params.questionId;

    try {
        const result = await Question.find({questionId: questionId})
        res.json(result);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;