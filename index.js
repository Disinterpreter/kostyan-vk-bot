const Bot = require('./bot');
const express = require('express');
const app = express();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

app.use(express.json());

app.post(`/${config['link-path']}`, (req, res) => {
    Bot.call(req.body, res)
});

app.listen(config['listen-port']);