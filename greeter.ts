class Student {
    fullName: string;
    constructor(public firstName: string,
        public middleInitial: string,
        public lastName: string) {
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
}

interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    console.log(person.firstName);
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jorge","A", "Jaramillo");

document.body.innerHTML = greeter(user);
