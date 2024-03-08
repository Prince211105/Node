const express = require('express')
const app = express()
let Phonebook = require('./Phonebook.json')

app.route('/api/number/:id')
    // .get((req, res) => {
    //     let id = Number(req.params.id)
    //     let data = Phonebook.find(data => data.id === id)
    //     if (data) {
    //         res.json(data)
    //     }
    //     else{
    //         res.status(404).send("{status : 404 , Message : Page is not found}")
    //     }

    // })
    .delete((req, res) => {
        let id = Number(req.params.id)
        Phonebook = Phonebook.filter(data => data.id !== id)
        res.status(204).end()
    })
app.listen(1004)