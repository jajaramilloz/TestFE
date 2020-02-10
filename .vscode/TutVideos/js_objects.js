
/* primitives:
string
number
bigint
boolean
null
undefined
zymbol
*/

//object literal
const obj1 = {
    rabbit: '()',
    year: 1984,
    whoami: { }
}
//bracket notation:
obj1['rabbit']='(*)';
console.log(obj1['rabbit']);

//object constructor
const obj2 = new Object();
obj2.rabbit = '¬¬';
console.log(obj2.rabbit);

//static method create()
const organism = {
    dna: Math.random()
};
const obj3 = Object.create(organism);
console.log(obj3);
console.log(obj3.dna);
console.log(Object.getPrototypeOf(obj3));

//defined prototipe
const obj4 = Object.create({})
Object.defineProperty(obj4, 'unicorn', {
    //value: '//',
    get: () => '&&',
    enumerable: false
});
console.log(obj4.unicorn);

//properties names equals as de variables names
const spider = '*';
const legs = 8;
const obj5 = {
    spider, //anteriormente: spider: spider,
    legs: legs //shorthand syntax
}
const { spider2, legs2 } = obj5; //destructing obj5
console.log(spider2, legs2);
const { spider: mySpider, legs: myLegs } = obj5; //renaming property names
console.log(mySpider, myLegs);

//random property names
const random = () => Math.random().toString().slice(-5);
const obj6 = {
    [random()]: true //[computed()]: value
}
console.log(Object.getPrototypeOf(obj6));
console.log(Object.getOwnPropertyNames(obj6));
console.log(obj6);

//functions as values on properties
const obj7 = {
    spider,
    legs,
    web: '',
    makeWeb: function() {
        this.web += '***'
        return this;
    }
}
console.log(obj7.web);
obj7.makeWeb().makeWeb();
console.log(obj7.web);

//object references
let a = '@';
let b = a;
console.log(a,b);
a = 'a';
console.log(a,b);

let z = { boo: '@' };
let y = z;
console.log(z,y);
z.boo = 'a';
console.log(z,y);

let c = { boo: '@' };
let d = Object.assign({}, c);
console.log(Object.getOwnPropertyNames(c));

//
const obj8 = {
    commet: '.c.',
    trex: '.t.'
}
for (k in obj8) {
    console.log(k);       //nombre de las propiedades
    console.log(obj8[k]); //valores de las propiedades
}
for (k of Object.keys(obj8)) {
    console.log(k);       //nombre de las propiedades
}
for (v of Object.values(obj8)) {
    console.log(v);       //valores de las propiedades
}
for (o of Object.entries(obj8)) {
    console.log(o);
    console.log(o[0],o[1]);
}
for (const [k,v] of Object.entries(obj8)) {
    console.log(k,v);
}

//customize how a object is created
function Zombie(name) {
    this.name = name;
    this.reanimated = Date.now();
    this.eatBrain = function () {
        return `${this.name} is hungry`;
    }
}
const obj9 = new Zombie('juan');
console.log(obj9.eatBrain());


