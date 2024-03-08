const express = require('express')
const app = express()
const Phonebook = require('./Phonebook.json')
const morgan = require('morgan')


app.use(morgan('tiny'))

app.get('/info',(req,res) => {
    res.json(Phonebook)
    console.log(Phonebook)
})


app.listen(1007)