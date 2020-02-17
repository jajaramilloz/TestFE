//executor: fn() that resolves a value or rejects (error)

//create
let arrived = true;
const ride = new Promise((resolve, reject) => {
    if (arrived) {
        setTimeout(() => resolve('msg arrived'),1000);
        console.log('a');
    } else {
        setTimeout(() => reject('msg didnt arrived'),2000);
        console.log('b');
    }
});
console.log('.';

//consume
ride
    .then(value => {
        console.log("Resp:"+value);
    })
    .catch(error => {
        console.log("Error:"+error);
    });
    // .finally(() => {
    //     console.log("Final");
    // });

console.log('.');
