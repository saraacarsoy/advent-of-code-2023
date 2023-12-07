import { expect } from "chai";
import {
    checkFiveOfAKind,
    checkFourOfAKind,
    checkFullHouse,
    checkThreeOfAKind,
    checkTwoPair,
    checkOnePair,
    checkHighCard,
    parseInput,
    convertHandToRankedLetters
} from "../src/main";

describe("Hands", () => {
    describe("checkFiveOfAKind", () => {
        it("should return true for 11111", () => {
            expect(checkFiveOfAKind("11111")).to.equal(true);
        });

        it("should return false for 12121", () => {
            expect(checkFiveOfAKind("12121")).to.equal(false);
        });
    });

    describe("checkFourOfAKind", () => {
        it("should return true for 11112", () => {
            expect(checkFourOfAKind("11112")).to.equal(true);
        });

        it("should return false for 12121", () => {
            expect(checkFourOfAKind("12121")).to.equal(false);
        });
    });

    describe("checkFullHouse", () => {
        it("should return true for 11122", () => {
            expect(checkFullHouse("11122")).to.equal(true);
        });

        it("should return false for 11112", () => {
            expect(checkFullHouse("11112")).to.equal(false);
        });

        it("should return false for 11123", () => {
            expect(checkFullHouse("11123")).to.equal(false);
        });
    });

    describe("checkThreeOfAKind", () => {
        it("should return true for 11123", () => {
            expect(checkThreeOfAKind("11123")).to.equal(true);
        });

        it("should return false for 11223", () => {
            expect(checkThreeOfAKind("11223")).to.equal(false);
        });
    });

    describe("checkTwoPair", () => {
        it("should return true for 11223", () => {
            expect(checkTwoPair("11223")).to.equal(true);
        });

        it("should return false for 11234", () => {
            expect(checkTwoPair("11234")).to.equal(false);
        });

        it("should return false for 11122", () => {
            expect(checkTwoPair("11122")).to.equal(false);
        });
    });

    describe("checkOnePair", () => {
        it("should return true for 12234", () => {
            expect(checkOnePair("12234")).to.equal(true);
        });

        it("should return false for 11223", () => {
            expect(checkOnePair("11223")).to.equal(false);
        });

        it("should return false for 11123", () => {
            expect(checkOnePair("11123")).to.equal(false);
        });
    });

    describe("checkHighCard", () => {
        it("should return true for 12345", () => {
            expect(checkHighCard("12345")).to.equal(true);
        });

        it("should return false for 11234", () => {
            expect(checkHighCard("11234")).to.equal(false);
        });
    });

    describe("parseInput", () => {
        it("should return array of HandBet objects", () => {
            const input = "32T3K 765\nT55J5 684";
            const handBets = parseInput(input);

            expect(handBets.length).to.equal(2);
            expect(handBets[0].hand).to.equal("LMELB");
            expect(handBets[0].bet).to.equal(765);

            expect(handBets[1].hand).to.equal("EJJDJ");
            expect(handBets[1].bet).to.equal(684);
        });
    });

    describe("convertHandToRankedLetters", () => {
        it("should return KQ98T to BCFGE", () => {
            const hand = "KQ98T"

            expect(convertHandToRankedLetters(hand)).to.equal("BCFGE");
        });
    });
});
