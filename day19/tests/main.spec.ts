import { expect } from "chai";
import { readWorkFlows, parseWorkFlow, WorkFlow, Part, parsePart, readParts, Rule, parseRules } from "../src/main";

describe("parseWorkFlow", () => {
    const testCases = new Map<string, WorkFlow>([
        ["px{a<2006:qkq,m>2090:A,rfg}", { name: "px", rules: [{toWorkflow: "qkq", key: "a", comparator: "<", value: 2006}, {toWorkflow: "A", key: "m", comparator: ">", value: 2090}, {toWorkflow: "rfg"}] }],
    ]);

    for (const [input, expected] of testCases.entries()) {
        it("should correctly parse input " + input, () => {
            expect(parseWorkFlow(input)).to.deep.equal(expected);
        });
    }

    it("should parse input to workflows", () => {
        const input: string = "px{a<2006:qkq,m>2090:A,rfg}\n\n{x=787,m=2655,a=1222,s=2876}"
        const expected: WorkFlow[] = [
            { name: "px", rules: [{toWorkflow: "qkq", key: "a", comparator: "<", value: 2006}, {toWorkflow: "A", key: "m", comparator: ">", value: 2090}, {toWorkflow: "rfg"}] },
        ];
        expect(readWorkFlows(input)).to.deep.equal(expected);
    });

    it("should parse rule correctly", () => {
        const input: string = "a<2006:qkq,m>2090:A,rfg";
        const expected: Rule[] = [{toWorkflow: "qkq", key: "a", comparator: "<", value: 2006}, {toWorkflow: "A", key: "m", comparator: ">", value: 2090}, {toWorkflow: "rfg"}];
        expect(parseRules(input)).to.deep.equal(expected);
    });
});

describe("parseParts", () => {
    const testCases = new Map<string, Part>([
        ["{x=787,m=2655,a=1222,s=2876}", { x: 787, m: 2655, a: 1222, s: 2876 }],
        ["{x=1679,m=44,a=2067,s=496}", { x: 1679, m: 44, a: 2067, s: 496 }],
        ["{x=2036,m=264,a=79,s=2244}", { x: 2036, m: 264, a: 79, s: 2244 }],
        ["{x=2461,m=1339,a=466,s=291}", { x: 2461, m: 1339, a: 466, s: 291 }],
    ]);

    for (const [input, expected] of testCases.entries()) {
        it("should correctly parse input " + input, () => {
            expect(parsePart(input)).to.deep.equal(expected);
        });
    }

    it("should parse input to parts", () => {
        const input: string = "px{a<2006:qkq,m>2090:A,rfg}\npv{a>1716:R,A}\nlnx{m>1548:A,A}\nrfg{s<537:gd,x>2440:R,A}\n\n{x=787,m=2655,a=1222,s=2876}\n{x=1679,m=44,a=2067,s=496}\n{x=2036,m=264,a=79,s=2244}\n{x=2461,m=1339,a=466,s=291}"
        const expected: Part[] = [
            { x: 787, m: 2655, a: 1222, s: 2876 },
            { x: 1679, m: 44, a: 2067, s: 496 },
            { x: 2036, m: 264, a: 79, s: 2244 },
            { x: 2461, m: 1339, a: 466, s: 291 },
        ];

        expect(readParts(input)).to.deep.equal(expected);
    });

});