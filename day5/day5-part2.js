const fs = require('fs');
const f = fs.readFileSync('day5.txt', 'utf-8');

function getSeedId() {
    const input = f.split(/\r?\n\n/);
    const seedRow = input[0];
    const seedsArr = seedRow.match(/seeds: (\d+(?: \d+)*)/);
    const seedValues = seedsArr[1].split(' ').map(Number);
    const humToLocArr = getLowestOrderLocsFromInput(input[7]);

    for(let i=0; i<humToLocArr.length; i++) {
        for(let j=humToLocArr[i][0]; j<humToLocArr[i][0] + humToLocArr[i][2]; j++) {
            console.log("checking location: ", j);
            let location = j;
            for (let k=input.length-1; k>0; k--) {
                location = reverseCheckCurrentMap(location, input[k]);
            }

            if (checkIfSeedInRange(seedValues, location)) {
                return j;
            }
        }
    }
}
 
function reverseCheckCurrentMap(location, map) {
    let lines = map.split('\n');
    lines.shift();
    let mapConfigs = lines.map(line => line.split(' ').map(Number));
    //let mapConfigs = map.split('\n').slice(1); 
    let newLocation = location;

    for (let i=0; i<mapConfigs.length; i++) {
        if (location >= mapConfigs[i][0] && location <= mapConfigs[i][0] + mapConfigs[i][2] && location == newLocation) {
            newLocation = location - mapConfigs[i][0] + mapConfigs[i][1];
        }
    }

    return newLocation;
}

function getLowestOrderLocsFromInput(locationMap) {
    let lines = locationMap.split('\n');
    lines.shift();
    let result = lines.map(line => line.split(' ').map(Number));
    
    result.sort((a, b) => a[0] - b[0]);

    return result;
}

function checkIfSeedInRange(seedArr, seed) {
    for (let i = 0; i <seedArr.length; i += 2) {
        if (seed >= seedArr[i] && seed < seedArr[i] + seedArr[i+1]) {
            return true;
        }
    }
    return false;
}

console.log("location is: ", getSeedId());