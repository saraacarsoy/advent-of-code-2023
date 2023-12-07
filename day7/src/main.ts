import fs from "fs";

interface HandBet {
    hand: string;
    bet: number;
}

let fiveOfAKindArr: HandBet[] = [];
let fourOfAKindArr: HandBet[] = [];
let threeOfAKindArr: HandBet[] = [];
let fullHouseArr: HandBet[] = [];
let twoPairArr: HandBet[] = [];
let onePairArr: HandBet[] = [];
let highCardArr: HandBet[] = [];

export function checkFiveOfAKind(cards: string): boolean {
    const matches = getCardAmounts(cards);
    const jokers: number = getJokerAmount(matches);

    if((jokers > 0 && Object.values(matches).some(value => value === 4) 
    || jokers > 1 &&  Object.values(matches).some(value => value === 3)
    || jokers > 2 &&  Object.values(matches).some(value => value === 2)
    || jokers > 3 &&  Object.values(matches).some(value => value === 1)
    || jokers > 4)) {
        return true;    
    }

    return Object.values(matches).some(value => value === 5);
}

export function checkFourOfAKind(cards: string): boolean {
    const matches = getCardAmounts(cards);
    const jokers: number = getJokerAmount(matches);

    if((jokers > 0 && Object.values(matches).some(value => value === 3))
    || jokers > 1 &&  Object.values(matches).some(value => value === 2)
    || jokers > 2 &&  Object.values(matches).some(value => value === 1)) {
        return true;    
    }

    return Object.values(matches).some(value => value === 4);
}

export function checkThreeOfAKind(cards: string): boolean {
    const matches = getCardAmounts(cards);
    const threeCards = Object.values(matches).some(value => value === 3);
    const twoCards = Object.values(matches).some(value => value === 2);
    const jokers: number = getJokerAmount(matches);

    if(jokers > 0 && twoCards) {
        return true;    
    }

    return threeCards && !twoCards;
}

export function checkFullHouse(cards: string): boolean {
    const matches = getCardAmounts(cards);
    const threeCards = Object.values(matches).some(value => value === 3)
    const twoCards = Object.values(matches).some(value => value === 2)
    const jokers: number = getJokerAmount(matches);

    if(jokers > 0 && (Object.values(matches).filter(value => value === 2).length == 2)) {
        return true;    
    }

    return threeCards && twoCards;
}

export function checkTwoPair(cards: string): boolean {
    const matches = getCardAmounts(cards);
    const pairs = Object.values(matches).filter(value => value === 2);
    const jokers: number = getJokerAmount(matches);

    if(jokers > 0 && pairs.length === 1) {
        return true;    
    }

    return pairs.length === 2;
}

export function checkOnePair(cards: string): boolean {
    const matches = getCardAmounts(cards);
    const pairs = Object.values(matches).filter(value => value === 2);
    const threeCards = Object.values(matches).some(value => value === 3);
    const jokers: number = getJokerAmount(matches);

    if(jokers > 0) {
        return true;    
    }

    return pairs.length === 1 && !threeCards;
}

export function checkHighCard(cards: string): boolean {
    const matches = getCardAmounts(cards);
    return Object.values(matches).every(value => value === 1);
}

export function getJokerAmount(cards: Record<string, number>): number {
    return "N" in cards ? cards["N"] : 0;
}

export function getCardAmounts(cards: string) {
    const letters = cards.split("");
    const matches = {};

    letters.forEach(letter => {
        if(!matches[letter]){
            matches[letter] = 0;
        }

        matches[letter]++;
    });

    return matches;
}

export function parseInput(input: string): HandBet[] {
    const handBets = [];
    const lines = input.split("\n");

    lines.forEach(line => {
        const [hand, bet] = line.split(/\s+/, 2);

        handBets.push({hand: convertHandToRankedLetters(hand), bet: parseInt(bet), jokerAmount: 0});
    });

    return handBets;
}

export function groupHandBets(handBets: HandBet[]) {
    handBets.forEach((handBet) => {
        if(checkFiveOfAKind(handBet.hand)) {
            fiveOfAKindArr.push(handBet);
        }
        else if(checkFourOfAKind(handBet.hand)) {
            fourOfAKindArr.push(handBet);
        }
        else if(checkFullHouse(handBet.hand)) {
            fullHouseArr.push(handBet);
        }
        else if(checkThreeOfAKind(handBet.hand)) {
            threeOfAKindArr.push(handBet);
        }
        else if(checkTwoPair(handBet.hand)) {
            twoPairArr.push(handBet);
        }
        else if(checkOnePair(handBet.hand)) {
            onePairArr.push(handBet);
        }
        else if(checkHighCard(handBet.hand)) {
            highCardArr.push(handBet);
        }
        
    })
}

export function convertHandToRankedLetters(hand: string): string {
    const rankedLetters = {
        A: "A",
        K: "B",
        Q: "C",
        //J: "D",
        T: "E",
        "9": "F",
        "8": "G",
        "7": "H",
        "6": "I",
        "5": "J",
        "4": "K",
        "3": "L",
        "2": "M",
        J: "N"
    }

    return hand.split("").map(letter => rankedLetters[letter]).join("");
}

const fileContent = fs.readFileSync("input.txt", "utf-8");
const input = parseInput(fileContent);
groupHandBets(input);

function comparison(a: HandBet, b: HandBet){
    return a.hand.localeCompare(b.hand);
}

fiveOfAKindArr = fiveOfAKindArr.sort(comparison);
fourOfAKindArr = fourOfAKindArr.sort(comparison);
threeOfAKindArr = threeOfAKindArr.sort(comparison);
fullHouseArr = fullHouseArr.sort(comparison);
twoPairArr = twoPairArr.sort(comparison);
onePairArr = onePairArr.sort(comparison);
highCardArr = highCardArr.sort(comparison);

const list = [
    ...fiveOfAKindArr,
    ...fourOfAKindArr,
    ...fullHouseArr,
    ...threeOfAKindArr,
    ...twoPairArr,
    ...onePairArr,
    ...highCardArr,
];

list.reverse();

let sum = 0;

list.forEach((handBet, index) => {
    sum += handBet.bet * (index + 1);
});
console.log(`Sum: ${sum}`);