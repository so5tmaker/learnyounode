
const array = process.argv;
let sum = 0;
for (let index = 2; index < array.length; index++) {
    sum += Number(array[index]);
}
console.log(sum);