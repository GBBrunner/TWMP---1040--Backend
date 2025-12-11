const net = require('net');

const client = net.createConnection(5000, () => {
    console.log('Connected');
});
client.setEncoding('utf8');
client.on('data', (data) => {
    console.log('Successfully received server data:');
    console.log(data);
});