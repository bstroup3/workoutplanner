const express = require("express")
const router = express.Router()
const Goal = require('../models/goal')

//All goals route
router.get("/", async (req, res) => {
    const goals = await Goal.find()
    res.json({goals})
})

//Create goals route
router.post('/', async (req,res) => {
    const {name, weight, reps, userId} = req.body
    const goal = await new Goal({
        userId: userId,
        name: name,
        reps: reps,
        weight: weight,
        date: new Date(Date.now()).toISOString()
    })
    try {
        const newGoal = await goal.save()
    } catch(error) {
        console.log(res)
    }
})

//Delete goals route
router.delete('/delete/:id', async (req,res) => {
    const objectId = req.params.id
    console.log(req.params)
    try{
        deletedObj = await Goal.findByIdAndRemove(objectId)
        if(!deletedObj){
            return res.status(404).json({error: 'Object not found'})
        }
        res.status(200).json({message: 'Object deleted Successfully'})
    } catch(error){
        console.log(error)
        res.status(500).json({error: 'Could not delete object'})
    }
})


//Delete goals route

module.exports = router