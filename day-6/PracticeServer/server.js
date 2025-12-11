const net = require('net');
const port = 5000;

const server = net
    .createServer((client) => {
        client.write('Welcome to the chat room!\n');

})
    .listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


