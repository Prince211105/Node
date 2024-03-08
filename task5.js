const express = require('express')
let app = express()
let Phonebook = require('./Phonebook.json')
const fs = require('fs')
app.use(express.urlencoded({ extended: false }));


// app.get('/api/persons', (req, res) => {
//     res.json(Phonebook)
// })

app.post('/api/persons', (req, res) => {
    let person = req.body
    Phonebook.push(person)
    fs.writeFile('./Phonebook.json', JSON.stringify(Phonebook), (err, data) => {
        return res.json({ status: 'success' })
    })
})


app.listen(1005)