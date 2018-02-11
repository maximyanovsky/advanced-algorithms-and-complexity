export type Graph = Map<string, Map<string, number>>;
export function addEdge(graph: Graph, from: string, to: string, capacity: number) {
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
export function getFlow(graph: Graph, from: string, to: string) {
    return graph.get(from)!.get(to)!;
}
export function addFlow(graph: Graph, from: string, to: string, value: number) {
    let flow = getFlow(graph, from, to);
    console.log("add", value, from, "->", to)
    flow += value;
    graph.get(from)!.set(to, flow)
}
export function bfs(graph: Graph, from: string, to: string): [string[], number] | undefined {
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
