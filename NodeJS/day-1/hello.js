// Print only even using recursion, this acts as a for loop without using any loop constructs
value = 20;
function onlyEvenRecursive(count, i = 1) {
    if (i > count) {
        return;
    }
    if (i % 2 == 0) {
        console.log(i/2 + ": counting: " + i);
    }
    onlyEvenRecursive(count, i + 1);
}
onlyEvenRecursive(value);
