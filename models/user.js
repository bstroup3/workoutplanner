const mongoose = require('mongoose')

const setsSchema = new mongoose.Schema({
    reps: {
        type: Number
    },
    weight: {
        type: Number
    }
})

const workoutSchema = new mongoose.Schema({
    date: String,
    sets: [setsSchema]
})

const exerciseSchema = new mongoose.Schema({
    ename: {
        type: String
    },
    workouts: [workoutSchema]
})

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    exercises: [exerciseSchema],
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)