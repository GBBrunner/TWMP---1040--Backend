import { dir } from 'console';
import express from 'express';
import fs from 'fs';
import path from 'path';

//To use res.sendFile
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.cookie('mycookie', 'myValue', {
        httpOnly: true, // allow JS to access for demo (not for prod)
        maxAge: 120000 // 2 minutes
    });
    console.log(res.getHeaders());
    res.send('<span style="color: blue;">Hello, Express!</span>');
});

app.get('/time', (req, res) => {
    const timestamp = new Date()
    res.send(`The current time is: ${timestamp}`);
});
app.get('/file', (req, res) => {
    const filePath = './public/sampletext.txt';
    res.sendFile(path.join(__dirname, filePath), err => {
        if (err) return nextTick(err);
    });
});
app.post('/user', (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const username = req.body.username;
    res.send(`Welcome, ${firstname} ${lastname} (${username})`);
});
app.get('/{apple}pie/:count', (req, res) => {
    const count = req.params.count;
    res.send(`Pies requested: ${count}`);
});
app.get(/.*fly$/, function (req, res) {
    res.send(`${req.path} contains /.*fly$/`);
});
app.get('/classTime/:from-:to', (req, res) => {
    let from = req.params.from;
    let to = req.params.to;
    let msg = `class begins at ${from} and ends at ${to}`;
    console.log(req.params);
    res.send(`${msg}`);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});