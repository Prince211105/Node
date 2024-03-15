const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const Notes = require('./users')
const mongoose = require('mongoose')
const cors = require('cors')
const DATABASE = process.env.DATABSEURL

app.use(cors())
app.use(express.json())

mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB")
}).catch(error => {
    console.log(error);
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return res.status(404).json({ message: "Data is not found" })
    }
    next(error)
}

app.get('/api/persons', (req, res) => {
    Notes.find({}).then(note => {
        res.json(note)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Notes.findById(req.params.id).then(note => {
        res.json(note)
    }).catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT)