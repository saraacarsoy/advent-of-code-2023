const fs = require('fs');
const { default: test } = require('node:test');
const f = fs.readFileSync('day12.txt', 'utf-8');

function readInput() {
    let input = f.split('\r\n');

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
  
    for (let i=1; i<counts.length; i++) {
        regexString += atLeastOneDotPattern + hashPattern.repeat(counts[i]);
    }

    regexString += zeroOrMoreDotPattern + "$";
    
    return new RegExp(regexString);
}


function getAllVariations(inputString) {
    const variations = [];
    const stack = [{ pattern: inputString.split(''), index: 0 }];

    while (stack.length > 0) {
        const current = stack.pop();

        if (current.index === current.pattern.length) {
            variations.push(current.pattern.join(''));
        } else if (current.pattern[current.index] === '?') {
            const pattern1 = [...current.pattern];
            pattern1[current.index] = '.';
            stack.push({ pattern: pattern1, index: current.index + 1 });

            const pattern2 = [...current.pattern];
            pattern2[current.index] = '#';
            stack.push({ pattern: pattern2, index: current.index + 1 });
        } else {
            stack.push({ pattern: current.pattern, index: current.index + 1 });
        }
    }

    return variations;
}

function testVariations() {
    const springs = readInput();
    count = 0;

    springs.forEach(spring => {
        const possibleVariations = getAllVariations(spring[0]);
        const regex = createRegex(spring[1]);

        possibleVariations.forEach(variation => {
            if (regex.test(variation)) {
                count++;
            }
        });  
    });  

    console.log(count);
}

testVariations();