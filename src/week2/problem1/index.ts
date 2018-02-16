import { Matrix } from "../gaussian";

export default function (input: string[]): string {
    const dishes = Number(input[0]);
    if (dishes === 0) {
        return "";
    }
    const m = new Matrix(input.slice(1));
    m.rowReduce();
    return m.solveAllRows()!.map(x => x.toFixed(6)).join(" ");
}