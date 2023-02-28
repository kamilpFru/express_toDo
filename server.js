const express = require('express')
const taskRouter = require('./routes/tasks')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const Task = require('./models/task')

mongoose.connect('mongodb://localhost/tododb')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false})) // req.body
app.use(methodOverride('_method')) // del

app.get('/', async (req, res) => {
    const tasks = await Task.find().sort({
        createdAt: 'desc'
    })
    res.render('tasks/index', { tasks: tasks})
})

app.use('/tasks', taskRouter)

app.listen(5001)