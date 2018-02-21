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
        if (graph[to][from] === undefined) {
            graph[from][to] = true;
        }
    }
    console.log(graph);
    const nodes = Object.keys(graph);
    console.log("nodes", nodes);

    function getRGB(i: number) {
        return {
            red: i * 3 + 1,
            green: i * 3 + 2,
            blue: i * 3 + 3,
        };
    }

    const result: number[][] = [];
    for (let i = 0; i < nodes.length; i++) {
        console.log("yo", i)
        const { red, green, blue } = getRGB(i);
        result.push(
            [red, green, blue], //the color is one of three
            [-red, -green], // !(red && green) == (!red || !green)
            [-red, -blue], // etc
            [-green, -blue],
        );
        console.log(graph[nodes[i]])
        for (let adjacent in graph[nodes[i]]) {
            const other = getRGB(Number(adjacent) - 1);
            result.push(
                [-red, -other.red],
                [-green, -other.green],
                [-blue, -other.blue],
            );
        }
    }
    return [
        result.length + " " + n * 3,
        ...result.map(x => x.concat([0]).join(" ")),
    ].join("\n");
}