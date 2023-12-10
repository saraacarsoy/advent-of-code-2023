const fs = require('fs');
const f = fs.readFileSync('day8.txt', 'utf-8');

function readInput() {
    let input = f.split('\r\n');
    const directions = input[0].split('');

    const map = input.slice(2).map(entry => {
        const [left, right] = entry.split(" = ");
        const values = right.replace(/[()]/g, "").split(", ");
        return [left, ...values];
    });

    // map.sort(sortNode);
    // checkNodes(map, directions, 0);
    
    map.sort(sortNodeFromEnd);
    const targetArr = [];

    for (let i=0; i<6; i++) {
        targetArr.push(checkNodes(map, directions, i));
    }

    console.log(findCommonMultiplierOfArray(targetArr));
}

function findCommonDivisor(a, b) {
    if (b === 0) {
        return a;
    } else {
        return findCommonDivisor(b, a % b);
    }
}

function findCommonMultiplier(a, b) {
    return (a * b) / findCommonDivisor(a, b);
}

function findCommonMultiplierOfArray(arr) {
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {
        result = findCommonMultiplier(result, arr[i]);
    }

    return result;
}

function sortNode(a, b) { //part 1
    return a[0].localeCompare(b[0]);
}

function sortNodeFromEnd(a, b) {
    const lastLetterA = a[0].charAt(2);
    const lastLetterB = b[0].charAt(2);
  
    if (lastLetterA < lastLetterB) {
      return -1;
    } 
    else if (lastLetterA > lastLetterB) {
      return 1;
    }
    else {
      return 0;
    }
}

function checkNodes(map, directionArr, newNode) {
    let count = 0;
    const mapLength = map.length;

    while (true) {
        newNode = getTarget(map, newNode, directionArr[count % directionArr.length]);
        count += 1;

        //if (newNode === mapLength - 1 || count >= directionArr.length * mapLength) {
        if (newNode >= mapLength - 6 || count >= directionArr.length * mapLength) {
            break;
        }
    }

    return count;
}

function getTarget(map, i, dir) {
    let target = dir === "L" ? map[i][1] : map[i][2];
    let targetIndex = map.findIndex(subArray => subArray[0] === target);

    return targetIndex;
}

readInput();