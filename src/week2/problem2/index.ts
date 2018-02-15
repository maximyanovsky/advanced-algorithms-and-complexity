import { Matrix } from "../gaussian";
import { brutForce } from "../../utils/index";
import * as _ from "underscore";

type Equasion = number[];
type Vertex = Eq[]; //n equasions define vertex
type Edge = Eq[]; //n-1 equasions define edge

class Eq {
    public id: string;
    public data: number[];
    public vertices: Vertex[] = [];
    constructor(row: number[]) {
        this.id = row.join("|");
        this.data = row;
    }
    toString() {
        return "Eq(" + this.id + ")";
    }
}

class Polytop {
    public dimension: number;
    public equations: Eq[];
    public vertices: Vertex[] = [];
    private forwardEq: Eq;
    private backwardEq: Eq;
    private toMax: number[];
    private firstPart: number[][];
    constructor(data: Equasion[], toMax: number[], contsraints: number[]) {
        this.toMax = toMax;
        this.equations = data.map(x => new Eq(x));
        this.dimension = data[0].length - 1;

        const zeroes = Array.from({ length: this.dimension - 1}, x => 0);
        this.forwardEq = new Eq([1, ...zeroes, 1]);
        this.backwardEq = new Eq([-1, ...zeroes, 1]);

        const combinations = brutForce(this.equations, this.dimension);
        console.log("combinations", combinations);

        this.firstPart = data.slice(0, data.length - this.dimension);
        this.vertices = combinations.filter((x) => {
            const m = new Matrix(x.map(x => x.data));
            m.rowReduce();
            const solution = m.solveAllRows();
            console.log(m.toString());
            console.log(solution)
            if (solution && solution.every(x => x >= 0) && this.isSolution(solution)) {
                console.log("vertex found", solution);
                this.vertices.push(x);
                return true;
            } else {
                console.log("not solved");
                return false;
            }
        });

        console.log("vertices\n", this.vertices);
    }

    isSolution(solution: number[]): boolean {
        return this.firstPart.every((eq) => {
            return solution.map((x, idx) => x * eq[idx]).reduce((a, b) => a + b, 0) <= eq[eq.length - 1];
        });
    }

    getEdges(vertex: Vertex): Edge[]  {
        return brutForce(vertex, this.dimension - 1);
    }

      getVerticesOnEdge(edge: Edge): Vertex[] {
        const res = [];
        loop: for (let vertex of this.vertices) {
            for (let eq of edge) {
                if (vertex.indexOf(eq) === -1) {
                    continue loop;
                }
            }
            res.push(vertex);
        }
        return res;
    }

    getSolution(vertex: Vertex, t = 0) {
        const m = new Matrix(vertex.map(x => x.data));
        console.log(m.toString());
        m.rowReduce();
        if (t !== 0) {
            const size = m.data[0].length - 1;
            let zeroIdx: number | undefined;
            loop: for (var i = 0; i < size; i++) {
                for (let row of m.data) {
                    if (row[i] !== 0) {
                        continue loop;
                    }
                }
                zeroIdx = i;
                break;
            }
            if (m.data.length < size && zeroIdx === undefined) {
                zeroIdx = 0;
            }
            if (zeroIdx !== undefined) {
                m.data.push([...Array.from({ length: size }, (x, idx) => {
                    return idx === zeroIdx ? 1 : 0;
                }), t]);
                m.rowReduce();
            }
        }
        console.log(m.toString());
        return m.solveAllRows();
    }

    getValue(solution: number[]): number {
        console.log(solution, this.toMax)
        return solution.map((x, idx) => x * this.toMax[idx]).reduce((a, b) => a + b, 0);
    }

    getVertexOnEdge(edge: Edge, forward: boolean): Vertex {
        if (forward) {
            return [...edge];
        }
        return [...edge];
    }
}

export default function(input: string[]) {

    console.log(input.join("\n"));

    const [restrictions, dishes] = input[0].split(" ").map(Number);
    const toMaximize = input.slice(-1)[0].split(" ").map(Number);
    console.log("TOO max", toMaximize)
    const rows = input.slice(1, -2);
    const rightColumn = input.slice(-2, -1)[0].split(" ").map(Number);

    let matrixData = rows
        .map((x, idx) => (x + " " + rightColumn[idx]).split(" ").map(Number))
        .concat(
            Array.from({length: dishes}).map((v, idx1) => Array.from({ length: dishes + 1 },
                (v, idx2) => idx1 === idx2 ? 1 : 0)),
        );
    console.log("matrixdata\n", matrixData.join("\n"));
    const polytop = new Polytop(matrixData, toMaximize, rightColumn);

    let currentVertex = polytop.vertices[0];
    if (!currentVertex) {
        return "No solution";
    }
    console.log("currentVertex", currentVertex);
    const currentSolution = polytop.getSolution(currentVertex)!;
    let currentValue = polytop.getValue(currentSolution);
    console.log(currentValue)
    loop: while (true) {
        for (let edge of polytop.getEdges(currentVertex)) {
            const verticesOnEdge = polytop.getVerticesOnEdge(edge).filter(vertex => vertex !== currentVertex);
            console.log("edge", edge)
            console.log("vertices on edge", verticesOnEdge);
            for (let vertex of verticesOnEdge) {
                console.log("check vertex", vertex);
                const solution = polytop.getSolution(vertex)!;
                const value = polytop.getValue(solution);
                if (value > currentValue) {
                    console.log(value + " > " + currentValue)
                    currentValue = value;
                    currentVertex = vertex;
                    continue loop;
                } else {
                    console.log(value + " < " + currentValue);
                }
            }
            const forward = polytop.getSolution(edge, 1);
            console.log("forward", forward)
            if (forward && polytop.isSolution(forward) && polytop.getValue(forward) > currentValue) {
                console.log(forward)
                return "Infinity";
            }
        }

        const m = new Matrix(currentVertex.map(x => x.data));
        m.rowReduce();
        const solution = m.solveAllRows()!;
        return "Bounded solution\n" + solution.map(x => x.toFixed(15)).join(" ");
    }
    
}
