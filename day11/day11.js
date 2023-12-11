const fs = require('fs');
const f = fs.readFileSync('day11.txt', 'utf-8');

const expandedArr = readInput().arr;
const emptyRowsCols = readInput().emptyRowsCols;
const galaxyArr = updateMapWithIds();

function readInput() {
    const rows = f.trim().split(/[\r\n]+/);
    let arr = rows.map(row => row.split(''));
    
    const emptyRowsCols = {
        rows: [],
        cols: []
    };

    const isEmptyArray = arr => arr.every(elem => elem === '.');
    
    for (let i = 0; i < arr.length; i++) {
        if (isEmptyArray(arr[i])) {
            emptyRowsCols.rows.push(i);
            //arr.splice(i + 1, 0, Array(arr[i].length).fill('.'));
            i++;
        }
    }
    
    const transposedArray = arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
    
    for (let i = 0; i < transposedArray.length; i++) {
        if (isEmptyArray(transposedArray[i])) {
            emptyRowsCols.cols.push(i);
            //transposedArray.splice(i + 1, 0, Array(transposedArray[i].length).fill('.'));
            i++;
        }
    }
    
    arr = transposedArray[0].map((_, rowIndex) => transposedArray.map(col => col[rowIndex]));
    
    return { arr: arr, emptyRowsCols: emptyRowsCols };
}

function updateMapWithIds() {
    let id = 1;
    const galaxies = [];

    for (let i = 0; i < expandedArr.length; i++) {
        for (let j = 0; j < expandedArr[i].length; j++) {
            if (expandedArr[i][j] === '#') {
                galaxies.push({ id: id, coordinates: { x: j, y: i } });
                expandedArr[i][j] = id++;
            }
        }
    }
    
    return galaxies;
} 

const cartesianDistanceBetweenPoints = (a = {}, b = {}, emptySpace) => {
    const { emptyRows, emptyCols } = emptySpace;
    
    let x1 = a.x,
        x2 = b.x,
        y1 = a.y,
        y2 = b.y;

    let xDist = emptyCols > 0 ? emptyCols * 999999 + Math.abs(x2 - x1) : Math.abs(x2 - x1);
    let yDist = emptyRows > 0 ? emptyRows * 999999 + Math.abs(y2 - y1) : Math.abs(y2 - y1);

    //let dist = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    //return dist;

    return xDist + yDist;
}

function getDistanceBetweenAll() {
    let totalDistance = 0;
    
    for (let i = 0; i < galaxyArr.length; i++) {
      for (let j = i + 1; j < galaxyArr.length; j++) {
        const emptyDistance = emptyRowsAndCols(galaxyArr[i].coordinates, galaxyArr[j].coordinates);

        const dist = cartesianDistanceBetweenPoints(galaxyArr[i].coordinates, galaxyArr[j].coordinates, emptyDistance);
        totalDistance += dist;
      }
    }
  
    return totalDistance;
}

function emptyRowsAndCols(coord1, coord2) {
    const { x: x1, y: y1 } = coord1;
    const { x: x2, y: y2 } = coord2;

    const rowBetween = Math.min(y1, y2);
    const colBetween = Math.min(x1, x2);

    let emptyRowCount = 0;
    let emptyColCount = 0;

    for (const row of emptyRowsCols.rows) {
        if (row > rowBetween && row < Math.max(y1, y2)) {
            emptyRowCount++;
        }
    }

    for (const col of emptyRowsCols.cols) {
        if (col > colBetween && col < Math.max(x1, x2)) {
            emptyColCount++;
        }
    }

    return { emptyRows: emptyRowCount, emptyCols: emptyColCount };
}

const totalDistance = getDistanceBetweenAll();
console.log("Total distance:", totalDistance);

  