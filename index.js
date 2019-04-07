const Bot = require('./bot');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/bot', (req, res) => {
    Bot.call(req.body, res)
})

app.listen(1337)