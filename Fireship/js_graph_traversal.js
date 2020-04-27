const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');
const routes = [
    ['PHX', 'LAX'],
    ['PHX', 'JFK'],
    ['JFK', 'OKC'],
    ['JFK', 'HEL'],
    ['JFK', 'LOS'],
    ['MEX', 'LAX'],
    ['MEX', 'BKK'],
    ['MEX', 'LIM'],
    ['MEX', 'EZE'],
    ['LIM', 'BKK']
];

// console.log(routes);
const adjacentList = new Map();
function addNode(airport) {
    adjacentList.set(airport, []);
}
function addEdge(origin, destination) {
    adjacentList.get(origin).push(destination);
    adjacentList.get(destination).push(origin);
}

airports.forEach(addNode);
routes.forEach(route => addEdge(...route));
console.log(adjacentList);

// BFS - Breadth First Search
function bfs(start, finish) {
    const visited = new Set(); //a value in the Set only once
    const queue = [start];
    while (queue.length > 0) {
        const airport = queue.shift();
        const dests = adjacentList.get(airport);
        for (const dest of dests) {
            if (dest === finish) {
                console.log(`BFS:: ${start} -> ${finish}: found it`);
            }
            if (!visited.has(dest)) {
                visited.add(dest);
                queue.push(dest);
            }
        }
    }
}

//DFS - Depth First Search
function dfs(start, finish, visited = new Set(), route=start) {
    visited.add(start);
    const dests = adjacentList.get(start);
    for (const dest of dests) {
        // console.log(route);
        if (dest === finish) {
            console.log(`DFS:: ${start} -> ${finish}: found it: ${route}`+ ' - ' + dest);
            // return;
        }
        if (!visited.has(dest)) {
            // route = route + ' - ' + `${start}:${dest}`;
            route = route + ' - ' + dest;
            dfs(dest, finish, visited, route);
        }
    }
}

bfs('PHX','BKK');
dfs('PHX','BKK');
