const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Workout = require('../models/workout')
const Goal = require('../models/goal')

//All users route
router.get("/", async (req, res) => {
    const users = await User.find()
    res.json({users})
})

//Create new user route
router.post("/", async (req,res) => {
    const {fname, lname, username, password} = req.body
    const user = await new User({
        fname: fname,
        lname: lname,
        userName: username,
        password: password,
        date: new Date(Date.now()).toString().substring(0,24)
    })
    try{
        const newUser = await user.save()
    } catch(error){
        console.log(res)
    }
})

//Delete user route
router.delete("/delete/:id", async (req,res) => {
    const objectId = req.params.id
    try{
        deletedObj = await User.findByIdAndRemove(objectId)
        deletedWorkouts = await Workout.deleteMany({userId: objectId})
        deletedGoals = await Goal.deleteMany({userId: objectId})
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

//Update User to add excersize data for monitoring
router.put("/enter/:id", async (req,res) => {
    const exercises = req.body

    try {
        const user = await User.findById(req.params.id);

        exercises.forEach(async (exercise) => {
            const existingExercise = user.exercises.find(e => e.ename === exercise.ename);
            
            if (!existingExercise) {
                // Add new exercise to user's exercises array
                user.exercises.push(exercise);
            } else {
                // Update existing exercise
                const workoutIndex = existingExercise.workouts.findIndex(workout => workout.date === exercise.workouts[0].date);
                if (workoutIndex !== -1) {
                    existingExercise.workouts[workoutIndex].sets.push(...exercise.workouts[0].sets);
                } else {
                    existingExercise.workouts.push(exercise.workouts[0]);
                }
            }
        });

        await user.save();
        res.status(200).json({ message: 'Exercises added/updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update exercises' });
    }
});

module.exports = router