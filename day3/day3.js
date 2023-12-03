const fs = require('fs');

function readInput(callback) {
    fs.readFile('day3.txt', 'utf-8', (err, data) => {
        if (err) throw err;

        const arr = data.split('\r\n');
        callback(arr);
    });
}

readInput((arr) => {
    checkNumber(arr);
});

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function isNonAlphanumeric(value) {
    return !/^[a-zA-Z0-9.]+$/.test(value);
}

function checkNumber(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let numbers = "";

        for (let j = 0; j < arr[i].length; j++) {
            const currentValue = arr[i][j];

            if (isNumeric(currentValue)) {
                numbers += currentValue;
                conditionArr.push(checkNeighbors(arr, i, j));
            } else {
                if (hasTrueValue(conditionArr)) {
                    sum += +numbers;
                }

                numbers = "";
                conditionArr = [];
            }
        }

        if (hasTrueValue(conditionArr)) {
            sum += +numbers;
        }
    }

    console.log(sum)
}

function checkNeighbors(arr, x, y) {
    const coordinates = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1]
    ];

    let validNeighbors = 0;

    for (const [a, b] of coordinates) {
        if (a > 0 && a < arr.length && b > 0 && b < arr[0].length) {
            if (isNonAlphanumeric(arr[a][b])) {
                validNeighbors++;
            }
        }
    }

    return validNeighbors > 0;
}

function hasTrueValue(arr) {
    return arr.some(value => value === true);
}