const fs = require('fs');
const f = fs.readFileSync('day10.txt', 'utf-8');

function canMoveUp(arr, x, y, direction) {
    if (x - 1 >= 0 && direction.up && direction.up.includes(arr[x - 1][y])) {
        return [x - 1, y];
    }
}

function canMoveDown(arr, x, y, direction) {
    if (x + 1 < arr.length && direction.down && direction.down.includes(arr[x + 1][y])) {
        return [x + 1, y];
    }
}

function canMoveLeft(arr, x, y, direction) {
    if (y - 1 >= 0 && direction.left && direction.left.includes(arr[x][y - 1])) {
        return [x, y - 1];
    }
}

function canMoveRight(arr, x, y, direction) {
    if (y + 1 < arr[0].length && direction.right && direction.right.includes(arr[x][y + 1])) {
        return [x, y + 1];
    }
}

function readInput() {
    const input = f.split('\r\n');

    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split("");
    }

    return input;
}

function dfs(map, visitedSet, x, y, distance, directions) {
    if (x < 0 || x >= map.length || y < 0 || y >= map[0].length || visitedSet.has(`${x},${y}`) || map[x][y] === '.') {
        return distance - 1;
    }

    visitedSet.add(`${x},${y}`);

    const up = canMoveUp(map, x, y, directions);
    const down = canMoveDown(map, x, y, directions);
    const left = canMoveLeft(map, x, y, directions);
    const right = canMoveRight(map, x, y, directions);

    const nextDistances = [];

    if (up) {
        nextDistances.push(dfs(map, visitedSet, up[0], up[1], distance + 1, directions));
    }
    if (down) {
        nextDistances.push(dfs(map, visitedSet, down[0], down[1], distance + 1, directions));
    }
    if (left) {
        nextDistances.push(dfs(map, visitedSet, left[0], left[1], distance + 1, directions));
    }
    if (right) {
        nextDistances.push(dfs(map, visitedSet, right[0], right[1], distance + 1, directions));
    }

    return Math.max(...nextDistances);
}

function findFarthestPoint() {
    const map = readInput();
    const visitedSet = new Set();
    let maxDistance = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 'S') {
                const startPipe = map[i][j];
                const startDirections = pipeDirections.find(obj => obj.hasOwnProperty(startPipe));

                if (startDirections) {
                    const directions = startDirections[startPipe];
                    maxDistance = Math.max(maxDistance, dfs(map, visitedSet, i, j, 0, directions));
                } else {
                    console.error('Starting position not found in pipe directions');
                }
            }
        }
    }

    console.log("Farthest distance:", maxDistance);
}

const pipeDirections = [
    { "L": { up: ["7", "|", "F"], down: null, right: ["J", "-", "7"], left: null } },
    { "J": { up: ["7", "|", "F"], down: null, right: null, left: ["L", "-", "F"] } },
    { "F": { up: null, down: ["L", "|", "J"], right: ["J", "-", "7"], left: null } },
    { "7": { up: null, down: ["L", "|", "J"], right: null, left: ["L", "-", "F"] } },
    { "|": { up: ["7", "|", "F"], down: ["L", "|", "J"], right: null, left: null } },
    { "-": { up: null, down: null, right: ["J", "-", "7"], left: ["L", "-", "F"] } },
    { "S": { up: ["7", "|", "F"], down: null, right: ["J", "-", "7"], left: null } },
];

findFarthestPoint();
