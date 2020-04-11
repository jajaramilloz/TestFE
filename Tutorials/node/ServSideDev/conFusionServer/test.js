opts = [
    {"a": 1, "b": 2},
    {"a": 2, "b": 3}
];
console.log(opts);
console.log(opts[0]);
console.log(opts[1]);
// console(opts(1).remove());
console.log(opts);

console.log('------------- ar.length = 4; ---------- from end');
var ar = [1, 2, 3, 4, 5, 6];
console.log( ar );
ar.length = 4; // set length to remove elements
console.log( ar ); // [1, 2, 3, 4]

console.log('------------- ar.pop(); ---------- from end');
var ar = [1, 2, 3, 4, 5, 6];
console.log( ar );
console.log(ar.pop()); // returns 6
console.log( ar ); // [1, 2, 3, 4, 5]

console.log('------------- ar.shift(); ---------- from begining');
var ar = ['zero', 'one', 'two', 'three'];
console.log( ar );
console.log(ar.shift()); // returns "zero"
console.log( ar ); // ["one", "two", "three"]

console.log('------------- removed = arr.splice(2,2); ---------- from between with index');
var ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log( ar );
var removed = ar.splice(2,2);/*removed === [3, 4]arr === [1, 2, 5, 6, 7, 8, 9, 0]*/
console.log( removed );
console.log( ar );

console.log('------------- ar.splice(0, 2); ---------- from between with splice()');
var ar = ["bar", "baz", "foo", "qux"];
console.log( ar );
console.log(ar.splice(0, 2)); // Starting at index position 0, remove two elements ["bar", "baz"] and retains ["foo", "qux"].
console.log( ar );

console.log('------------- ar.splice(i, 1); / i=5 ---------- Array Items By Value Using Splice');
var ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log( ar );
for( var i = 0; i < ar.length; i++){ 
    if ( ar[i] === 5) { 
        ar.splice(i, 1); 
    }
}//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]
console.log( ar );

console.log('------------- ; ---------- ');
var ar = [1, 2, 3, 4, 5, 5, 6, 7, 8, 5, 9, 0];
for( var i = 0; i < ar.length; i++){ 
    if ( ar[i] === 5) { 
        ar.splice(i, 1); 
        i--; 
    }
}//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]

console.log('------------- ; ---------- ');

console.log('------------- ; ---------- ');

// dish.comments.id(req.params.commentId)
let fav = { "author": 1234, "dishes": [ { "_id": 3456 }, { "_id": 9876 } ] };
console.log(fav);
console.log(fav.dishes.splice(1,1));
console.log(fav.dishes.splice(0,1));
console.log(fav);
