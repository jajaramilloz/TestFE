"use strict";
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, you name is " + person.firstName + " " + person.lastName;
}
var user = new Student("Jorge", "A", "Jaramillo");
document.body.innerHTML = greeter(user);
