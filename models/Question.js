const mongoose = require('mongoose');
const slugify = require('slugify');

const QuestionSchema = mongoose.Schema({
    questionId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    problemStatement: {
        type: String,
        required: true,
    },
    solution: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    sampleCode: {
        type: [String],
    },
    tags: [String],
    problemDifficulty: {
        type: [String],
        required: true,
    },
    language: {
        type: [String],
        required: true,
        
    },
    likeCounter: {
        type: Number,
        default: 0
    },
    companies: {
        type: [String],
        required: true
    },
    slug: {
        type: String,
        unique: true
    }

});

QuestionSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
  
    next();
  });

module.exports = mongoose.model('Questions', QuestionSchema);