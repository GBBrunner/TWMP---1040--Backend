const readline = require('readline');
const EventEmitter = require('events');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class GroceryEmitter extends EventEmitter {}
const groceryEmitter = new GroceryEmitter();

let groceryList = [];
let index = 0;

groceryEmitter.on('exit', () => {
    console.log("Your grocery list:");
    groceryList.forEach(entry => console.log(entry));
    rl.close();
});

groceryEmitter.on('ask', () => {
    rl.question("What to add to grocery list? (type 'exit' to finish) ", (item) => {
        if (item.toLowerCase() === 'exit') {
            groceryEmitter.emit('exit');
        } else {
            index++;
            groceryList.push(index + ": " + item);
            console.log(`Added ${item} to your grocery list.`);
            groceryEmitter.emit('ask');
        }
    });
});

groceryEmitter.emit('ask');