"use strict";
exports.__esModule = true;
// import { Dish } from './dish';
var dish_data_ex_1 = require("./dish_data_ex");
// import { square, diag } from './dish_data_ex';
// console.log(square(11)); // 121
// console.log(diag(4, 3)); // 5
// var square = require('./dish_data_ex');
// console.log(square(11)); // 121
console.log(dish_data_ex_1.dish_data);
console.log(dish_data_ex_1.dish_data.length);
var dish;
dish = dish_data_ex_1.dish_data.map(function (d) {
    return { name: d.name, description: d.description };
});
console.log(dish.length);
console.log(dish);
console.log(JSON.stringify(dish[1]));
console.log(dish[1]);
