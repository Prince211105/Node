const express = require('express')
const app = express()
const morgan = require('morgan')

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

app.use(morgan('tiny'))
//you have got a full data

// app.get('/person',(req,res) => {
//     res.json(Phonebook)
// })


//you have get the individual data in database

// app.get('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const getid = Phonebook.find(phone => phone.id === id)
//     if (getid) {
//         res.json(getid)
//     }
//     else {
//         res.status(400).json({
//             status: 404,
//             Message: "The contact with the given ID was not found."
//         })
//     }

// })

//you have delete a particular data in database

// app.delete('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     Phonebook = Phonebook.filter(phone => phone.id !== id)
//     res.status(204).json(
//         { status: "success" }
//     )
// })



app.use(express.json())

//get to show the full data of database

// app.get('/api/persons', (req, res) => {
//     res.json(Phonebook)
// })



// app.use((req, res, next) => {
//     const { name, number } = req.body

//     if (!name || !number) {
//         res.status(404).json(
//             {
//                 error: "name and number is missing"
//             })
//     }
//     console.log("qweer")
//     next()
// })

// app.use((req, res, next) => {
//     const { name } = req.body
//     if (Phonebook.find(person => person.name === name)) {
//         res.status(400).json({
//             error: 'name must be unique'
//         })
//     }
//     console.log("weer")
//     next()
// })

//create a new data in database

const newid = () => {
    const maxID = Phonebook.length > 0 ? Math.max(...Phonebook.map(p => p.id)) : 0
    return maxID + 1;
}

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({
            error: 'name and number is missing'
        })
    }

    const isPersonAdded = Phonebook.find((person) => person.name === name)

    if (isPersonAdded) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const Phone = {
        name: name,
        number: number,
        id: newid()
    }

    Phonebook.push(Phone)
    console.log(Phone);
    res.json(Phone)

})




app.listen(1006)