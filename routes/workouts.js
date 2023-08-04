const express = require("express")
const router = express.Router()
const Workout = require('../models/workout')
//All workouts route
router.get("/", async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const workouts = await Workout.find(searchOptions)
        res.render("workouts/index", {
            workouts: workouts,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
})

//New Workout Route
router.get("/new", (req,res) => {
    res.render("workouts/new", { workout: new Workout() })
})

//Create Workout Route
router.post('/', async (req, res) => {
    const workout = new Workout({
        name: req.body.name,
        type: req.body.type,
        date: new Date(Date.now()).toString().substring(0,24)
    })
    try {
        const newWorkout = await workout.save()
        res.redirect(`workouts`)
    } catch (error) {
        res.render('workouts/new', {
            workout: workout,
            errorMessage: 'Error creating Workout'
        })
    }
})

module.exports = router