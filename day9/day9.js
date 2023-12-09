const fs = require('fs');
const f = fs.readFileSync('day9.txt', 'utf-8');

function readInput() {
    const input = f.split('\n').filter(row => row.trim() !== ''); // Filtering out empty rows
    const rows = input.map(row => row.split(/\s+/).filter(elem => elem !== '').map(Number));

    let sum = 0;

    for (let i=0; i<rows.length; i++) {
        const allSequences = [];
        let nextArr = getNextSequence(rows[i]);
        allSequences.push(nextArr);

        let allZeroes = false;
        while (!allZeroes) {
            nextArr = getNextSequence(nextArr);
            allSequences.push(nextArr);
            allZeroes = nextArr.every((num) => num === 0);
        }
        
        const nextValues = getNextValue(allSequences);
        sum += calculateNext(nextValues, rows[i]);
    }

    console.log(sum)
}

function getNextSequence(arr) {
    nextArr = [];

    for(let i=0; i<arr.length-1; i++) {
        nextArr.push(arr[i + 1] - arr[i]);
    }

    return nextArr;
}

function getNextValue(allSequences) {
    for (let i=allSequences.length-1; i >= 1; i--) {
        const lastItem = allSequences[i].length-1;
        const lastItem2 = allSequences[i-1].length-1;

        allSequences[i-1].push(allSequences[i][lastItem] + allSequences[i-1][lastItem2]);
    }
    return allSequences;
}

function calculateNext(nextValues, currentArr) {
    const prevLast = nextValues[0].length-1;
    const currentLast = currentArr[currentArr.length-1];

    const nextVal = nextValues[0][prevLast] + currentLast;
    return nextVal;
}

readInput();