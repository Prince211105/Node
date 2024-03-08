const express = require('express')
const app = express()
let Phonebook = require('./Phonebook.json')
app.use(express.json())


app.get('/api/persons', (req, res) => {
    res.json(Phonebook)
})

app.listen(1001)