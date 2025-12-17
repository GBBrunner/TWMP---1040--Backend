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
        httpOnly: false, // allow JS to access for demo (not for prod)
        sameSite: 'lax', // default, but explicit
        secure: false    // allow over http for localhost
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
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.send(`Welcome, ${firstname} ${lastname}`);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});