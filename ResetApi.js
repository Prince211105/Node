const express = require('express');
const app = express()
let Users = require('./MOCK_DATA.json')
const fs = require('fs')

// app.get('/Users',(req,res) => {
//     res.json(Users);
// })

//mediater
app.use(express.urlencoded({ extended: false }));

app.get('/Users', (req, res) => {
    const html = `
    <ul>
    ${Users.map(user => `<li>${user.id} ${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

//Rest Api
app.get('/api/Users', (req, res) => {
    res.json(Users)
})


app
    .route("/api/Users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = Users.find(user => user.id === id)
        if (user) {
            res.json(user)
        }
        else {
            res.status(404).end("{Status: 404, Message: Page not found}")
        }

    }).
    patch((req, res) => {
        //Edit user with id
        res.json({ status: "Pending" })
    })

app.delete("/api/Users/:id", (req, res) => {
    const id = Number(req.params.id)
    //let myVar = Users;
    Users = Users.filter(user => user.id !== id)
    res.status(204).end();
});

app.post('/api/Users', (req, res) => {
    const body = req.body;
    Users.push({ id: Users.length + 1, ...body })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Users), (err, data) => {
        return res.json({ status: "success", id: Users.length })
    })

})




app.listen(51000)