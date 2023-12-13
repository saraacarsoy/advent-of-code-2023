const fs = require('fs');
const f = fs.readFileSync('day13.txt', 'utf-8');

function readInput() {
    let input = f.split('\n');

    return input;
}

function areSpecificColumnPairsEqual(matrix, pairs) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (const [col1, col2] of pairs) {
        if (col1 < 0 || col1 >= numCols || col2 < 0 || col2 >= numCols) { // out of range
            return false;
        }

        for (let row = 0; row < numRows; row++) {
            if (matrix[row][col1] !== matrix[row][col2]) {
                console.log("no match :", col1, col2);
                return false;
            }
        }
    }

    return true;
}

function areSpecificRowPairsEqual(matrix, pairs) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (const [row1, row2] of pairs) {
        if (row1 < 0 || row1 >= numRows || row2 < 0 || row2 >= numRows) { // out of range
            return false;
        }

        for (let col = 0; col < numCols; col++) {
            if (matrix[row1][col] !== matrix[row2][col]) {
                console.log("no match :", row1+1, row2+1);
                return false;
            }
        }
    }

    return true;
}

const matrix = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
];


// cols i and i+1 should be equal at one point, where they are equal start checking for i-1 and i+1+1, then i-1-1 and i+1+1+1 ... 

const pairsToCheck = [[0, 1], [2, 3]];

areSpecificColumnPairsEqual(matrix, pairsToCheck);
areSpecificRowPairsEqual(matrix, pairsToCheck);
