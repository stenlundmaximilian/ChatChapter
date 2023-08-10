const mongoose = require('mongoose')
const storySchema = new mongoose.Schema({
    title: {
        type: String
    },
    story: {
        type: [String]
    },
    imageURL:{
        type:String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Story',storySchema)