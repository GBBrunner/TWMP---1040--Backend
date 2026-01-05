const express = require('express');
const JWT = require('jsonwebtoken');
const {expressjwt}= require("express-jwt");
const app = express();

app.use(express.json());

const users = [
    {
        userId: 'john_doe',
        firstName: 'John',
        lastName: 'Doe'
    },
    {
        userId: 'jane_smith',
        firstName: 'Jane',
        lastName: 'Smith'
    }
];
// Not used in production, it is normally hashed and stored securely
app.post("/login", (req, res) => {
    const {username,password} = req.body;
    const user = users.find((user) => user.userId === username);
    if (!user || password !== 'password') {
        return res.status(401).send('Invalid credentials');
    }
    const token = JWT.sign({userID: user.user}, secret, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
    return res.json({ token: token });
});
app.get('/getCourses', (req, res) => {
    "/getCourses",
    expressjwt({secret: secret, algorithms: ['HS256']}),
    (req, res) => {
        const courses = [
});
app.get("/users/:userId", (req, res) => {
    const user = users.find((user) => user.userId === req.params.userId);
    res.json(user);
});
app.use((err, req, res) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({errorMessage: 'Invalid token'});
    }
})
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
