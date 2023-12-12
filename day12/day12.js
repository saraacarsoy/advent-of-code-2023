const fs = require('fs');
const f = fs.readFileSync('day12.txt', 'utf-8');

function readInput() {
    let input = f.split('\r?\n');

    const map = input.map(entry => {
        const [row, groups] = entry.split(" ");
        const springs = row.split("");
        return [springs, ...groups];
    });

    console.log(map);
}

readInput()