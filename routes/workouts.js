const express = require("express")
const router = express.Router()
const Workout = require('../models/workout')

//All workouts route
router.get("/", async (req, res) => {
    const workouts = await Workout.find()
    res.json({workouts})
})

//delete workout route
router.delete('/delete/:id', async (req,res) => {
    const objectId = req.params.id
    try{
        deletedObj = await Workout.findByIdAndRemove(objectId)
        console.log(deletedObj)
        if (!deletedObj) {
            return res.status(404).json({ error: 'Object not found' });
        }
        res.status(200).json({ message: 'Object deleted successfully' });
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Could not delete object' });
    }
})

//Create Workout Route
router.post('/', async (req, res) => {
    const { name, type, exercises, userId} = req.body
    const workout = await new Workout({
        userId: userId,
        name: name,
        type: type,
        template: true,
        date: new Date(Date.now()).toString().substring(0,24),
        exercises: exercises
    })
    try {
        const newWorkout = await workout.save()
    } catch (error) {
        console.log(res)
    }
})

module.exports = router