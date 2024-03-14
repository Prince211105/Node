const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Data = require('./users')
const PORT = process.env.PORT
const DATABASE = process.env.DATABSEURL
app.use(cors())
app.use(express.json());

mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB");
}).catch((err) => {
    console.log(err);
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(404).json({
            error: 404,
            message: "Name and number is missing"
        })
    }

    Data.find({}).then(person => {
        if (person.some(p => p.name === name)) {
           return res.status(404).json({
                error: 404,
                message: "name must be unique"
            })
        }

        const persons = new Data({
            name: name,
            number: number
        })

        persons.save().then(note => {
            res.json(note)

        })
    })
})

app.listen(PORT)