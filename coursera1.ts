declare const process: any;
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array: string[];
var input_currentline = 0;

process.stdin.on('data', function (data: any) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n").slice(0, -1);
    output(main());
    //runGenerated();
});

function runGenerated() {
    function shuffle(a: string[]): string[] {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    function generateCase(n: number, m: number, opacity: number) {
        return [
            n + " " + m,
            ...Array.from({ length: m }, () => {
                const from = 1 + Math.floor(Math.random() * n);
                const to = 1 + Math.floor(Math.random() * n);
                return from + " " + to + " " + Math.floor(opacity * Math.random());
            })
        ]
    }
    let res;
    for (var k = 0; k < 1000; k++) {
        res = undefined;
        input_stdin_array = generateCase(40, 400, 50);
        for (var i = 0; i < 10; i++) {
            input_currentline = 0;
            const oldInput = input_stdin_array;
            input_stdin_array = input_stdin_array.slice(0, 1).concat(shuffle(input_stdin_array.slice(1)));
            let newRes = main();
            
            if (res !== undefined) {
                if (newRes !== res) {
                    output(newRes, "!=", res)
                    output("\n" + newRes + ":");
                    output(input_stdin_array.join("\n"))
                    output("\n" + res + ":");
                    output(oldInput.join("\n"));
                    throw "Failed on attempt " + i + " case " + k;
                }
            }
            res = newRes;
        }
    }
    output(res);
}

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
type Graph = Map<string, Map<string, number>>;
function addEdge(graph: Graph, from: string, to: string, capacity: number) {
    addOneDirection(graph, from, to, capacity);
    addOneDirection(graph, to, from, 0);
}
function addOneDirection(graph: Graph, from: string, to: string, capacity: number) {
    const map = graph.get(from) || new Map<string, number>();
    //if (capacity === 0 && map.has(to)) throw new Error("WOW");
    //if (capacity > 0 && map.get(to) === 0) throw new Error("WOW2");
    const value = (map.get(to) || 0) + capacity;
    map.set(to, value);
    graph.set(from, map);
}
function getFlow(graph: Graph, from: string, to: string) {
    return graph.get(from)!.get(to)!;
}
function addFlow(graph: Graph, from: string, to: string, value: number) {
    let flow = getFlow(graph, from, to);
    console.log("add", value, from, "->", to)
    flow += value;
    graph.get(from)!.set(to, flow)
}
function bfs(graph: Graph, from: string, to: string): [string[], number] | undefined {
    const visited: Map<string, number> = new Map()
    visited.set(from, 0);
    const queue: string[] = [from];
    let queueIdx = 0;
    let currentStep = 0;
    while(queueIdx < queue.length) {
        let currentVertex = queue[queueIdx++];
        let currentStep = visited.get(currentVertex)!;
        for (const [n, capacity] of graph.get(currentVertex)!.entries()) {
            if (capacity !== 0) {
                if (n === to) {
                    const path: string[] = [to];
                    console.log(currentStep, visited);
                    console.log(graph)
                    currentVertex = to;
                    currentStep = currentStep + 1;
                    let currentFlow = Infinity;
                    loop: while (currentStep > 0) {
                        for (const [n, capacity] of graph.get(currentVertex)!.entries()) {
                            const pathCapacity = graph.get(n)!.get(currentVertex)!;
                            if (visited.get(n) === currentStep - 1 && pathCapacity) {
                                path.push(n);
                                currentStep = currentStep - 1;
                                console.log(graph.get(n)!.get(currentVertex)!)
                                currentFlow = Math.min(Math.abs(pathCapacity), currentFlow);
                                currentVertex = n;
                                continue loop;
                            }
                        }
                        throw new Error("not found");
                    }
                    if (currentFlow === 0) {
                        throw "WTF"
                    }
                    return [path.reverse(), currentFlow];
                } else {
                    const prevVisit = visited.get(n);
                    if (prevVisit === undefined) {
                        console.log("visit", currentVertex, "->", n, "at", currentStep + 1);
                        queue.push(n);
                        visited.set(n, currentStep + 1);
                    }
                }
            }
        }
    }
    console.log("not found")
}

function main() {
    const [n, m] = readLine().split(" ").map(Number);
    const graph: Graph = new Map();
    for (var i = 1; i <= n; i++) {
        graph.set(i.toString(), new Map());
    }
    for (let i = 0; i < m; i++) {
        const [from, to, capacity] = readLine().split(" ");
        if (from !== to && to !== "1" && from !== n.toString()) {
            addEdge(graph, from, to, Number(capacity));
        }
    }
    if (m === 0) {
        return 0;
    }

    let res = bfs(graph, "1", n.toString());
    if (res == undefined) {
        return 0;
    }
    var c = 0;
    while(true) {
        let res = bfs(graph, "1", n.toString());
        if (res) {
            const [path, flow] = res;
            console.log("the path is ", res)
            for (var i = 0; i < path.length - 1; i++) {
                const from = path[i];
                const to = path[i+1];

                if (getFlow(graph, from, to) < 0) {
                    addFlow(graph, from, to, flow);
                    addFlow(graph, to, from, flow);
                } else {
                    addFlow(graph, from, to, -flow);
                    addFlow(graph, to, from, -flow);
                }
            }
            console.log(graph)
            if (++c > Infinity) {
                throw "yo"
            }
            //
        } else {
            const sum = [...graph.get(n.toString())!.values()].filter(a => a < 0).reduce((a, b) => a + b, 0);
            return Math.abs(sum);
        }
    }
}
const output = console.log;
console.log = (...args: any[]) => undefined;