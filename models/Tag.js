const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    tagId: {
        type: String,
    },
    tagTitle: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Tags', TagSchema);