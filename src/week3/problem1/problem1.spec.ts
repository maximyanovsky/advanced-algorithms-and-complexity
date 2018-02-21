import solve from "./index";
import { split } from "../../utils/index";
import satSolve from "../sat";
describe("week3/problem1", () => {
    it("it solves sample1", () => {
        const result = solve(split(`
            3 3
            1 2
            2 3
            1 3
        `))
        expect(getResult(result)).toBe(true);
    });
    it("it solves sample2", () => {
        const result = solve(split(`
            4 6
            1 2
            1 3
            1 4
            2 3
            2 4
            3 4
        `))
        expect(getResult(result)).toBe(false);
    });
    it.only("it solves generated case", () => {
        const result = solve(generateCase(500, 1))
        expect(getResult(result)).toBe(true);
    });
});

function getResult(result: string) {
    const arr = result.split("\n");
    const [clauses, variables] = arr[0].split(" ").map(Number);
    expect(clauses).toBeLessThanOrEqual(5000);
    expect(variables).toBeLessThanOrEqual(3000);

    const res = satSolve(variables, arr.slice(1).map(x => x.split(" ").map(Number).filter(x => x !== 0)))
    return res;
}

function generateCase(vertices: number, edges: number) {
    if (vertices > 500 || vertices < 2 || edges < 1 || edges > 1000) {
        throw new Error("bad case");
    }
    return [
        vertices + " " + edges,
        ...Array.from({ length: edges }, x => {
            const from = Math.ceil(Math.random() * vertices);
            let to = Math.ceil(Math.random() * vertices);
            while(to === from) {
                to = Math.ceil(Math.random() * vertices);
            }
            return from + " " + to;
        })
    ]
}