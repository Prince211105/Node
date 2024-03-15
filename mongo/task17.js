const dotnev = require('dotenv')
dotnev.config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const DATABASE = process.env.DATABSEURL
const PORT = process.env.PORT
const Data = require('./users')


app.use(cors())
app.use(express.json())

mongoose.connect(DATABASE).then(() => {
    console.log("MOngodb");
}).catch(error => {
    console.log(error);
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return res.status(400).json({ error: 'malformatted id' })
    }
    next(error)
}

app.get('/api/persons', (req, res) => {
    Data.find({}).then(note => {
        res.json(note)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const { number } = req.body

    const person = {
        number: number
    }

    Data.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((note) => {
        res.json(note)
    }).catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT)