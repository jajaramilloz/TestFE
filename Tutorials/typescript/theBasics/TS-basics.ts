//instalar modulo
// npm i -g typescript

//consultar versión del compilador
// tsc --version

//ejecutar TSC
// tsc file.ts   //un solo archivo
// tsc           //todos los archivos ts

//configurar opciones en tsconfig.json

//instalar mpodulo LODASH
// npm i lodash
import * as _ from 'lodash';

//instalar types modulo
// npm i -D @types/lodash

async function Hello() {
	return "Helloooooo";
}
let url = new URL('http://localhost:3000');

//annotation == variable : type
let x: number;
x = 1;

let s: string;
s = 'acb';

let w = "www";
w = 'yyy';

let b: any = 1;
b = 'a';


//crear un tipo de datos
type Style = string;
let style: Style;
style = 'abc';

type Style2 = 'bold' | 'italic';
let style2: Style2;
style2 = 'bold';
//style2 = 'under'; // error: Type '"under"' is not assignable to type 'Style2'

type Varios = 'abc' | 123;
let varios: Varios;
varios = 'abc';
varios = 123;

interface Person {
	firstname: string;
	lastname: string;
	[key: string]: any  // estudiar esta definición
};

const person1: Person = {
	firstname: 'ja',
	lastname: 'jz'
};
const person2: Person = {
	firstname: 'am',
	lastname: 'vb',
	gender: 'f'
};

function pow(x: number, y:number): string {
	return  Math.pow(x, y).toString();
}
function two() {
	return 2;
}
function noReturnValue(): void {
}
function retN():number {
	return 1;	//if removed: TS2355: A function whose declared type is neither 'void' nor 'any' must return a value
}

//arrays
const arr=[]; //sin restricciones
arr.push(1);
arr.push('23');
arr.push(false);

const arr2: number[] =[]; //con restricción solo números
arr2.push(1);
// arr2.push('23');   // error TS2345: Argument of type '"23"' is not assignable to parameter of type 'number'.
// arr2.push(false);  // error TS2345: Argument of type 'false' is not assignable to parameter of type 'number'.

//touples
type Arr3 = [number?, string?, boolean?];
const arr3: Arr3 =[]; //sin restricciones
arr3.push(1);
arr3.push('23');
arr3.push(false);
// arr3.push(person1); // error Argument of type 'Person' is not assignable to parameter of type 'string | number | boolean'.

//observable
class Observable1<T> {
	constructor(public value: T) {}
};
let o1: Observable1<number>;
o1 = new Observable1(1);
let o2: Observable1<string>;
o2 = new Observable1('a');

//GENERIC TYPES
// Adding abstract (polymorphic) types using generics
// una sola defición para muchos tipos de datos
function identity<T>(value: T): T {
	return value;
}

let ident1: number;
ident1 = identity(1);
let ident2: string;
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
	_functionThatTakesObserver;

	constructor(functionThatTakesObserver){
      this._functionThatTakesObserver = functionThatTakesObserver;
    }

    subscribe(observer) {
      return this._functionThatTakesObserver(observer)
    }
}

let myObservable = new Observable(observer => {
  setTimeout(() => {
    observer.next("got data!")
    observer.complete()
  }, 1000)
})

function observer1(observer) {
	setTimeout(() => {
		observer.next("got data!")
		observer.complete()
	  }, 1000);
}
let myObservable1 = new Observable(observer1);

let myObserver = {
  next(data) {
    console.log(data)
  },
  error(e) {
    console.log(e)
  },
  complete() {
    console.log("request complete")
  }
}

myObservable.subscribe(myObserver)
// (1 second) got data!
// (1 second) request complete
//--------------------------------------------------
