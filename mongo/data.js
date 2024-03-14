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
    console.log("Mongodb");
}).catch((err) => console.log("Mongo error", err))

app.get('/api/data', (req, res) => {
    Notes.find({}).then((note) => {
        res.json(note)
    })
})

app.get('/api/data/:id',(req,res) => {
    Notes.findById(req.params.id).then(note => {
        res.json(note)
    })
})


app.post('/api/data', (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({meg : 'Name and Number are required!'})
    }

    const note = new Notes({
        name: name,
        number: number
    })

    note.save().then(savedata => {
        res.json(savedata)
    })
})



app.listen(PORT)