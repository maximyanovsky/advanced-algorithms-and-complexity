import solve from "./index";
import { split } from "../../utils/index";

describe("week4/problem1", () => {
    it("solves sample1", () => {
        expect(solve(split(`3 3
        1 -3
        -1 2
        -2 -3`))).toEqual("SATISFIABLE\n1 2 -3");
    });
    it("solves sample2", () => {
        expect(solve(split(`1 2
        1 1
        -1 -1`))).toEqual("UNSATISFIABLE");
    });
});