const express = require('express')
const app = express()
const Phonebook = require('./Phonebook.json')

app.use((req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next()
})

//app.use(requestLogger)

app.use((req,res) => {
    res.status(404).send({error : 'unknown endpoint'})
})


app.get('/info', (req, res) => {
    res.json(Phonebook)
})

app.listen(1108)