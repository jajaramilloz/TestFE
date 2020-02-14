"use strict";
// https://www.typescriptlang.org/docs/handbook/basic-types.html
//boolean
var isDone = false;
//number
var decimal = 6;
var hexa = 0x0a;
var octal = 60;
var binary = 5;
//string
var color = "blue";
var templateStr = "Color is {$color}.";
//array
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
//tuple
var tu;
tu = ["diez", 10];
console.log(tu[0]);
console.log(tu[1]);
//enum
var Color;
(function (Color) {
    Color[Color["Red"] = 4] = "Red";
    Color[Color["Green"] = 5] = "Green";
    Color[Color["Blue"] = 6] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log(c); //5
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 3] = "Green";
    Color2[Color2["Blue"] = 4] = "Blue";
})(Color2 || (Color2 = {}));
;
var c2 = Color2.Blue;
console.log(c2); //4
//any
var notSure = 4;
notSure = "maybe four";
notSure = false;
var list3 = [1, true, 'one'];
//void  -- the opposite of any
//  as a variable only accept null
function warnUser() {
    console.log('warning');
}
//null & undefined
// they could be assigned to other data types
var n = null;
var u = undefined;
//never
//  the type of values that never occurs
function error(message) {
    throw new Error(message);
}
function fail(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) {
    }
}
create(null);
create({ prop: 0 });
//type assertions
var someValue = 'string';
var strLen1 = someValue.length;
var strlen2 = someValue.length;
//union types
var ut;
var ut2;
