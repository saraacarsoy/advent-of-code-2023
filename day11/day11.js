const fs = require('fs');
const f = fs.readFileSync('day11.txt', 'utf-8');
const expandedArr = readInput();
const galaxyArr = updateMapWithIds();

function readInput() {
    const rows = f.trim().split(/[\r\n]+/);
    let arr = rows.map(row => row.split(''));
    
    const isEmptyArray = arr => arr.every(elem => elem === '.');
    
    for (let i = 0; i < arr.length; i++) {
        if (isEmptyArray(arr[i])) {
            arr.splice(i + 1, 0, Array(arr[i].length).fill('.'));
            i++;
        }
    }
    
    const transposedArray = arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
    
    for (let i = 0; i < transposedArray.length; i++) {
        if (isEmptyArray(transposedArray[i])) {
            transposedArray.splice(i + 1, 0, Array(transposedArray[i].length).fill('.'));
            i++;
        }
    }
    
    arr = transposedArray[0].map((_, rowIndex) => transposedArray.map(col => col[rowIndex]));
    
    return arr;
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

const cartesianDistanceBetweenPoints = (a = {}, b = {}) => {
    let x1 = a.x,
        x2 = b.x,
        y1 = a.y,
        y2 = b.y;

    let dist = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    return dist;
}

function getDistanceBetweenAll() {
    let totalDistance = 0;
  
    for (let i = 0; i < galaxyArr.length; i++) {
      for (let j = i + 1; j < galaxyArr.length; j++) {
        const dist = cartesianDistanceBetweenPoints(galaxyArr[i].coordinates, galaxyArr[j].coordinates);
        totalDistance += dist;
      }
    }
  
    return totalDistance;
}

const totalDistance = getDistanceBetweenAll();
console.log("Total distance:", totalDistance);

  