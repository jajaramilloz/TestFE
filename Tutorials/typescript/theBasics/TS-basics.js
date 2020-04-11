//instalar modulo
// npm i -g typescript
//instalar types modulo
// npm i -D @types/lodash
async function Hello() {
    return "Helloooooo";
}
let url = new URL('http://localhost:3000');
//annotation == variable : type
let x;
x = 1;
let s;
s = 'acb';
let w = "www";
w = 'yyy';
let b = 1;
b = 'a';
let style;
style = 'abc';
let style2;
style2 = 'bold';
let varios;
varios = 'abc';
varios = 123;
;
const person1 = {
    firstname: 'ja',
    lastname: 'jz'
};
const person2 = {
    firstname: 'am',
    lastname: 'vb',
    gender: 'f'
};
function pow(x, y) {
    return Math.pow(x, y).toString();
}
function two() {
    return 2;
}
function noReturnValue() {
}
function retN() {
    return 1; //if removed: TS2355: A function whose declared type is neither 'void' nor 'any' must return a value
}
//arrays
const arr = []; //sin restricciones
arr.push(1);
arr.push('23');
arr.push(false);
const arr2 = []; //con restricción solo números
arr2.push(1);
const arr3 = []; //sin restricciones
arr3.push(1);
arr3.push('23');
arr3.push(false);
// arr3.push(person1); // error Argument of type 'Person' is not assignable to parameter of type 'string | number | boolean'.
//observable
class Observable1 {
    constructor(value) {
        this.value = value;
    }
}
;
let o1;
o1 = new Observable1(1);
let o2;
o2 = new Observable1('a');
//GENERIC TYPES
// Adding abstract (polymorphic) types using generics
// una sola defición para muchos tipos de datos
function identity(value) {
    return value;
}
let ident1;
ident1 = identity(1);
let ident2;
ident2 = identity('a');
//--------------------------------------------------
//Ejemplo de un observable
// from: https://www.stackchief.com/tutorials/JavaScript%20Observables%20in%205%20Minutes
// Otras referencias sobre observables:
// - https://netbasal.com/javascript-observables-under-the-hood-2423f760584
// - https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/
// - https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13
//--------------------------------------------------
class Observable {
    constructor(functionThatTakesObserver) {
        this._functionThatTakesObserver = functionThatTakesObserver;
    }
    subscribe(observer) {
        return this._functionThatTakesObserver(observer);
    }
}
let myObservable = new Observable(observer => {
    setTimeout(() => {
        observer.next("got data!");
        observer.complete();
    }, 1000);
});
function observer1(observer) {
    setTimeout(() => {
        observer.next("got data!");
        observer.complete();
    }, 1000);
}
let myObservable1 = new Observable(observer1);
let myObserver = {
    next(data) {
        console.log(data);
    },
    error(e) {
        console.log(e);
    },
    complete() {
        console.log("request complete");
    }
};
myObservable.subscribe(myObserver);
// (1 second) got data!
// (1 second) request complete
//--------------------------------------------------
