// create a New Array[] by calling a function on each
// element in a different Array[]

const users = [
    { name: 'juan'} ,
    { name: 'pedro' },
    { name: 'carlos' }
];

// imperative -- use statements to mutate state
const usernames1 = [];
for (const user of users) {
    usernames1.push(user.name);
}
console.log(users);
console.log(usernames1);

// declarative -- use functions to describe state
const usernames2 = users.map(user => user.name);
console.log(usernames2);

// const ui = user.map(user =>
//     <h1>
//         {user.username}
//     </h1>
// );

const requests = users.map(user => fetch(user.name));
await Promise.all(requests);
