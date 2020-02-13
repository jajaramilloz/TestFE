const nums = [ 1.0, 2.0, 3.0];
const add = (a,b) => a + b;
const result = nums.reduce(
    (accumulator, current) => {
        console.log(">", accumulator, " ", current);
        return add(accumulator, current);
    },
    100 //default value to start with
);
console.log(result);

const orders = [
    { id: 'a', total: 11.00},
    { id: 'b', total: 23.00},
    { id: 'c', total: 7.00}
];
let total = orders.reduce(
    (accumulator, currentOrder) => {
        console.log(">>", accumulator, " ", currentOrder);
        return accumulator + currentOrder.total
    }, 
    0
);
console.log(total);

total = orders.reduceRight(
    (accumulator, currentOrder) => {
        console.log(">>>", accumulator, " ", currentOrder);
        return accumulator + currentOrder.total
    }, 
    0
);
console.log(total);
