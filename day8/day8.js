const fs = require('fs');
const f = fs.readFileSync('day8.txt', 'utf-8');

function readInput() {
    let input = f.split('\n');
    const directions = input[0].split('');
    const map = input.slice(2).map(entry => {
        const [left, right] = entry.split(" = ");
        const values = right.replace(/[()]/g, "").split(", ");
        return [left, ...values];
    });

    console.log(map)
}


readInput();