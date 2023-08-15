const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Goal', goalSchema)