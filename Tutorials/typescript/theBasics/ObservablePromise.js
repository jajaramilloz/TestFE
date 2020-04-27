"use strict";
//JavaScript Theory: Promise vs Observable
//https://medium.com/javascript-everyday/javascript-theory-promise-vs-observable-d3087bc1239a
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
//1. Promise is eager
// promise is always async
var greetingPoster = new Promise(function (resolve, reject) {
    console.log('   '.repeat(1) + '1.1 Inside Promise (proof of being eager)');
    resolve('   '.repeat(1) + '<rta #1>');
});
console.log('   '.repeat(1) + '1.2 Before calling then on Promise');
greetingPoster.then(function (res) { return console.log('   '.repeat(1) + (" 1.3 Greeting from promise: " + res)); });
// setTimeout(() => console.log('.'), 1000);
//2. Observable is lazy
// this is sync
var greetingLady = new rxjs_1.Observable(function (observer) {
    console.log('   '.repeat(2) + '2.1 Inside Observable (proof of being lazy)');
    observer.next('   '.repeat(2) + '<rta #2>');
    observer.complete();
});
console.log('   '.repeat(2) + '2.2 Before calling subscribe on Observable');
greetingLady.subscribe({
    next: console.log,
    complete: function () { return console.log('   '.repeat(2) + '2.3 End of conversation with preety lady'); }
});
//3. Promise 
// version corta + chain two Promises
new Promise(function (resolve, reject) {
    console.log('   '.repeat(3) + '3.1 Inside Promise (proof of being eager)');
    resolve('<rta #3-1>');
})
    .then(function (res) {
    console.log('   '.repeat(3) + (" 3.2 Greeting from promise: " + res));
    return new Promise(function (resolve, reject) {
        console.log('   '.repeat(3) + (" 3.3 Greeting from promise: " + res));
        resolve('<rta #3-2>');
    });
})
    .then(function (res) { return console.log('   '.repeat(3) + (" 3.4 Greeting from promise: " + res)); });
//4. Observable is lazy
// this is async
var greetingLady4 = new rxjs_1.Observable(function (observer) {
    console.log('   '.repeat(4) + '4.1 Inside Observable (proof of being lazy)');
    setTimeout(function () {
        console.log('   '.repeat(4) + '4.2 Inside Observable (proof of being lazy)');
        observer.next('   '.repeat(4) + '<rta #4>');
        observer.complete();
    }, 2000);
});
console.log('   '.repeat(4) + '4.3 Before calling subscribe on Observable');
greetingLady4.subscribe({
    next: console.log,
    complete: function () { return console.log('   '.repeat(4) + '4.4 End of conversation with preety lady'); }
});
//version corta - async
new rxjs_1.Observable(function (observer) {
    console.log('   '.repeat(5) + '5.1 Inside Observable (proof of being lazy)');
    setTimeout(function () {
        console.log('   '.repeat(5) + '5.2 Inside Observable (proof of being lazy)');
        observer.next('   '.repeat(5) + '<rta #5>');
        observer.complete();
    }, 2000);
})
    .subscribe({
    next: console.log,
    complete: function () { return console.log('   '.repeat(5) + '5.4 End of conversation with preety lady'); }
});
//6. Observable can emit multiple values
var notif = new rxjs_1.Observable(function (observer) {
    console.log('   '.repeat(6) + '6.1 Inside Observable (proof of being lazy)');
    var interval = setInterval(function () {
        observer.next('   '.repeat(6) + '<rpta #6');
    }, 2000);
    return function () {
        console.log('   '.repeat(6) + '6.2 clearing interval');
        clearInterval(interval);
    };
});
var subs = notif.subscribe(console.log);
setTimeout(function () { return subs.unsubscribe(); }, 8500);
//7. Operators ROCKs
//The most astonishing feature of the RxJS library is a great number of operators that can be applied to Observables in order to get a new tailored stream.
// Un solo observable y multiples subscriptors encadenados
var notif7 = new rxjs_1.Observable(function (observer) {
    var interval = setInterval(function () {
        observer.next('   '.repeat(7) + '<rpta #7>');
    }, 2000);
    return function () { return clearInterval(interval); };
});
// -primer subscriptor
var enhancedNotif7 = notif7.pipe(operators_1.map(function (message) { return message + " " + new Date(); }));
var subs7 = enhancedNotif7.subscribe(print7);
setTimeout(function () { return subs7.unsubscribe(); }, 10500);
// -segundo subscriptor en paralelo con el primero
var enhancedNotif7_2 = notif7.pipe(operators_1.map(function (message) { return message + " || x"; }));
var subs7_2 = enhancedNotif7_2.subscribe(print7);
setTimeout(function () { return subs7_2.unsubscribe(); }, 6500);
// -tercer subscriptor en serie con el primero
var enhancedNotif7_3 = enhancedNotif7.pipe(operators_1.map(function (message) { return message + " || y"; }));
var subs7_3 = enhancedNotif7_3.subscribe(print7);
setTimeout(function () { return subs7_3.unsubscribe(); }, 6500);
function print7(s) {
    console.log('   '.repeat(7) + 'from print7:');
    console.log(s);
}
// To chain observables:
// http://reactivex.io/documentation/operators/flatmap.html
//8. Observables en paralelo
// sincronización al final con una sola respuesta para los dos
var to1 = 10000;
var to2 = 10000;
var r = "";
var obs81 = new rxjs_1.Observable(function (observer) {
    setTimeout(function () {
        observer.next('   '.repeat(8) + '<rta #8-1>');
        observer.complete();
    }, to1);
});
var obs82 = new rxjs_1.Observable(function (observer) {
    setTimeout(function () {
        observer.next('   '.repeat(8) + '<rta #8-2>');
        observer.complete();
    }, to2);
});
obs81.subscribe({
    next: console.log,
    complete: function () { return endObss('   '.repeat(8) + '8.1 ' + Date()); }
});
obs82.subscribe({
    next: console.log,
    complete: function () { return endObss('   '.repeat(8) + '8.2 ' + Date()); }
});
function endObss(s) {
    console.log(s);
    r = r + '.';
    if (r === '..') {
        console.log('   '.repeat(8) + '8.3 end of two');
    }
}
