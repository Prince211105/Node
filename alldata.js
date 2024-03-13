const express = require('express')
const app = express()
const PORT = 2001;
app.use(express.json())
const mongoose = require('mongoose')

let Phonebook = [
    {
        "id": 1,
        "name": "Prince Patel",
        "number": "12345",
        "email": "prince211103@gmail.com",
        "age": "20",
        "address": "B - 104 dharti saket height , gota ,ahmedabad"

    },
    {
        "id": 2,
        "name": "Himanshu Patel",
        "number": "9512175547",
        "email": "himanshupatel5052@gmail.com",
        "age": "26",
        "address": "London ,uk"

    }

]
app.use(express.static('dist'))
// mongoose.connect("mongodb://localhost:27017/Phonebook").then(() => {
//     console.log("conated to mongodb");
// })


app.get('/api/persons', (req, res) => {
    res.json(Phonebook)
})

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Phonebook = Phonebook.filter((person) => person.id !== id)
    res.json({
        error: 404,
        message: "some error to delete data"
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = Phonebook.find(person => person.id === id)
    if (data) {
        res.json(data)
    } else {
        res.status(404).json({
            error: 404,
            message: 'The data is not available'
        })
    }
})

app.put('/api/persons/:id', (req, res) => {
    const { name, number, email, age, address } = req.body;
    const id = Number(req.params.id);
    const index = Phonebook.findIndex(person => person.id == id);
    if (index >= 0) {
        let Phone = Phonebook[index]
        Phone.name = name
        Phone.number = number
        Phone.email = email
        Phone.age = age
        Phone.address = address
        res.json(Phone);
    } else {
        res.status(400).json({
            error: 400,
            message: 'Invalid ID!'
        });
    }
});


app.use((req, res, next) => {
    const { name, number, email, age, address } = req.body;
    if (!name || !number || !email || !age || !address) {
        return res.status(400).json({
            error: 404,
            message: 'Please provide complete details'
        })
    }
    next()
})

app.use((req, res, next) => {
    const { email } = req.body
    if (Phonebook.find(e => e.email === email)) {
        return res.status(409).json({
            error: 409,
            message: 'Email already in use'
        });

    }
    next()
})

const newid = () => {
    let maxId = Phonebook.length > 0 ? Math.max(...Phonebook.map(e => e.id)) : 0
    return maxId + 1;
}

app.post('/api/persons', (req, res) => {
    const { name, number, email, age, address } = req.body

    const person = {
        id: newid(),
        name: name,
        number: number,
        email: email,
        age: age,
        address: address
    }

    Phonebook.push(person);
    res.json(person)
    console.log(person);
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))