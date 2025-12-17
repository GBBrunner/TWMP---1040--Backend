const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.createConnection(5000, () => {
    console.log('Connected');
});
client.setEncoding('utf8');

let usernameSet = false;

client.on('data', (data) => {
    const message = data.toString();
    process.stdout.write(message);
    if (!usernameSet && message.includes('What is your username?')) {
        rl.question('', (answer) => {
            client.write(answer + '\n');
        });
    } else if (!usernameSet && message.includes('You can start chatting now.')) {
        usernameSet = true;
        rl.prompt();
    } else if (usernameSet) {
        rl.prompt();
    }
});

rl.on('line', (input) => {
    if (usernameSet) {
        client.write(input + '\n');
    }
});

client.on('end', () => {
    console.log('Disconnected from server');
    rl.close();
});