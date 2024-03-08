const express = require('express')
const app = express()
let Phonebook = require('./Phonebook.json')





app.route('/api/number/:id')
    .get((req, res) => {
        let id = Number(req.params.id);
        let data = Phonebook.find(phone => phone.id === id)
        if (data) {
            res.json(data.number)
        } else {
            res.status(404).end("{status : 404 , Message : Page not found}")
        }

    })

// app.get('/info', (req, res) => {
//     res.json(Phonebook)
// })



app.listen(1003)