const { argv } = require('node:process'); //Argument Vectors

console.log(argv[0]);
console.log(argv[1]);

//print process.argv
argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});

// Print only even using recursion, this acts as a for loop without using any loop constructs
value = argv[3];

function logResult(n){
    console.log(Math.round(n/2) + ": counting: " + n);
}

function oddOrEvenRecursive(count, i = 1) {
    if (isNaN(value)) {
        console.log("Please provide a number as the third argument.");
        return;
    }

    if (i > count) {
        return;
    }

    if (argv[2] === "odd"){
        if (i % 2 != 0) {
            logResult(i);
        }
    }else{
        if (argv[2] === "even") {
            if (i % 2 == 0) {
                logResult(i);
            }
        } else {
            console.log("Please provide 'odd' or 'even' as an argument.");
            return;
        }
    }
    oddOrEvenRecursive(count, i + 1);
}
oddOrEvenRecursive(value);