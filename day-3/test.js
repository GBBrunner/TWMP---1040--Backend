// let fruitSalad = ["Apple", "Banana", "Orange", "Kiwi"]
// const args = fruitSalad.slice(2);
// if (args.length > 0) {
//     console.log(args);
// }
// console.log(fruitSalad);

const args = process.argv.slice(2);
if (args.length > 0) {
    console.log(args);
}