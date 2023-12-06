const fs = require('fs');
const f = fs.readFileSync('day5.txt', 'utf-8');

function getSeedId() {
    const input = f.split(/\r?\n\n/);
    const seedRow = input[0];
    const seedsArr = seedRow.match(/seeds: (\d+(?: \d+)*)/);
    const seedValues = seedsArr[1].split(' ').map(Number);
    
    const seeds = [];

    for(let i=0; i<seedValues.length; i++) {
        let location = seedValues[i];

        for (let i=input.length-1; i>0; i--) {
            location = checkCurrentMap(location, input[i]);
        }

        seeds.push(location);
    }

    // console.log(Math.min(...locations));
    console.log(seeds);
}
 
function checkCurrentMap(seedId, map) {
    let mapConfigs = map.split('\n').slice(1); 
    let newSeedVal = seedId;
    
    for (let i=0; i<mapConfigs.length; i++) {
        const mapEntry = mapConfigs[i].split(/\s+/).map(Number);
        console.log(mapEntry)
        if (seedId >= mapEntry[1] && seedId <= mapEntry[1] + mapEntry[2] && seedId == newSeedVal) {
            newSeedVal = seedId - mapEntry[1] + mapEntry[0];
        }
    }
    
    console.log(newSeedVal)
    return newSeedVal;
}


function getLocationFromSeed(seedId, input) {
    let location = seedId;

    for (let i = input.length - 1; i >= 0; i--) {
        location = reverseCheckCurrentMap(location, input[i]);
    }

    return location;
}

function reverseCheckCurrentMap(location, map) {
    let mapConfigs = map.split('\n').slice(1);
    let originalSeedVal = location;

    for (let i = 0; i < mapConfigs.length; i++) {
        const mapEntry = mapConfigs[i].split(/\s+/).map(Number);

        if (
            location >= mapEntry[0] &&
            location <= mapEntry[0] + mapEntry[2] &&
            location == originalSeedVal
        ) {
            originalSeedVal = location + mapEntry[1] - mapEntry[0];
        }
    }

    return originalSeedVal;
}

getSeedId();

// seeds: 79 14 55 13