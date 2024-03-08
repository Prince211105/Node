const express = require('express')
const app = express()
let Phonebook = require('./Phonebook.json')


app.get('/info', (req, res) => {

    var d = new Date("2024-03-07").toString();
    const Phonebooklength = `Phonebook has info for ${Phonebook.length} people.`
    //var utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    // const time = {
    //     time : new Date("2024-03-07").toString(),
    //     // "time": new Date().toLocaleTimeString(),
    //     // "date": new Date().toDateString(),
    //     Phonebook_length :`Phonebook has info for ${Phonebook.length} people.`
    // }
    res.send(`${Phonebooklength}
    
    ${d}
    
    `)
    //res.send(time)
    //res.send(`Phonebook has info for ${Phonebook.length} people.`,d)
    //res.send(`Phonebook has info for ${Phonebook.length} people.`)

})


// app.get('/info', (req, res) => {

//     var d = new Date();
//     var utcDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()));
//     var data = `Phonebook has info for ${Phonebook.length} people.`
//     // const time = {
//     //     "time": new Date().toLocaleTimeString(),
//     //     "date": new Date().toDateString(),
//     //     "data3" :`Phonebook has info for ${Phonebook.length} people.`
//     // }
//     //res.send(time)
//     res.send(`Phonebook has info for ${Phonebook.length} people.`)

// })

app.listen(1002)