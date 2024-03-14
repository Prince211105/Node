const dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const Notes = require('./users')
const mongoose = require('mongoose')
const cors = require('cors')
const DATABASE = process.env.DATABSEURL
app.use(express.json())


app.use(cors())


mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB")
}).catch(err => {
    console.log("error", err);
})

app.get('/api/persons', (req, res) => {
    Notes.find({}).then(data => {
        res.json(data)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Notes.findById(req.params.id).then((note) => {
        res.json(note)
    })
})

app.listen(PORT)