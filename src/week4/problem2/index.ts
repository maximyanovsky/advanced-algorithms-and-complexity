export default function(input: string[]) {
    const startTime = Date.now();
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


    let leaf: string = "";
    console.log(lll)
    for (var k in lll) {
        if (lll[k] <= 1) {
            leaf = k;
            break;
        }
    }
    console.log("leave", leaf)
    var visited: any = {}
    var queue = Object.keys(graph[leaf]);
    for (const n of queue) {
        visited[n] = true;
        console.log("delete", n + "->" + leaf);
        delete graph[n][leaf];
    }
    let queueIndex = 0;
    while(queueIndex < queue.length) {
        var visitingNode = queue[queueIndex]
        console.log("visit", visitingNode)
        for (let n in graph[visitingNode]) {
            if (!visited[n]) {
                queue.push(n);
                visited[n] = 1 + visited[visitingNode];
                console.log("delete", n + "->" + visitingNode);
                delete graph[n][visitingNode];
            }
        }
        queueIndex++;
    }

    console.log("preparation", Date.now() - startTime)

    const nodesInGoodOrder = Object.keys(graph).sort((a, b) => {
        return visited[b] - visited[a];
    });

    queue = nodesInGoodOrder;
    let qIdx = 0;
    const cache: any = {};
    const onStack = {};
    while(qIdx < queue.length) {
        const node = queue[qIdx++];
        if (cache[node] === undefined) {
            const children = Object.keys(graph[node]);
            if (children.length === 0) {
                cache[node] = funFactor[Number(node)];
            } else {
                let m1 = funFactor[Number(node)];
                const qLength = queue.length;
                for (let childrenNode of children) {
                    for (let grandChildrenNode in graph[childrenNode]) {
                        if (!(grandChildrenNode in graph[node])) {
                            if (cache[grandChildrenNode] == undefined) {
                                queue.push(grandChildrenNode);
                            } else {
                                m1 += cache[grandChildrenNode];
                            }
                        }
                    }
                }
                let m2 = 0;
                for (let childrenNode of children) {
                    if (cache[childrenNode] == undefined) {
                        queue.push(childrenNode);
                    } else {
                        m2 += cache[childrenNode];
                    }
                }
                if (queue.length === qLength) {
                    cache[node] = Math.max(m1, m2);
                } else {
                    queue.push(node);
                }
            }
        }
    }
    //console.log(queue.length)
    return cache[leaf].toString();
}