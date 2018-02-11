import { bfs, addFlow, getFlow, addEdge, Graph } from "../bfs";

export default function main(input: string[]) {
    const [n, m] = input[0].split(" ").map(Number);
    const graph: Graph = new Map();
    for (var i = 1; i <= n; i++) {
        graph.set(i.toString(), new Map());
    }
    for (let i = 0; i < m; i++) {
        const [from, to, capacity] = input[i + 1].split(" ");
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