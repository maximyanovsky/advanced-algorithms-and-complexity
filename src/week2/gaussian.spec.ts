import { Matrix } from "./gaussian";

describe("Matrix", () => {
    it("initialises", () => {
        const m = new Matrix(["1 2 3", "4 5 6", "7 8 9"]);
        expect(m.data).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });
    it("can swap rows", () => {
        const m = new Matrix(["1 2 3", "4 5 6", "7 8 9"]);
        m.swap(1, 2);
        expect(m.data).toEqual([
            [1, 2, 3],
            [7, 8, 9],
            [4, 5, 6],
        ]);
    });
    it("can multiply rows", () => {
        const m = new Matrix(["1 2 3", "4 5 6", "7 8 9"]);
        m.multiply(0, 3);
        expect(m.data).toEqual([
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });
    it("can solve row", () => {
        const m = new Matrix(["0 9 27",]);
        expect(m.solveRow(0)).toEqual(3);
    });
    it.only("solves matrix from problem2", () => {
        const m = new Matrix([
            "-77 71 15 49 -2 -44048",
            "77 -71 37 89 95 -6918",
            "0 0 1 0 0 0",
            "0 0 0 1 0 0",
            "0 0 0 0 1 0",
        ]);
        m.rowReduce();
        m.solveAllRows();
    });
});