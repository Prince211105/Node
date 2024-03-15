const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const DATABASE = process.env.DATABSEURL
const PORT = process.env.PORT
const Data = require('./users')
app.use(cors())
app.use(express.json())


mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB");
}).catch(error => {
    console.log(error);
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


app.get('/api/data', (req, res) => {
    Data.find({}).then(note => {
        res.json(note)
    })
})

app.post('/api/data', (req, res, next) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ meg: 'Name and Number are required!' })
    }

    const person = new Data({
        name: name,
        number: number
    })

    person.save().then(note => {
        res.json(note)
    }).catch(error => next(error))
})
app.use(errorHandler)

app.listen(PORT)