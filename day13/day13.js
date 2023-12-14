const fs = require('fs');
const f = fs.readFileSync('day13.txt', 'utf-8');
const arrays = readInput(); 

function readInput() {
    const patterns = f.split(/\r?\n\r?\n/);

    return patterns.map(pattern => {
        return pattern.split(/\r?\n/).map(row => row.split(''));
    });
}

function getMirrorRow(arr) {
    const rows = arr.length;

    for (let i = 1; i < rows; i++) {
        const span = Math.min(i, rows - i);
        const top = arr.slice(i - span, i).reverse();
        const bottom = arr.slice(i, i + span);

        if (!arraysAreEqual(top, bottom)) {
            if (getDifferingCount(top, bottom) == 1) {
                return i;
            }
        }
    }

    return null;
}

function getMirrorCol(grid) {
    const cols = grid[0].length;
    
    for (let i = 1; i < cols; i++) {
        const span = Math.min(i, cols - i);
        const left = grid.map(row => row.slice(i - span, i).reverse());
        const right = grid.map(row => row.slice(i, i + span));

        if (!arraysAreEqual(left, right)) {
            if (getDifferingCount(left, right) == 1) {
                return i;
            }
        }
    }

    return null;
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            if (!arraysAreEqual(arr1[i], arr2[i])) {
                return false;
            }
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function getDifferingCount(arr1, arr2) {
    let diffCount = 0;

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr1[i][j] !== arr2[i][j]) {
                diffCount++;
            }
        }
    }

    return diffCount;
}


let count = 0;
arrays.forEach((arr) => {
    const row = getMirrorRow(arr);
    
    if (row !== null) {
        count += row * 100;
    } else {
        const col = getMirrorCol(arr);
        count += col !== null ? col : 0;
    }
});

console.log(count);

