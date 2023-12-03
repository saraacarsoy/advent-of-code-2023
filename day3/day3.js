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
    let starArr = [];

    for (let i = 0; i < arr.length; i++) {
        let numbers = "";
        let conditionArr = [];

        for (let j = 0; j < arr[i].length; j++) {
            const currentValue = arr[i][j];

            if (isNumeric(currentValue)) {
                numbers += currentValue;
                //conditionArr.push(checkNeighbors(arr, i, j));
                starArr.push(checkNeighbors(arr, i, j));
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

    const entries = formatStarArray(starArr);
    const multiplications = calculateGearRatio(entries);

    console.log(sumMultiplications(multiplications))
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
    let starCoordinates = [];
    let totalNumber = "";

    for (const [a, b] of coordinates) {
        if (a > 0 && a < arr.length && b > 0 && b < arr[0].length) {
            // if (isNonAlphanumeric(arr[a][b])) {
            //     validNeighbors++;
            // }

            if(arr[a][b] === "*") {
                const leftNeighbor = arr[x][y-1]
                const rightNeighbor = arr[x][y+1]
                const furtherLeftNeighbor = arr[x][y-2]
                const furtherRightNeighbor = arr[x][y+2]

                if(leftNeighbor != undefined && isNumeric(leftNeighbor) && furtherLeftNeighbor != undefined && isNumeric(furtherLeftNeighbor)) {
                    totalNumber += furtherLeftNeighbor;
                    totalNumber += leftNeighbor;
                }

                if(!isNumeric(furtherLeftNeighbor) && leftNeighbor != undefined && isNumeric(leftNeighbor)) {
                    totalNumber += leftNeighbor;
                }

                totalNumber += arr[x][y];

                if(rightNeighbor != undefined && isNumeric(rightNeighbor)) {
                    totalNumber += rightNeighbor;

                    if(furtherRightNeighbor != undefined && isNumeric(furtherRightNeighbor)) {
                        totalNumber += furtherRightNeighbor;
                    }
                }
                
                starCoordinates.push({star: [a, b], number: parseInt(totalNumber)});
                
            }
        }
    }

    // return validNeighbors > 0;
    return starCoordinates;
}

function hasTrueValue(arr) {
    return arr.some(value => value === true);
}

function formatStarArray(starArr) {
    coordinates = starArr.filter(arr => arr.length > 0).reduce((acc, curr) => {
        const exists = acc.some(obj =>
            obj.star[0] === curr[0].star[0] &&
            obj.star[1] === curr[0].star[1] &&
            obj.number === curr[0].number
        );

        if (!exists) {
        acc.push(curr[0]);
        }
        return acc;
    }, []);

    return coordinates;
} 

function calculateGearRatio(arr) {
    const groupedStars = {};

    arr.forEach(obj => {
        const key = obj.star.toString();
        if (!groupedStars[key]) {
          groupedStars[key] = [];
        }
        groupedStars[key].push(obj.number);
    });

    const result = [];
    for (const key in groupedStars) {
        if (groupedStars[key].length > 1) {
            const numbers = groupedStars[key];
            const multiplied = numbers.reduce((acc, num) => acc * num, 1);
            result.push({ star: key.split(",").map(Number), multiplied });
        }
    }

    return result;
}

function sumMultiplications(arr) {
    total = 0;

    arr.forEach((val) => total += val.multiplied);

    return total;
}