import { Matrix } from "../gaussian";
import { brutForce } from "../../utils/index";
import * as _ from "underscore";

export default function(input: string[]) {

    console.log(input.join("\n"));

    const [restrictions, dishes] = input[0].split(" ").map(Number);
    const toMaximize = input.slice(-1).map(Number);
    const rows = input.slice(1, -2);
    const rightColumn = input.slice(-2, -1)[0].split(" ");

    let matrixData = rows
        .map((x, idx) => (x + " " + rightColumn[idx]).split(" ").map(Number))
    /*    .concat(Array.from({ length: dishes }, (v, idx) => {
            const res = Array.from({ length: dishes + 1 }, () => 0);
            res[idx] = 1;
            return res;
        }));
    */
    console.log(matrixData);

    const intersects = (...rows: number[][]): boolean => {
        console.log("checking for intersection", rows);
        if (rows.length !== dishes) {
            throw new Error("There needs to be " + dishes + " rows for intersection");
        }
        const m = new Matrix(rows.map(x => x.join(" ")));
        m.rowReduce();
        m.solveAllRows();
        return true;
    }
    type Row = number[];
    const intersections = new Map<Row, Row[][]>();
    matrixData.forEach((currentRow, idx) => {
        const withoutCurrent = matrixData.filter((x, i) => i !== idx);
        const combinations = brutForce(withoutCurrent, dishes - 1);
        const intersectsWith = combinations.filter((row) => intersects(...row, currentRow));
        if (intersectsWith.length > 0) {
            intersections.set(currentRow, intersectsWith);   
        }
    });

    type Vertex = number[];

    function getVertex(rows: Row[]) {
        if (rows.length !== dishes) {
            throw new Error();
        }
        const m = new Matrix(rows);
        m.rowReduce();
        const vertex = m.solveAllRows();
        return vertex;
        
    }
    function getValue(vertex: Vertex) {
        const res = vertex.map((x, idx) => x * toMaximize[idx]).reduce((a, b) => a + b);
        return res;
    }

    const forwardX: Row = [1].concat(new Array<number>(dishes - 1).fill(0))

    for (let [row, combination] of intersections) {
        let currentVertex = getVertex([row, ...combination[0]]);
        let currentValue = getValue(currentVertex);

        for (let intersectWith of combination) {
            for (let relaxRow of intersectWith) {

                const others = intersectWith.filter(x => x !== relaxRow);
                const m = new Matrix([row, ...others]);

                const forwardVertex = getVertex([row, ...others, forwardX]);
                const forwardValue = getValue(forwardVertex);

                if (forwardValue > currentValue) {
                    

                    
                }
            }
        }

        break;
    }
    
    /*
    
    const pnt = m.solveAllRows();
    console.log(pnt);
    */
}
