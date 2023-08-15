const express = require("express")
const router = express.Router()

router.get('/', (req,res) => {
    res.json({message: "go fuck yourself"})
  })

module.exports = router