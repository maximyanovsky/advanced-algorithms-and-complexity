import { bfs, addFlow, getFlow, addEdge } from "../bfs";

export default function main(input: string[]) {
    const [flightsCount, crewCount] = input[0].split(" ").map(Number);
    const graph = new Map();
    for (var i = 1; i <= crewCount; i++) {
        addEdge(graph, i.toString(), "sink", 1);
    }
    for (var i = 1; i <= flightsCount; i++) {
        addEdge(graph, "source", "flight" + i, 1);
        input[i].split(" ").forEach((s, idx) => {
            const suitable = s === "1";
            if (suitable) {
                addEdge(graph, "flight" + i, (idx + 1).toString(), 1);
            }
        });
    }
    console.log(graph)
    /*

    let res = bfs(graph, "source", "sink");
    if (res == undefined) {
        return 0;
    }
    */
    var c = 0;
    while(true) {
        let res = bfs(graph, "source", "sink");
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
            let res = [];
            for (var i = 1; i <= flightsCount; i++) {
                let crew = -1;
                for (const [n, c] of graph.get("flight" + i)!.entries()) {
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
