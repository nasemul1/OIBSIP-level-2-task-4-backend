const express = require("express");
const cors = require("cors");
const fs = require('fs');
const users = require("./db.json");
const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/api/users', (req, res) => {
    return res.json(users);
})

app
.route('/api/users/:id')
.get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push(body);
    fs.writeFile('./db.json', JSON.stringify(users), (err, data) => {
        return res.json( {status: 'success', id: `$body.id`} );
    });
})

app.listen(PORT, () => console.log(`Server has started at port: ${PORT}`))