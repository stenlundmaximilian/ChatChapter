const mongoose = require('mongoose')
const characterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    hobby: {
        type: String
    },
    trait:{
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Character',characterSchema)