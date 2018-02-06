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
    input_stdin_array = input_stdin.split("\n");
    main();
});
function readLine() {
    return input_stdin_array[input_currentline++];
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
    visited.set(from, [0, Infinity]);
    const queue = [from];
    let queueIdx = 0;
    while (queueIdx < queue.length) {
        let currentVertex = queue[queueIdx++];
        let [currentIndex, currentFlow] = visited.get(currentVertex);
        if (currentVertex === to) {
            const path = [to];
            console.log(currentIndex, visited);
            console.log(graph);
            while (currentIndex > 0) {
                const [vertex, [index, flow]] = [...visited.entries()]
                    .filter(([vertex, [index, flow]]) => index === currentIndex - 1
                    && graph.get(vertex).get(currentVertex)).sort(([, [, a]], [, [, b]]) => b - a)[0];
                currentVertex = vertex;
                currentIndex = index;
                path.push(currentVertex);
            }
            return [path.reverse(), currentFlow];
        }
        else {
            for (const [n, capacity] of graph.get(currentVertex).entries()) {
                const possibleFlow = currentVertex === from
                    ? capacity
                    : Math.min(currentFlow, Math.abs(capacity));
                const prevVisit = visited.get(n);
                if (possibleFlow > 0 && (prevVisit === undefined)) {
                    console.log("visit", currentVertex, "->", n, "at", currentIndex + 1, "with", possibleFlow);
                    queue.push(n);
                    visited.set(n, [currentIndex + 1, possibleFlow]);
                }
            }
        }
    }
    console.log("not found");
}
function main() {
    const [n, m] = readLine().split(" ").map(Number);
    const graph = new Map();
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
        output(0);
        return;
    }
    let res = bfs(graph, "1", n.toString());
    if (res == undefined) {
        output(0);
        return;
    }
    var c = 0;
    while (true) {
        let res = bfs(graph, "1", n.toString());
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
            const sum = [...graph.get(n.toString()).values()].filter(a => a < 0).reduce((a, b) => a + b, 0);
            output(Math.abs(sum));
            return;
        }
    }
}
const output = console.log;
console.log = (...args) => undefined;
//# sourceMappingURL=coursera1.js.map