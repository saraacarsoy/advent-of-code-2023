const fs = require('fs');
const f = fs.readFileSync('day4.txt', 'utf-8');

let sum = 0;
f.split(/\r?\n/).forEach(row =>  {
    sum += formatInput(row);
});

function formatInput(row) {
    const game = row.split(" | ");

    const winning = game[0].replace(/^Card \d:\s*/, '').split(/\s+/);
    const entry = game[1].split(/\s+/);

    const common = findCommonElements(winning, entry);

    if (common.length > 0) {
        return calculatePoint(common);
    } else {
        return 0;
    }
}

function findCommonElements(win, entry) {
    return win.filter(value => entry.includes(value));
}

function calculatePoint(arr) {
    const winning_numbers = arr.length;
    return 2 ** (winning_numbers - 1);
}

console.log(sum);