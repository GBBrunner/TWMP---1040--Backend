const fs = require('fs');
const { argv } = require('node:process');
const fileName = argv[2];
const writeFileName = argv[3];
const replaceWord = argv[4];
const newWord = argv[5];

if (!fileName || !writeFileName || !replaceWord || !newWord) {
    console.error("Please provide all requirements (format: node fileSearch.js <fileName> <writeFileName> <replaceWord> <newWord>) ")
    process.exit(1);
}
if (!fs.existsSync(fileName)) {
    console.error("File not found");
    process.exit(1);
}
const regex = new RegExp(`\\b${replaceWord.toLowerCase()}\\b`, 'gi');

fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    let count = 0;
    const modifiedData = data.replace(regex, (match) => {
        count++;
        return newWord;
    });

    fs.writeFile(writeFileName, modifiedData, 'utf8', (err) => {
        if (err) {
            console.error("Error writing to the file:", err);
            return;
        }
        console.log(`All instances of "${replaceWord}" have been replaced with "${newWord}", ${count} times.`);
    });
});