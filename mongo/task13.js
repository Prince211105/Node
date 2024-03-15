const dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const Notes = require('./users')
const mongoose = require('mongoose')
const cors = require('cors')
const DATABASE = process.env.DATABSEURL
app.use(express.json())


app.use(cors())


mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB")
}).catch(err => {
    console.log("error", err);
})

const Errorhandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return res.status(404).json({ message: "Not found" })
    }
    next(error)
}

app.get('/api/persons', (req, res) => {
    Notes.find({}).then(data => {
        res.json(data)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Notes.findById(req.params.id).then((note) => {
        if (note) {
            res.json(note)
        }
    }).catch(error => next(error))
})

app.use(Errorhandler)

app.delete('/api/persons/:id', (req, res, next) => {
    Notes.findByIdAndDelete(req.params.id).then(() => {
        return res.json({ result: "Deleted!" })
    }).catch(error => next(error))
})

app.use(Errorhandler)


// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)

//     if (error.name === 'CastError') {
//       return response.status(400).send({ error: 'malformatted id' })
//     }

//     next(error)
//   }

//   // tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
//   app.use(errorHandler)

app.listen(PORT)