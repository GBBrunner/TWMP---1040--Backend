import { createObjectCsvWriter } from "csv-writer";

export const users = [
    {id:1, fullName: 'John Doe', age: 25},
    {id:2, fullName: 'Jane Smith', age: 19},
    {id:3, fullName: 'Alice Johnson', age: 30},
    {id:4, fullName: 'Bob Brown', age: 17},
    {id:5, fullName: 'Charlie Davis', age: 22}
]
const csvWriter = createObjectCsvWriter({
    path: 'output/filtered.csv',
    header: [
        {id: 'id', title: 'ID'},
        {id: 'name', title: 'Full Name'},
        {id: 'age', title: 'Age'}
    ]
})
csvWriter.writeRecords(users);
console.log('CSV file written to output/filtered.csv successfully');