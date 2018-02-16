import { Matrix } from "../gaussian";
import { brutForce } from "../../utils/index";
import * as _ from "underscore";

type Equasion = number[];
type Vertex = Eq[]; //n equasions define vertex
type Edge = Eq[]; //n-1 equasions define edge

class Eq {
    public id: string;
    public data: number[];
    constructor(row: number[]) {
        this.id = row.join("|");
        this.data = row;
    }
    toString() {
        return "Eq(" + this.id + ")";
    }
    move(t: number): Eq {
        return new Eq(this.data.slice(0, -1).concat([this.data[this.data.length - 1] + t]))
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
    public maxValue: number;
    public maxValueSolution: number[];
    public maxValueVertex: Vertex | undefined;
    constructor(data: Equasion[], toMax: number[], contsraints: number[]) {
        this.toMax = toMax;
        this.equations = data.map(x => new Eq(x));
        this.dimension = data[0].length - 1;

        const zeroes = Array.from({ length: this.dimension - 1}, x => 0);
        this.forwardEq = new Eq([1, ...zeroes, 1]);
        this.backwardEq = new Eq([-1, ...zeroes, 1]);

        const combinations = brutForce(this.equations, this.dimension);
        //console.log("combinations", combinations);

        this.firstPart = data.slice(0, data.length - this.dimension);

        let maxValue = -Infinity;
        let maxValueSolution: number[] = [];
        let maxValueVertex: Vertex | undefined;
        this.vertices = combinations.filter((x) => {
            const m = new Matrix(x.map(x => x.data));
            m.rowReduce();
            const solution = m.solveAllRows();
            //console.log(m.toString());
            //console.log(solution)
            if (solution) {
                if (this.isSolution(solution)) {
                    const v = this.getValue(solution);
                    if (v > maxValue) {
                        maxValue = v;
                        maxValueSolution = solution;
                        maxValueVertex = x;
                    }
                    console.log("vertex found", solution, this.getValue(solution));
                    this.vertices.push(x);
                    return true;
                } else {
                    console.log("not a solution", solution, this.getValue(solution))
                }
                
            } else {
                console.log("not solved");
                return false;
            }
        });

        this.maxValue = maxValue;
        this.maxValueSolution = maxValueSolution;
        this.maxValueVertex = maxValueVertex;

        console.log("vertices\n", this.vertices);
    }

    isSolution(solution: number[]): boolean {
        const epsilon = 0.0000001;
        const nonNegative = solution.every(x => x >= -epsilon);
        if (!nonNegative) {
            return false;
        }
        return this.firstPart.every((eq) => {
            const sum = solution.map((x, idx) => x * eq[idx]).reduce((a, b) => a + b, 0);
            const boundary = eq[eq.length - 1];
            if (sum > boundary + epsilon) {
                console.log("bigger", sum-boundary);
            }
            return sum <= boundary + epsilon;
        });
    }

    getEdges(vertex: Vertex): Edge[]  {
        return brutForce(vertex, Math.max(this.dimension - 1, 1));
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

    
    let currentVertex = polytop.maxValueVertex;
    if (!currentVertex) {
        return "No solution";
    }

    if (polytop.dimension === 1) {
        const solved = polytop.vertices.map((vertex) => {
            const solution = polytop.getSolution(vertex)!;
            const value = polytop.getValue(solution);
            return { solution, value };
        });
        const { solution, value } = _.max(solved, x => x.value);
        const forwardSolution = [solution[0] + 1];
        if (polytop.isSolution(forwardSolution) && polytop.getValue(forwardSolution) > value) {
            return "Infinity";
        }
        return "Bounded solution\n" + solution.map(x => x.toFixed(15)).join(" ");
    }
    console.log("currentVertex", currentVertex);
    const currentSolution = polytop.maxValueSolution;
    let currentValue = polytop.maxValue;
    console.log("current value", currentValue)
    loop: while (true) {
        const edges = polytop.getEdges(currentVertex);
        console.log("edges", edges);
        for (let edge of edges) {
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
        }

        console.log(">>>> Checking for infinity");
        for (var eq of currentVertex) {
            console.log("Check " + eq);
            const without = currentVertex.filter(x => x !== eq);
            for (let t of [-1, 1]) {
                const forward = polytop.getSolution(without.concat([eq.move(t)]));
                console.log("forward", forward)
                if (forward && polytop.isSolution(forward) && polytop.getValue(forward) > currentValue) {
                    console.log(polytop.getValue(forward) + " > " + currentValue);
                    return "Infinity";
                }
            }
            
            //const backward = polytop.getSolution(without.concat([eq.move(-1)]));
        }
        const m = new Matrix(currentVertex.map(x => x.data));
        m.rowReduce();
        const solution = m.solveAllRows()!;
        return "Bounded solution\n" + solution.map(x => x.toFixed(15)).join(" ");
    }
    
}
