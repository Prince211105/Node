const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT
const DATABASE = process.env.DATABSEURL
const Data = require('./users')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB");
}).catch(err => console.log(err))


const errorhandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return res.status(404).json({ message: 'Not found' })
    }
    next(error)
}


app.get('/api/persons', (req, res) => {
    Data.find({}).then((data) => {
        res.json(data)
    })
})

// app.delete('/api/persons/:id', (req, res, next) => {
//     Data.findByIdAndDelete(req.params.id).then((data) => {
//         res.json({ status: "success" })
//     }).catch(error => next(error))
// })

// app.use(errorhandler)
app.delete('/api/persons/:id', (req, res, next) => {
    Data.findByIdAndDelete(req.params.id).then(() => {
        res.json({ status: "success" })
    }).catch(error => next(error))
})

app.use(errorhandler)





app.listen(PORT)