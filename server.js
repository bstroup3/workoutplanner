if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')

const indexRouter = require("./routes/index")
const workoutRouter = require("./routes/workouts")
const testRouter = require("./routes/tests")
const goalRouter = require("./routes/goals")
const userRouter = require("./routes/users")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(express.static('/workout-planner/public'))
app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongoose"))

app.use('/', indexRouter)
app.use('/workouts', workoutRouter)
app.use('/test', testRouter)
app.use('/goals', goalRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT || 3003)