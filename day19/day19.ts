const fs = require('fs');

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
    return input.split(/\r\n\r\n/)[0].split(/\r\n/).map(parseWorkFlow);
}

export function readParts(input: string): Part[] {
    return input.split(/\r\n\r\n/)[1].split(/\r\n/).map(parsePart);
}

export function parsePart(str: string): Part {
    return JSON.parse(str.replace(/([a-z])/g, '"$1"').replace(/=/g, ":"));
}

function run() {
    const input = readInputFile("./day19.txt");
    const workflows = readWorkFlows(input);
    const parts = readParts(input);

    let sum = 0;
    const workflow = new Map<string, WorkFlow>(workflows.map(v => [v.name, v]));
    parts.forEach(part => {
        const a = findNextWorkflow(workflow.get("in"), part, workflow);
        if (a == "A") {
            sum += part.a + part.m + part.s + part.x;
        }
    });

    const sum2 = parts
    .filter(part => findNextWorkflow(workflow.get("in"), part, workflow) === "A")
    .reduce((sum, part) => sum + part.a + part.m + part.s + part.x, 0);

    console.log("sum1:", sum, "sum2:", sum2);
}

function findNextWorkflow(workflow: WorkFlow, part: Part, map: Map<string, WorkFlow>) {
    for (const rule of workflow.rules) {
        const work = map.get(rule.toWorkflow)

        if (!rule.key) {
            if (rule.toWorkflow == "A" || rule.toWorkflow == "R") {
                return rule.toWorkflow;
            }

            return findNextWorkflow(work, part, map);
        }

        if (rule.comparator == "<" && part[rule.key] < rule.value) {
            if (rule.toWorkflow == "A" || rule.toWorkflow == "R") {
                return rule.toWorkflow;
            }

            return findNextWorkflow(work, part, map);
        }
        else if (rule.comparator == ">" && part[rule.key] > rule.value) {
            if (rule.toWorkflow == "A" || rule.toWorkflow == "R") {
                return rule.toWorkflow;
            }

            return findNextWorkflow(work, part, map);
        }
    }
    console.log("error");
}

run();