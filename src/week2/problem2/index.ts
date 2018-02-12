import { Matrix } from "../gaussian";
import { brutForce } from "../../utils/index";
import * as _ from "underscore";

export default function(input: string[]) {

    console.log(input.join("\n"));

    const [restrictions, dishes] = input[0].split(" ").map(Number);
    const toMaximize = input.slice(-1);
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

    matrixData = matrixData.filter((currentRow, idx) => {
        const withoutCurrent = matrixData.filter((x, i) => i !== idx);
        const combinations = brutForce(withoutCurrent, dishes - 1);
        combinations.findIndex((row) => intersects(...row, currentRow))
    });
    
    
    const m = new Matrix(matrixData.map(x => x.join(" ")));
    m.rowReduce();
    console.log(m.toString());
    /*
    
    const pnt = m.solveAllRows();
    console.log(pnt);
    */
}
