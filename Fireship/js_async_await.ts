import fetch from 'node-fetch';
import { resolve } from 'dns';

console.log('sync 1');
setTimeout(_ => console.log('timeout 2'),0);
Promise.resolve().then(_ => console.log('promise'));
console.log('sync 4');

const promise1 = fetch('https://jsonplaceholder.typicode.com/todos/1');
promise1
    .then(res => res.json())
    // .then(user => {
    //     throw new Error('uh oh');
    //     return user;
    // })
    .then(user => console.log("User: "+user.title))
    .catch(err => console.log("Error: "+err));

const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}`);

const codeBlocker = () => {
    let i = 0;
    while (i < 1000000000) {
        i++;
    }
    return 'Billion loop';
}

const codeBlocker2 = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        while (i<1000000000) {i++;}
        resolve('Billion promise');
    })
}

const codeBlocker3 = () => {
    return Promise.resolve().then(v => {
        let i = 0;
        while (i < 1000000000) {i++;}
        return 'Billion loop done';
    })
}
log('Sync 1');
log(codeBlocker());
log('Sync 2');
codeBlocker2().then(log);
log('Sync 3');
codeBlocker3().then(log);
log('Sync 4');

const getFruit = async(name: string) => {
    const fruits = {
        pina: 'p',
        durazno: 'd',
        fresa: 'f'
    }
    return Promise.resolve(fruits[name]);
}

getFruit('fresa').then(console.log);

const makeSmoothie = async() => {
    const a = await getFruit('pina');
    const b = await getFruit('durazno');
    return [a, b];
}

makeSmoothie().then(console.log);

const makeNoSmoothie = () => {
    let a;
    return getFruit('pina')
        .then( v => {
            a = v;
            return getFruit('durazno')
        })
        .then(v => a + v)
}

makeNoSmoothie().then(console.log);

const makeSmoothie2 = async() => {
    const a = getFruit('pina');
    const b = getFruit('durazno');
    const smoothie = await Promise.all([a, b]);
    return smoothie;
}

makeSmoothie2().then(log);

const gFruits = ['pina', 'durazno', 'fresa'];
const gSmoothie = gFruits.map(async v => {
    const e = await getFruit(v);
    log(e);
    return (e);
});

const gSmoothie2 = gFruits.map(v => getFruit(v));
const fruitLoop = async() => {
    for await (const e of gSmoothie2) {
        log(e);
    }
}


//ANOTHER ASYNC EXAMPLE
async function getData() {
    // let reject: (reason?: any) => void;
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('done'), 3000);
    });
    let result = await promise;
    console.log(result);
}
getData();
