const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const setsSchema = new mongoose.Schema({
    reps: {
        type: Number
    },
    weight: {
        type: Number
    }
})

const exerciseSchema = new mongoose.Schema({
    ename: {
        type: String
    },
    sets: [setsSchema]
})

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    template: {
        type: Boolean
    },
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
    },
    exercises: [exerciseSchema]

})

module.exports = mongoose.model('Workout', workoutSchema)