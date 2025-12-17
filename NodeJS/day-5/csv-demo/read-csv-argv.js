import fs from 'fs';
import csv from 'csv-parser';
import { argv } from 'node:process';

let parseLang = argv[2] || 'English';
const results = [];
const filteredData = []

async function filterLang(data, language) {
    const filteredPeople = data.filter(person => person.language === language);
    filteredData.push(filteredPeople);
}

fs.createReadStream('data/languages.csv')
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', async () => {
        filterLang(results, parseLang);
        console.log('CSV parsed:', filteredData);
    });
