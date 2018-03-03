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
                create: (i: number, j: number) => i * n + j + 1,
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

    const set = new Set();
    function append(i: any, j: any) {
        if (set.has(i+"_"+j)) {
            return
        }
        result.push([i, j]);
        set.add(i+"_"+j);
        set.add(j+"_"+i);
    }

    for (let i = 0; i < n; i++) {
        //1. each node must be in the path
        result.push(Array.from({ length: n }, (x, idx) => create(idx, i)));
        //3. Every position i on the path must be occupied.
        result.push(Array.from({ length: n }, (x, idx) => create(i, idx)));
    }

    //2. No node appears twice in the path
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            for (let k = 0; k < n; k++) {
                if (i !== k) {
                    append(
                        not(create(i, j)),
                        not(create(k, j)),
                    );
                }
                if (j !== k) {
                    append(
                        not(create(i, j)),
                        not(create(i, k)),
                    );
                }
                const I = (i + 1).toString();
                const J = (j + 1).toString();
                if (k < n - 1 && graph[I][J] === undefined && graph[J][I] === undefined) {
                    append(
                        not(create(k, i)),
                        not(create(k + 1, j)),
                    );
                }
            }
        }
    }

    let c = 0;
    const output = result.map(x => {
        c += x.length;
        return x.concat([0]).join(" ");
    });
    return [
        output.length + " " + n * n,
        ...output,
    ].join("\n");
}