const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 1008
//const morganBody = require('morgan-body')
//const bodyParser = require('body-parser')
let Phonebook = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
]

app.use(express.static('dist'))
app.use(cors({
    origin: 'https://node-2-zph6.onrender.com'
}))
// app.options('localhost/:1/', cors());
app.use((req, res, next) => {
    res.setHeader('x-cors-api-key' , 'temp_9738fa5b8a277d54e53f109f732163b4')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Methods', 'Origin, X-Requested-with, Content-Type, Accept ,Authorization');
    next();
})

app.use(express.json())
//morgan methos name,path,run time duration
//app.use(morgan('combined'))

// morgan.token('host', (req, res) => {
//     return res.hostname
// })

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))


//app.use(bodyParser.json())
//morganBody(app)


app.get('/api/persons', (req, res) => {
    console.log(Phonebook);
    res.json(Phonebook)
    
})

app.use((req, res, next) => {
    const { name, number } = req.body
    if (!name || !number) {
        return res.status(400).json({
            error: "Name and number is missing"
        })
    }
    next();
})

app.use((req, res, next) => {
    const { number } = req.body;
    if (Phonebook.find(unique => unique.number === number)) {
        return res.status(400).json({
            error: "number must be unique"
        })
    }
    next();
})

// const getnewID = () => {
//     let maxID = Phonebook.length > 0 ? Math.max(...Phonebook.map(p => p.id)) : 0
//     return maxID + 1
// }

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    const persondata = {
        name: name,
        number: number,
        // id: getnewID()
    }
    Phonebook = Phonebook.concat(persondata)
    //console.log(persondata);
    res.json(persondata)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})