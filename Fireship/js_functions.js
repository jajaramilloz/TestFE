//function declaration statement
function makeBread(qty) {
    const bread = 'bread '.repeat(qty);
    console.log(bread);
    return bread; //return undefined if not return is defined
}
const loaves = makeBread(7);
console.log(loaves);

//function declaration expression
const makeBeer = function(qty) {
    return 'Beer  '.repeat(qty);
}
const beers = makeBeer(7);
console.log(beers);

//inmediately invoked function expression IIFE
(function () {
    console.log('ya');
})();

//parameters and arguments
function makeBreakfast(main, side, drink) {
    console.log(arguments);
    return `Breakfast includes ${main}, ${side}, ${drink}`;
}
const mb = makeBreakfast('m','s','d'); //{ '0': 'm', '1': 's', '2': 'd' }
console.log(mb); //Breakfast includes m, s, d

//nameParameters
function makeLunch(opts) {
    const {main, side, drink} = opts;
    return `Lunch includes ${main}, ${side}, ${drink}`;
}
console.log(makeLunch({drink: 'dd', side: 'ss', main: 'mm'}));
console.log(makeLunch({side: 'ss', main: 'mm'}));

//Rest parameters
function makeDinner(...args) {
    return `Dinner includes ${args.join(' ')}`;
}
console.log(makeDinner('sss', 'mmm'));

//Arrow functions
const makeWine = (qty) => 'wine '.repeat(qty);
console.log(makeWine(3));
//    arrow functions don't allow to use 'this'

//Pure functions
let x = 0;
const impure = () => {
    x++;
    return x ** 2;
}
console.log(impure());
console.log(impure());
const impure2 = () => {
    x--;
    return x.toString();
}
console.log(impure2());

const pure = (x) => x ** 2;
console.log(pure(2));


//High Order Functions -- HOF
const hof = (inputFun) => {
    const called = inputFun();
    return () => 'called is '+called;
}
const hof_val=hof(() => 'a');
console.log(hof_val());

let haveFun = () => console.log('fun!!');
setTimeout(haveFun, 200);
// or
setTimeout(() => console.log('fun!!'), 300);

const arr = [1,2,3,4];
const squared = [];
for (const x of arr) {
    squared.push(x ** 2);
}
console.log(squared);
//or 
const squared2 = arr.map(x => x ** 2);
console.log(squared2);
//or
const squaredIt = x => x ** 2;
const squared3 = arr.map(squaredIt); //least performance
console.log(squared3);

function useCat() {
    let name = 'baby kitten';
    return [
        () => `Meow ${name}`,
        (newName) => name = newName
    ]
}
const [meow, setName] = useCat();
console.log(meow());
setName('aji');
console.log(meow());
