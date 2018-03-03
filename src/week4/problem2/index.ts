export default function(input: string[]) {
    console.log(input)
    const n = Number(input[0]);
    const graph: any = {};
    const lll: any = {};
    const funFactor = ("x " + input[1]).split(" ").map(Number);
    console.log("funFactor", funFactor)
    for (var i = 1; i <= n; i++) {
        graph[i] = {};
        lll[i] = 0;
    }
    for (var i = 0; i < n - 1; i++) {
        const [a, b] = input[2 + i].split(" ").map(Number);
        graph[a][b] = true;
        graph[b][a] = true;
        lll[a]++;
        lll[b]++;
    }

    let leave: string = "";
    let maxV = -1;
    console.log(lll)
    for (var k in lll) {
        if (lll[k] <= 1 && funFactor[Number(k)] > maxV) {
            maxV = funFactor[Number(k)];
            leave = k;
            break;
        }
    }
    console.log("leave", leave)
    var visited: any = {}
    var queue = Object.keys(graph[leave]);
    for (const n of queue) {
        visited[n] = true;
        console.log("delete", n + "->" + leave);
        delete graph[n][leave];
    }
    let queueIndex = 0;
    while(queueIndex < queue.length) {
        var visitingNode = queue[queueIndex]
        console.log("visit", visitingNode)
        for (let n in graph[visitingNode]) {
            if (!visited[n]) {
                queue.push(n);
                visited[n] = true;
                console.log("delete", n + "->" + visitingNode);
                delete graph[n][visitingNode];
            }
        }
        queueIndex++;
    }
    const cache: any = {};
    function funParty(node: string) {
        
        if (cache[node] === undefined) {
            const children = Object.keys(graph[node]);
            if (children.length === 0) {
                cache[node] = funFactor[Number(node)];
            } else {
                let m1 = funFactor[Number(node)];
                for (let childrenNode of children) {
                    for (let grandChildrenNode in graph[childrenNode]) {
                        m1 += funParty(grandChildrenNode);
                    }
                }
                let m2 = 0;
                for (let childrenNode of children) {
                    m2 += funParty(childrenNode);
                }
                cache[node] = Math.max(m1, m2);
            }
        }
        console.log(`funparty(${node})===` + cache[node]);
        return cache[node];
    }
    console.log("graph", graph);
    return funParty(leave).toString();
}