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

client.on('data', (data) => {
    const message = data.toString();
    process.stdout.write(message);
    if (message.includes('What is your username?')) {
        rl.question('', (answer) => {
            client.write(answer + '\n');
        });
    }
});

client.on('end', () => {
    console.log('Disconnected from server');
    rl.close();
});