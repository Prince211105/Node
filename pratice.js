const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 2000
app.use(express.json())
app.use(cors())

let Phonebook = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
]

app.use(express.static('dist'))
app.get('/api/data', (req, res) => {
    res.json(Phonebook)
})

app.get('/api/data/:id', (req, res) => {
    let id = Number(req.params.id)
    let data = Phonebook.find(e => e.id === id)
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

app.put('/api/data/:id', (req, res) => {
    let id = Number(req.params.id)
    let name = req.body.name
    let number = req.body.number

    let index = Phonebook.findIndex(phone => {
        return phone.id == id
    })
    if (index >= 0) {
        let Phone = Phonebook[index]
        Phone.name = name
        Phone.number = number
        res.json(Phone)
    }
    else {
        res.status(404).json({
            error: 404,
            Message: "Data is not found"
        })
    }
})

app.delete('/api/data/:id', (req, res) => {
    let id = Number(req.params.id)
    Phonebook = Phonebook.filter(item => item.id !== id)
    res.json({
        error: 404
    })
})

app.use((req, res, next) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(404).json({
            error: 404,
            message: "name and number is missing"
        })
    }
    next()
})

app.use((req, res, next) => {
    const { name } = req.body
    const isadd = Phonebook.find(phone => phone.name === name)

    if (isadd) {
        return res.status(404).json({
            error: 404,
            message: "must be name unique"
        })
    }
    next()
})



const newid = () => {
    let maxId = Phonebook.length > 0 ? Math.max(...Phonebook.map(e => e.id)) : 0
    return maxId + 1;
}

app.post('/api/data', (req, res) => {
    const { name, number } = req.body

    const Phone = {
        name: name,
        number: number,
        id: newid()
    }

    Phonebook.push(Phone)
    res.json(Phone)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})