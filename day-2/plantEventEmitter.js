const EventEmitter = require('events');

class Plant extends EventEmitter {
    constructor(size = 0, hasBeenPlanted = false) {
        super();
        this.size = size;
        this.hasBeenPlanted = hasBeenPlanted;
    }
}
plantSim = new Plant();
plantSim.once('plant', () => {
    plantSim.hasBeenPlanted = true;
    plantSim.size += 1;
    console.log('The plant has been planted!');
});
plantSim.on('water', () => {
    if (plantSim.hasBeenPlanted) {
        if (plantSim.size < 5){
            plantSim.size += 1;
        }
        console.log(`The plant has been watered and is now size ${plantSim.size} inches tall.`);
    } else {
        console.log('You need to plant the seed first to water it.');
    }
});
plantSim.on('bugAttack', () => {
    if (plantSim.hasBeenPlanted && plantSim.size > 0) {
        plantSim.size -= 1;
        console.log(`The plant has been attacked by bugs and is now size ${plantSim.size} inches tall.`);
    } else if (!plantSim.hasBeenPlanted) {
        console.log('You were attacked by bugs, but there is no plant to damage.');
    } else {
        console.log('Your plant was attacked by bugs but is already at size 0 and cannot be damaged further.');
    }
});

plantSim.on('harvest', () => {
    if (plantSim.hasBeenPlanted) {
        console.log(`The plant has been harvested at size ${plantSim.size} inches tall.`);
        plantSim.hasBeenPlanted = false;
        plantSim.size = 0;
        plantSim.removeAllListeners();
        console.log('All plant event listeners have been removed.');
    } else {
        console.log('There is no plant to harvest.');
    }
});
plantSim.emit('bugAttack');
plantSim.emit('water');
plantSim.emit('plant');
plantSim.emit('water');
plantSim.emit('water');
plantSim.emit('water');
plantSim.emit('bugAttack');
plantSim.emit('bugAttack');
plantSim.emit('water');
plantSim.emit('harvest');
plantSim.emit('water');
