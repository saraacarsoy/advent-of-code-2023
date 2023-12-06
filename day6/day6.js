const fs = require('fs');
const f = fs.readFileSync('day6.txt', 'utf-8');

function readInput() {
    let input = f.split('\n');

    const time = input[0].replace(/^Time:\s*/, '').split(/\s+/).map(Number);
    const distance = input[1].replace(/^Distance:\s*/, '').split(/\s+/).map(Number);

    const wins = compareTimeDistance(time, distance);

    let multiplication = 1;
    wins.forEach(e => {
        multiplication *= e;
    });

    console.log(multiplication);
}

function compareTimeDistance(time, distance) {
    totalCount = []
    for (let i = 0; i <time.length; i++) {
        count = 0;

        for (let j = 0; j <time[i]; j++) {
            if(j * (time[i] - j) > distance[i]) {
                count += 1;
            };
        }

        totalCount.push(count);
    }

    return(totalCount);
}

readInput();