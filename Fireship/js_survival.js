//prototypes
console.log(typeof true); //boolean
console.log(null == undefined); //true
console.log(null === undefined); //false

var x;
console.log(x); //undefined
function y() {};
console.log(y()); //undefined
var z = null;
console.log(z); //null

console.log(typeof []); //object
console.log(typeof {}); //object
console.log(typeof function() {}); //function

var a = {}; //define
a['foo'] = 'bar'; //mutate
console.log(a);

var b = Boolean(false); //no to do this way

//control flow
var truthy;

if (truthy) {
    //do this
    console.log('do this');
} else if (truthy == null) {
    console.log('truthy is null');
} else {
    //do that
    console.log('do that');
}

console.log(true); //true
console.log(!! {}); //true
console.log(!! []); //true
console.log(!! ''); //false
console.log(!! 'hi'); //true
console.log(); //empty string
console.log(!! 0); //false
console.log(!! -1); //true
console.log(true && false); //false
console.log(true || false); //true

var c = "23" == 23; //abstract comparason | not to use
console.log(c); //true
var d = "23" === 23; //extrict quality operator (equal type and value)
console.log(d); //false

var e = truthy ? 1 : 2; //ternary operator
console.log(e); //2

var animal = 'horse';
switch (animal) {
    case 'dog':
        console.log('is a dog');
        break;
    case 'cat':
        console.log('is a cat');
        break;
    default:
        console.log('it is unkown');
        break;
}

try {
    throw new Error();
    console.log('works');
} catch (error) {
    console.log('broke');
} finally {
    console.log('always works');
}

//variables
var f; //define
console.log(f); // undefined
f = 'something'; //assign
console.log(f);
f = 'something else'; //reassign
console.log(f);

g = 'global variable';
var h = 'local variable';
let i = 'defined just for the block statement';
const j = 'cannot be changed';

//functions
function hello(input) {
    const output = input + ' ;-)';
    return output;
}
console.log(hello('amigo'));

//const hello2 = (input) => output; //???
//console.log(hello2('amigo'));

(function() {}) //anonymous function
function someName(){} //name function
const someName2 = function () {};

function cool(fun) {
    fun();
}
cool(() => console.log('sweet!'));

function outer() {
    const fish = 'f';
    let count = 0;

    function inner() {
        count++;
        return `${count} ${fish}`;
    }
    return inner;
}
const fun = outer();
console.log(fun()); //1 f
console.log(fun()); //2 f

//objects
const clown = {
    face: 'c face'
}
const ghost = {
    face: 'g face'
}
function hello3() {
    return this.face;
}
console.log(hello3()); //undefined

const result = hello3.call(clown);
console.log(result); //'c face'

