const fs = require('fs');
const f = fs.readFileSync('day4.txt', 'utf-8');

let sum = 0;
let cardsArr = [];

f.split(/\r?\n/).forEach(row =>  {
    // sum += formatInput(row);
    const formatted = formatInput(row);
    cardsArr.push(formatted);
});

function formatInput(row) {
    const game = row.split(" | ");
    const cardNumber = row.match(/Card (\d+):/);

    const winning = game[0].replace(/^Card \d:\s*/, '').split(/\s+/);
    const entry = game[1].split(/\s+/);

    const common = findCommonElements(winning, entry);

    // return common.length > 0 ? calculatePoint(common) : 0;
    return {round: parseInt(cardNumber), wins: common.length, cardAmount: 1}
}

function findCommonElements(win, entry) {
    return win.filter(value => entry.includes(value));
}

function calculatePoint(arr) {
    const winning_numbers = arr.length;
    return 2 ** (winning_numbers - 1);
}

//  {round: parseInt(cardNumber), wins: common.length, cardAmount: 1}
function increaseCardAmounts(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j <= arr[i].wins; j++) {
            arr[j+i].cardAmount += 1 * arr[i].cardAmount;
        }
    }

    return arr;
}

const iteratedArr = increaseCardAmounts(cardsArr);

let totalCardAmount = 0;
iteratedArr.forEach((card) => totalCardAmount += card.cardAmount);
console.log(totalCardAmount);