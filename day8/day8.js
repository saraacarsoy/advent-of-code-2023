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
    map.sort(sortNodeFromEnd);
    // checkNodes(map, directions);
    checkEntryNodes(map, directions);
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

function checkNodes(map, directionArr) {
    let newNode = 0;
    let count = 0;
    const mapLength = map.length;

    while (true) {
        newNode = getTarget(map, newNode, directionArr[count % directionArr.length]);
        count += 1;

        if (newNode === mapLength - 1 || count >= directionArr.length * mapLength) {
            break;
        }
    }

    console.log(count);

}

function checkEntryNodes(map, directionArr) {
    const startNodes = [0, 1];
    let targetNodes = startNodes.slice();
    let count = 0;

    while (!targetNodes.every(node => node >= map.length - 2)) {
        for (let i = 0; i < directionArr.length; i++) {
            for (let j = 0; j < startNodes.length; j++) {
                const newNode = getTarget(map, targetNodes[j], directionArr[i]);

                targetNodes[j] = newNode;
            }
            console.log("counting: ", count);
            count += 1;
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