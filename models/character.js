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
    }
})

module.exports = mongoose.model('Character',characterSchema)