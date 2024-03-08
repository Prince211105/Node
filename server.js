const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "important": true
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "important": false
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
    }
]
//Users.push({ id: Users.length + 1, ...body })
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
const generateId = () => {
    
    //const maxId = notes.push({id : notes.length + 1,...body})
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1 
}

app.post('/api/notes', (request, response) => {
    const body = request.body
    //notes.push({id : notes.length + 1})
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        id: generateId(),
        content: body.content,
        important: body.important,

    }

    notes = notes.concat(note)
    console.log(note)
    response.json(note)
})

app.listen(2002)