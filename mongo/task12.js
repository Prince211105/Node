const dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const Data = require('./users')
const DATABASE = process.env.DATABSEURL

app.use(express.json())



mongoose.connect(DATABASE).then(() => {
    console.log("Mongodb");
}).catch((err) => console.log("Mongo error", err))


// const userSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })

// const Data = mongoose.model('data', userSchema)

app.get('/api/book', async (req, res) => {
    const data = await Data.find({})
    res.json(data)
})

app.get('/api/book/:id', (req, res) => {
    Data.findById(req.params.id).then(note => {
        res.json(note)
    })
})

app.post('/api/book', async (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        res.status(404).json({
            error: 404,
            message: "please enter all fields!"
        })
    }

    const data = await Data.create({
        name: name,
        number: number
    })

    console.log("mongo db", data);
    return res.json({ status: "success" })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
