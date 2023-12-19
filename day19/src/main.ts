import fs from "fs";

function readInputFile(file: string): string {
    return fs.readFileSync(file, "utf-8");
}

export interface WorkFlow {
    name: string;
    rules: Rule[];
}

export interface Rule {
    toWorkflow: string;
    key?: string;
    comparator?: string;
    value?: number;
}

export interface Part {
    x: number;
    m: number;
    a: number;
    s: number;
}

export function parseWorkFlow(raw: string): WorkFlow {
    const split = raw.split("{");
    const name = split[0];
    const rulesString = split[1].substring(0, split[1].length - 1);

    return { name, rules: parseRules(rulesString) };
}

export function parseRules(rule: string): Rule[] {
    const rules = rule.split(",")

    return rules.map(rule => {
        const bla = rule.match(/(\w+)([<>])(\d+):(\w+)/)

        if (bla) {
            return {
                toWorkflow: bla[4],
                key: bla[1],
                comparator: bla[2],
                value: +bla[3]
            }
        }
        return {toWorkflow: rule}
    })
}

export function readWorkFlows(input: string): WorkFlow[] {
    return input.split("\n\n")[0].split("\n").map(parseWorkFlow);
}

export function readParts(input: string): Part[] {
    return input.split("\n\n")[1].split("\n").map(parsePart);
}

export function parsePart(str: string): Part {
    return JSON.parse(str.replace(/([a-z])/g, '"$1"').replace(/=/g, ":"));
}

function run() {
    const input = readInputFile("input.txt");
    const workflows = readWorkFlows(input);
    const parts = readParts(input);

    // math it out :^)    
}

run();