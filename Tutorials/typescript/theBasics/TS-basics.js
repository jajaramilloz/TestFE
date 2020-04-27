"use strict";
//instalar modulo
// npm i -g typescript
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//instalar types modulo
// npm i -D @types/lodash
function Hello() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "Helloooooo"];
        });
    });
}
var url = new URL('http://localhost:3000');
//annotation == variable : type
var x;
x = 1;
var s;
s = 'acb';
var w = "www";
w = 'yyy';
var b = 1;
b = 'a';
var style;
style = 'abc';
var style2;
style2 = 'bold';
var varios;
varios = 'abc';
varios = 123;
;
var person1 = {
    firstname: 'ja',
    lastname: 'jz'
};
var person2 = {
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
var arr = []; //sin restricciones
arr.push(1);
arr.push('23');
arr.push(false);
var arr2 = []; //con restricción solo números
arr2.push(1);
var arr3 = []; //sin restricciones
arr3.push(1);
arr3.push('23');
arr3.push(false);
// arr3.push(person1); // error Argument of type 'Person' is not assignable to parameter of type 'string | number | boolean'.
//observable
var Observable1 = /** @class */ (function () {
    function Observable1(value) {
        this.value = value;
    }
    return Observable1;
}());
;
var o1;
o1 = new Observable1(1);
var o2;
o2 = new Observable1('a');
//GENERIC TYPES
// Adding abstract (polymorphic) types using generics
// una sola defición para muchos tipos de datos
function identity(value) {
    return value;
}
var ident1;
ident1 = identity(1);
var ident2;
ident2 = identity('a');
//--------------------------------------------------
//Ejemplo de un observable
// from: https://www.stackchief.com/tutorials/JavaScript%20Observables%20in%205%20Minutes
// Otras referencias sobre observables:
// - https://netbasal.com/javascript-observables-under-the-hood-2423f760584
// - https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/
// - https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13
//--------------------------------------------------
var Observable = /** @class */ (function () {
    function Observable(functionThatTakesObserver) {
        this._functionThatTakesObserver = functionThatTakesObserver;
    }
    Observable.prototype.subscribe = function (observer) {
        return this._functionThatTakesObserver(observer);
    };
    return Observable;
}());
var myObservable = new Observable(function (observer) {
    setTimeout(function () {
        observer.next("got data!");
        observer.complete();
    }, 1000);
});
function observer1(observer) {
    setTimeout(function () {
        observer.next("got data!");
        observer.complete();
    }, 1000);
}
var myObservable1 = new Observable(observer1);
var myObserver = {
    next: function (data) {
        console.log(data);
    },
    error: function (e) {
        console.log(e);
    },
    complete: function () {
        console.log("request complete");
    }
};
myObservable.subscribe(myObserver);
// (1 second) got data!
// (1 second) request complete
//--------------------------------------------------
