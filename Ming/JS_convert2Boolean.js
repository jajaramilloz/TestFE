
const str = 'string';
console.log('-----str = \'string\':');
console.log('!!str: ',!!str);
console.log('boolean(str): ',Boolean(str));

console.log('-----number:');
const n = 100;
console.log(!!n);
console.log(Boolean(n));

console.log('-----Falsy values:');
let falsyElements = [
    { id: "false",     val: false },
    { id: "undefined", val: undefined },
    { id: "null",      val: null },
    { id: "NaN",       val: NaN },
    { id: "zero",      val: 0 },
    { id: "empty str", val: "" }
];
falsyElements.forEach(function (obj) {
    console.log(obj);
    console.log('!!' + obj.id + ': ' + !!obj.val);
    console.log('Boolean(' + obj.id + '): ' + Boolean(obj.val));
});

let str2 = 'some,list,,of,values';
let arr = str2.split(',');
console.log(arr); // [ 'some', 'list', '', 'of', 'values' ]
console.log(arr.filter(Boolean)); // [ 'some', 'list', 'of', 'values' ]
