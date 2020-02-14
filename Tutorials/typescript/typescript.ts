// https://www.typescriptlang.org/docs/handbook/basic-types.html

//boolean
let isDone: boolean = false;

//number
let decimal: number = 6;
let hexa: number = 0x0a;
let octal: number = 0o74;
let binary: number = 0b0101;

//string
let color: string = "blue";
let templateStr: string = `Color is {$color}.`;

//array
let list1: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];

//tuple
let tu: [string, number];
tu = ["diez",10];
console.log(tu[0]);
console.log(tu[1]);

//enum
enum Color {Red=4, Green, Blue};
let c: Color = Color.Green;
console.log(c); //5

enum Color2 {Red=1, Green=3, Blue};
let c2: Color2 = Color2.Blue;
console.log(c2); //4

//any
let notSure: any = 4;
notSure = "maybe four";
notSure = false;
let list3: any[] = [1, true, 'one'];

//void  -- the opposite of any
//  as a variable only accept null
function warnUser(): void {
    console.log('warning');
}

//null & undefined
// they could be assigned to other data types
let n: null = null;
let u: undefined = undefined;

//never
//  the type of values that never occurs
function error(message: string): never {
    throw new Error(message);
}
function fail(message: string) {  //inferred return type is never
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {
    }
}

//object
declare function create(o: object | null): void;
create(null);
create({prop: 0});

//type assertions
let someValue: any = 'string';
let strLen1: number = (<string>someValue).length;
let strlen2: number = (someValue as string).length;

//union types
let ut: string | null | undefined;
let ut2: string | number;
