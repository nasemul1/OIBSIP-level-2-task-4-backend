const express = require("express");
const cors = require("cors");
const fs = require('fs');
const users = require("./db.json");
const app = express();

const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: 'https://nasemul1.github.io/'
}));

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.route('/api/users/:id')
.get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push(body);
    fs.writeFile('./db.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
        return res.json({ status: 'success', id: body.id });
    });
});

app.listen(PORT, () => console.log(`Server has started at port: ${PORT}`));
