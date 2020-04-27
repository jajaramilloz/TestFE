// import { Dish } from './dish';
import { dish_data } from './dish_data_ex';

// import { square, diag } from './dish_data_ex';
// console.log(square(11)); // 121
// console.log(diag(4, 3)); // 5

// var square = require('./dish_data_ex');
// console.log(square(11)); // 121

console.log(dish_data);
console.log(dish_data.length);
let dish;
dish = dish_data.map((d) => {
    return {name: d.name, description: d.description};
});
console.log(dish.length);
console.log(dish);
console.log(JSON.stringify(dish[1]));
console.log(dish[1]);
