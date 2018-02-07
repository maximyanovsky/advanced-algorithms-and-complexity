"use strict";
process.stdin.resume();
process.stdin.setEncoding('ascii');
var input_stdin = "";
var input_stdin_array;
var input_currentline = 0;
process.stdin.on('data', function (data) {
    input_stdin += data;
});
process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n").slice(0, -1);
    output(main());
});
function readLine() {
    return input_stdin_array[input_currentline++];
}
function main() {
    const [flightsCount, crewCount] = readLine().split(" ").map(Number);
    const graph = new Map();
    for (var i = 1; i <= crewCount; i++) {
        addEdge(graph, i.toString(), "sink", 1);
    }
    for (var i = 1; i <= flightsCount; i++) {
        addEdge(graph, "source", "flight" + i, 1);
        readLine().split(" ").forEach((s, idx) => {
            const suitable = s === "1";
            if (suitable) {
                addEdge(graph, "flight" + i, (idx + 1).toString(), 1);
            }
        });
    }
    console.log(graph);
    var c = 0;
    while (true) {
        let res = bfs(graph, "source", "sink");
        if (res) {
            const [path, flow] = res;
            console.log("the path is ", res);
            for (var i = 0; i < path.length - 1; i++) {
                const from = path[i];
                const to = path[i + 1];
                if (getFlow(graph, from, to) < 0) {
                    addFlow(graph, from, to, flow);
                    addFlow(graph, to, from, flow);
                }
                else {
                    addFlow(graph, from, to, -flow);
                    addFlow(graph, to, from, -flow);
                }
            }
            console.log(graph);
            if (++c > Infinity) {
                throw "yo";
            }
        }
        else {
            let res = [];
            for (var i = 1; i <= flightsCount; i++) {
                let crew = -1;
                for (const [n, c] of graph.get("flight" + i).entries()) {
                    if (c === 0 && n !== "source") {
                        crew = n;
                        break;
                    }
                }
                res.push(crew);
            }
            return res.join(" ");
        }
    }
}
function addEdge(graph, from, to, capacity) {
    addOneDirection(graph, from, to, capacity);
    addOneDirection(graph, to, from, 0);
}
function addOneDirection(graph, from, to, capacity) {
    const map = graph.get(from) || new Map();
    const value = (map.get(to) || 0) + capacity;
    map.set(to, value);
    graph.set(from, map);
}
function getFlow(graph, from, to) {
    return graph.get(from).get(to);
}
function addFlow(graph, from, to, value) {
    let flow = getFlow(graph, from, to);
    console.log("add", value, from, "->", to);
    flow += value;
    graph.get(from).set(to, flow);
}
function bfs(graph, from, to) {
    const visited = new Map();
    visited.set(from, 0);
    const queue = [from];
    let queueIdx = 0;
    let currentStep = 0;
    while (queueIdx < queue.length) {
        let currentVertex = queue[queueIdx++];
        let currentStep = visited.get(currentVertex);
        for (const [n, capacity] of graph.get(currentVertex).entries()) {
            if (capacity !== 0) {
                if (n === to) {
                    const path = [to];
                    console.log(currentStep, visited);
                    console.log(graph);
                    currentVertex = to;
                    currentStep = currentStep + 1;
                    let currentFlow = Infinity;
                    loop: while (currentStep > 0) {
                        for (const [n, capacity] of graph.get(currentVertex).entries()) {
                            const pathCapacity = graph.get(n).get(currentVertex);
                            if (visited.get(n) === currentStep - 1 && pathCapacity) {
                                path.push(n);
                                currentStep = currentStep - 1;
                                console.log(graph.get(n).get(currentVertex));
                                currentFlow = Math.min(Math.abs(pathCapacity), currentFlow);
                                currentVertex = n;
                                continue loop;
                            }
                        }
                        throw new Error("not found");
                    }
                    if (currentFlow === 0) {
                        throw "WTF";
                    }
                    return [path.reverse(), currentFlow];
                }
                else {
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
    console.log("not found");
}
const output = console.log;
console.log = (...args) => undefined;
//# sourceMappingURL=coursera2.js.map