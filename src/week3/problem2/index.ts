import { brutForce } from "../../utils/index";


export default function(input: string[]) {
    console.log(input)

    const [n, m] = input[0].split(" ").map(Number);
    const graph: {[key: string]: { [key: string]: boolean }} = {};
    const colors: {[key: string]: number} = {};
    for (let i = 1; i <= n; i++) {
        graph[i.toString()] = graph[i.toString()] || {};
    }
    for (let i = 0; i < m; i++) {
        const [from, to] = input[1 + i].split(" ");
        graph[from] = graph[from] || {};
        graph[to] = graph[to] || {};
        graph[from][to] = true;
        graph[to][from] = true;
    }

    /*
    for (var key in graph) {
        if (Object.keys(graph[key]) .length === 0) {
            return "2 1\n1 0\n-1 0";
        }
    }
    */
    console.log(graph);
    const nodes = Object.keys(graph);
    console.log("nodes", nodes);

    const {
        not,
        create
    } = (() => {
        if (true) {
            //@ts-ignore
            return {
                not: (x: number | string) => -x,
                create: (i: number, idx: number) => i * n + idx + 1,
            }
        } else {
            //@ts-ignore
            return {
                not: (x: number | string) => "!" + x,
                create: (i: number, idx: number) => "["+(i+1)+"_"+(idx+1)+"]",
            }
        }
    })();

    function getPath(i: number) {
        return Array.from({ length: n }, (x, idx) => create(i, idx));
    }

    function canBe(path: number[], j: number) {
        return path.filter((x, idx) => idx !== j).map(y => not(y));
    }

    const result: (number | string)[][] = [];
    const numbers = Array.from({ length: n }, (x, idx) => idx);
    result.push(...brutForce(numbers, 2).map(([a, b]) => {
        return Array.from({ length: n }, (x, idx) => [not(create(a, idx)), not(create(b, idx))]);
    }).reduce((a, b) => a.concat(b)));

    const mem: any = {};
    for (let i = 0; i < nodes.length; i++) {
        const self = (i + 1).toString();
        const path = getPath(i);
        mem[self] = mem[self] || {};
        result.push(path)
        result.push(...brutForce(path, 2).map(x => x.map(y => not(y))));
        const neighbors = graph[nodes[i]];
        const nonNeighbors = nodes.filter(x => neighbors[x] === undefined && x !== self && mem[self][x] === undefined);
        console.log("for", self, "non neighbors are", nonNeighbors);
        const r: any[] = [];
        nonNeighbors.forEach((node) => {
            const other = getPath(Number(node) - 1);
            path.forEach((x, idx) => {
                if (idx < n - 1) {
                    r.push([not(x), not(other[idx + 1])]);
                }
                if (idx > 0) {
                    r.push([not(x), not(other[idx - 1])]);
                }
            })
            mem[node] = mem[node] = {};
            mem[self][node] = true;
            mem[node][self] = true;
        })
        console.log(r.join("\n"));
        result.push(...r);
    }
    const output = result.map(x => x.concat([0]).join(" "))
    return [
        output.length + " " + n * n,
        ...output,
    ].join("\n");
}