const fs = require('fs');
const f = fs.readFileSync('day5.txt', 'utf-8');

function getSeedId() {
    let input = f.trim().split('\r\n');
    const seedRow = input[0];
    const seeds = seedRow.match(/seeds: (\d+(?: \d+)*)/);
    let seedValues = seeds[1].split(' ').map(Number);
    const inp = formatInput(input);
    
    console.log("------- Starting calculation -------")
    seedValues = formatRangeOfSeedValues(seedValues, inp); //part 2
    console.log("------- finished calculating ranges -------")

    const locations = [];
    
    // for(let i=0; i<seedValues.length; i++) {
    //     let seed = seedValues[i];
    //     
    //     for (let j=1; j<inp.length; j++) {
    //         seed = checkCurrentMap(seed, inp[j]);
    //     }
    //     locations.push(seed);
    // }
// 
    console.log("Part 2 answer: ", Math.min(...seedValues));
}
 
function checkCurrentMap(seedId, map) {
    let mapConfigs = map.slice(1); 
    let newSeedVal = seedId;
    
    for (let i=0; i<mapConfigs.length; i++) {
        const mapEntry = mapConfigs[i].split(/\s+/).map(Number);

        if (seedId >= mapEntry[1] && seedId <= mapEntry[1] + mapEntry[2] && seedId == newSeedVal) {
            newSeedVal = seedId - mapEntry[1] + mapEntry[0];
        }
    }
    
    return newSeedVal;
}

function formatRangeOfSeedValues(seeds, inp) {
    const seedArray = [];

    console.log("----- calculating ranges ------")
    for(let i=0; i<seeds.length; i++) {
        for (let j=0; j<seeds[i+1]; j++) {
            //if(!seedArray.includes(seeds[i]+j)) {
            //    seedArray.push(seeds[i] + j);
            //}
            let seed = seeds[i]+j;
        
            for (let j=1; j<inp.length; j++) {
                seed = checkCurrentMap(seed, inp[j]);
            }
            seedArray.push(seed);
        }
        
        i++;
    }
    
    return seedArray;
}

function formatInput(input) {
    const resultArray = [];
    let subArray = [];
    input.forEach(item => {
        if (item !== '') {
            if (item.endsWith(':')) {
                if (subArray.length > 0) {
                resultArray.push(subArray);
                subArray = [];
                }
                subArray.push(item);
            } else {
                subArray.push(item);
            }
        }
    });
    
    if (subArray.length > 0) {
        resultArray.push(subArray);
    }

    return resultArray;
}

getSeedId();