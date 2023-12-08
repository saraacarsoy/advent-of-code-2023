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

    map.sort(sortNode);

    checkNodes(map, directions)
}

function sortNode(a, b){
    return a[0].localeCompare(b[0]);
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

function getTarget(map, i, dir) {
    let target = dir === "L" ? map[i][1] : map[i][2];
    let targetIndex = map.findIndex(subArray => subArray[0] === target);

    return targetIndex;
}


readInput();