const fs = require('fs');
const f = fs.readFileSync('day5.txt', 'utf-8');

function getSeedId() {
    const input = f.split(/\r?\n\n/);
    const seedRow = input[0];
    const seeds = seedRow.match(/seeds: (\d+(?: \d+)*)/);
    const seedValues = seeds[1].split(' ').map(Number);
    
    const locations = [];

    for(let i=0; i<seedValues.length; i++) {
        let seed = seedValues[i];

        for (let i=1; i<input.length; i++) {
            seed = checkCurrentMap(seed, input[i]);
        }

        locations.push(seed);
    }

    console.log(Math.min(...locations));
}
 
function checkCurrentMap(seedId, map) {
    let mapConfigs = map.split('\n').slice(1); 
    let newSeedVal = seedId;
    
    for (let i=0; i<mapConfigs.length; i++) {
        const mapEntry = mapConfigs[i].split(/\s+/).map(Number);

        if (seedId >= mapEntry[1] && seedId <= mapEntry[1] + mapEntry[2] && seedId == newSeedVal) {
            newSeedVal = seedId - mapEntry[1] + mapEntry[0];
        }
    }
    
    return newSeedVal;
}

function generateRange(start, amount) {
    const range = [];
    
    for (let i=0; i<amount; i++) {
        range.push(start + i);
    }

    return range;
}

function formatRangeOfSeedValues(seeds) {
    const seedArray = [];

    const firstRange = generateRange(seeds[0], seeds[1]);
    const secondRange = generateRange(seeds[2], seeds[3]);

    seedArray.push(...firstRange, ...secondRange);

    return seedArray;
}

getSeedId();

//console.log(seedArr);