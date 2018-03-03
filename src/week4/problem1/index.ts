const scc = require("strongly-connected-components");
export default function(input: string[]) {
    const startTime = Date.now();
    const [variables, clauses] = input[0].split(" ").map(Number);
    const adjacencyList: Set<number>[] = Array.from({ length: variables * 2 }, () => new Set());
    for (let i = 1; i <= clauses; i++) {
        const space = input[i].indexOf(" ");
        var a = Number(input[i].substr(0, space));
        var b = Number(input[i].substr(space));
        const A = a > 0 ? a - 1 : a + variables * 2;
        const negA = -a > 0 ? -a - 1 : -a + variables * 2;
        if (b) {
            const B = b > 0 ? b - 1 : b + variables * 2;
            const negB = -b > 0 ? -b - 1 : -b + variables * 2;
            /*
            if (adjacencyList[negA].has(negB) || adjacencyList[negB].has(negA)) {
                return "UNSATISFIABLE";
            }
            */
            adjacencyList[negA].add(B);
            adjacencyList[negB].add(A);
        } else {
            adjacencyList[negA].add(A);
        }
    }
    for (var i = 0; i < adjacencyList.length; i++) {
        adjacencyList[i] = Array.from(adjacencyList[i]) as any;
    }
    const sccRes = scc(adjacencyList) as {components: number[][], adjacencyList: number[][]};
    const components = sccRes.components;
    for (var i = 0; i < components.length; i++) {
        var arr = components[i];
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] < variables) {
                arr[j] += 1;
            }  else {
                arr[j] -= variables * 2;
            }
        }
    }

    const res: number[] = []
    for (let c of components) {
        const a: any = {};
        for (let v of c) {
            a[v] = true;
            if (a[-v] !== undefined) {
                return "UNSATISFIABLE";
            }
            if (v > 0) {
                if (res[v] === undefined) {
                    res[v] = v;
                }
            } else {
                if (res[-v] === undefined) {
                    res[-v] = v;
                }
            }
        }
    }
    return "SATISFIABLE\n"+res.slice(1).join(" ");
}
