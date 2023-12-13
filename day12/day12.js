const fs = require('fs');
const f = fs.readFileSync('day12.txt', 'utf-8');

function readInput() {
    let input = f.split('\n');

    const map = input.map(entry => {
        return [springs, groups] = entry.split(" ");
    });

    return map;
}

function createRegex(param) {
    const counts = param.split(",").map(Number);
    
    const zeroOrMoreDotPattern = "\\.*";
    const atLeastOneDotPattern = "\\.+";
    const hashPattern = "#";
    
    let regexString = "^" + zeroOrMoreDotPattern + hashPattern.repeat(counts[0]);
  
    for (let i = 1; i < counts.length; i++) {
        regexString += atLeastOneDotPattern + hashPattern.repeat(counts[i]);
    }

    regexString += zeroOrMoreDotPattern + "$";
    
    return new RegExp(regexString);
}

let memo = {}

function getAllVariations(inputString, pattern, hashCount) {
    const key = pattern + hashCount;  // Include hash count in the key

    if (key in memo) {
        console.log("fetching from cache");
        return memo[key];
    }

    const variations = [];
    const stack = [{ pattern: inputString.split(''), index: 0, hashCount: 0 }];

    while (stack.length > 0) {
        const current = stack.pop();
        if (current.index === current.pattern.length && current.hashCount === hashCount) {
            variations.push(current.pattern.join(''));
        } else if (current.index < current.pattern.length) {
            if (current.pattern[current.index] === '?') {
                const pattern1 = [...current.pattern];
                pattern1[current.index] = '.';
                stack.push({ pattern: pattern1, index: current.index + 1, hashCount: current.hashCount });

                const pattern2 = [...current.pattern];
                pattern2[current.index] = '#';
                stack.push({ pattern: pattern2, index: current.index + 1, hashCount: current.hashCount + 1 });
            } else if (current.pattern[current.index] === '#') {
                stack.push({ pattern: current.pattern, index: current.index + 1, hashCount: current.hashCount + 1 });
            } else {
                stack.push({ pattern: current.pattern, index: current.index + 1, hashCount: current.hashCount });
            }
        }
    }

    memo[key] = variations;
    return variations;
}


function testVariations() {
    const springs = readInput();
    let count = 0;

    springs.forEach(spring => {
        // spring = formatInputForPart2(spring);

        const totalHashes = spring[1].split(',').map(Number).reduce((acc, currentValue) => acc + currentValue, 0);
        const possibleVariations = getAllVariations(spring[0], spring[1], totalHashes);
        const regex = createRegex(spring[1]);
        
        possibleVariations.forEach(variation => {
            if (regex.test(variation)) {
                count++;
            }
        });  
    });

    console.log(count);
}

//part 2
function formatInputForPart2(spring) {
    const pattern = increaseString(spring[0], true);
    const hashes = increaseString(spring[1], false);

    return [pattern, hashes];
}

function increaseString(str, qMark) {
    const sign = qMark? '?' : ',';
    const doubledString = str + sign + str + sign + str + sign + str + sign + str;

    return doubledString;
}

testVariations();