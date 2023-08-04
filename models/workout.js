const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Workout', workoutSchema)