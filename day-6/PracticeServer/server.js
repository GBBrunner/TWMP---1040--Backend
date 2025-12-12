// Command handler for server terminal
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    const cmd = input.trim().toLowerCase();
    if (cmd === 'users') {
        console.log('Current users:', users.map(u => u.username));
    }
    if (cmd.startsWith('kick ')) {
        const usernameToKick = cmd.split(' ')[1];
        const kickReason = cmd.split(' ').slice(2).join(' ') || 'No reason provided';
        const userObj = users.find(u => u.username.toLowerCase() === usernameToKick.toLowerCase());
        if (userObj) {
            userObj.client.write(`You have been kicked by the server. Reason: "${kickReason}"\n`);
            userObj.client.end();
            users = users.filter(u => u.username.toLowerCase() !== usernameToKick.toLowerCase());
            console.log(`User ${userObj.username} has been kicked out.`);
        } else {
            console.log(`User ${usernameToKick} not found.`);
        }
    }
});

const net = require('net');

const port = 5000;
let users = [];

const server = net.createServer((client) => {
    client.write('Welcome to the chat room!\n');
    client.write('What is your username?\n');

    client.on('data', (data) => {
        const username = data.toString().trim();
        if (!username) {
            client.write('Please provide a valid username.\nWhat is your username?\n');
            return;
        }
        if (users.some(u => u.username === username)) {
            client.write('Username already taken. Please choose another one.\nWhat is your username?\n');
            return;
        }
        users.push({ username, client });
        console.log(`NewUser: ${username}`);
        client.write(`Hello, ${username}! You can start chatting now.\n`);
        // Here you can add more chat logic
    });
});

function startServer(port) {
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} in use, trying ${port + 1}...`);
        port++;
        setTimeout(() => startServer(port), 100);
    } else {
        console.error('Server error:', err);
    }
});

startServer(port);