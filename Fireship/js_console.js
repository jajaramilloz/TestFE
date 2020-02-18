//list of functions on console object
console.log(console);

//assert
try {
    console.assert(true,"true assert");
    console.assert(false,"false assert");
} catch (err) {
    // console.log(err);
}

//to add labels to the variables
let foo = 23;
let bar = 24;
console.log({foo, bar});

//print as a table
console.log('.');
console.table([foo, bar]);
console.log('.');

//group messages
console.groupCollapsed('group');
console.groupCollapsed('group');
console.groupCollapsed('group');
console.groupCollapsed('group');
console.groupCollapsed('group');
console.groupEnd();
console.groupEnd();
console.groupEnd();
console.groupEnd();
console.groupEnd();

const obj = { 
    'a': 1,
    'b': 2
};
console.dir(obj);
console.log(obj);

let clicks = 0;
clicks++;
console.log(clicks);
clicks++;
console.log(clicks);

console.count('clicks');
console.count('clicks');

// console.time('a');
// console.timeLog('a');

function bottom() {
    function top() {
        console.trace('quien?')
    }
    top();
}
bottom();

console.log(
    '%c CSS styling',
    'color: pink; font-weight: bold; background-color: black;'
);
