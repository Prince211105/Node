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
app.use(express.static('dist'))


mongoose.connect(DATABASE).then(() => {
    console.log("MongoDB");
}).catch(error => {
    console.log(error);
})

app.get('/api/data', (req, res) => {
    Notes.find({}).then((note) => {
        res.json(note)
    })
})

app.get('/api/data/:id', (req, res, next) => {

    Notes.findById(req.params.id).then(note => {
        if (note) {
            res.json(note)
        }
    }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    } 
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}




// app.use(errorHandler)

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }

// // olemattomien osoitteiden käsittely


app.delete('/api/data/:id', (req, res, next) => {
    Notes.findByIdAndDelete(req.params.id).then(() => {
        res.json({ status: "success" })
    }).catch(error => next(error))
})

app.use(errorHandler)


app.put('/api/data/:id', (request, response, next) => {

    const { number } = request.body
  
    Notes.findByIdAndUpdate(
      request.params.id, 
  
      { number },
      { new: true, runValidators: true, context: 'query'}
    ) 
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

app.use(errorHandler)


app.post('/api/data', (req, res, next) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ meg: 'Name and Number are required!' })
    }

    const note = new Notes({
        name: name,
        number: number
    })

    note.save().then(savedata => {
        res.json(savedata)
    }).catch(error => next(error))
})
app.use(errorHandler)


app.listen(PORT)