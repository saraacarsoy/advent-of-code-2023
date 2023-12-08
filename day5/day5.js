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

getSeedId();
