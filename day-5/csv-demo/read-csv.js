import fs from 'fs';
import csv from 'csv-parser';
const results = [];
const filteredData = []

async function skipAdults(data, ageLimit) {
    const youngPeople = data.filter(person => person.age < ageLimit);
    filteredData.push(youngPeople);
}

fs.createReadStream('data/input.csv')
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', async () => {
        skipAdults(results, 21);
        console.log('CSV parsed:', filteredData);
    });
