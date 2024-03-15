const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 2020
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Phonebook").then(() => {
    console.log("conataing");
}).catch((err) => console.log("Mongo error", err))

//schema

const userSchema = new mongoose.Schema({
    name: String,
    number: String
})

const User = mongoose.model('user', userSchema)





app.use(express.static('dist'))
app.get('/api/data', async (req, res) => {
    const dataBaseData = await User.find({})
    res.json(dataBaseData)
})

app.get('/api/data/:id', async (req, res) => {
    const data = await User.findById(req.params.id)
    if (data) {
        res.json(data)
    }
    else {
        res.status(404).json({
            error: 404,
            message: "Data is not found"
        })
    }
})

app.put('/api/data/:id', async (req, res) => {

    const { name, number } = req.body

    await User.findByIdAndUpdate(req.params.id, { name: name }, { number: number})
    return res.json({ status: "Success" })

    // let id = Number(req.params.id)
    // let name = req.body.name
    // let number = req.body.number

    // let index = User.findIndex(phone => {
    //     return phone.id == id
    // })
    // if (index >= 0) {
    //     let Phone = User[index]
    //     Phone.name = name
    //     Phone.number = number
    //     res.json(Phone)
    // }
    // else {
    //     res.status(404).json({
    //         error: 404,
    //         Message: "Data is not found"
    //     })
    // }
})

app.delete('/api/data/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "Success"})
    // let id = Number(req.params.id)
    // Phonebook = Phonebook.filter(item => item.id !== id)
    // res.json({
    //     error: 404
    // })
})


app.post('/api/data', async (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        res.status(404).json({
            error: 404,
            message: "please enter all fields!"
        })
    }

    const result = await User.create({
        name: name,
        number: number
    })

    console.log("mongo db", result);

    return res.status(201).json({ msg: "success" })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})