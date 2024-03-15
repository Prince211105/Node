const dotenv = require('dotenv');
dotenv.config()
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
    console.log("MongoDB");
}).catch((error) => {
    console.log("error", error);
})


const errorDatahandle = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return res.status(404).json({ message: "Data note found" })
    }
    next(error)
}

app.get('/api/persons', (req, res) => {
    Data.find({}).then(note => {
        res.json(note)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Data.findById(req.params.id).then(note => {
        res.json(note)
    }).catch(error => next(error))
})

app.use(errorDatahandle)

app.listen(PORT)