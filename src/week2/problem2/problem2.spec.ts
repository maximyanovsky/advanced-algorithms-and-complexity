import solve from "./index";
import { split } from "../../utils/index";
describe("Week 2, Problem 2", () => {
    it("solves sample 1", () => {
        expect(solve(split(`
            3 2
            -1 -1
            1 0
            0 1
            -1 2 2
            -1 2
        `))).toEqual("Bounded solution\n0.000000000000000 2.000000000000000");
    });
    it("solves sample 2", () => {
        expect(solve(split(`
            2 2
            1 1
            -1 -1
            1 -2
            1 1
        `))).toEqual("No solution")
    });

    it("solves sample 3", () => {
        expect(solve(split(`
            1 3
            0 0 1
            3
            1 1 1
        `))).toEqual("Infinity")
    });

    it.only("solves sample 3", () => {
        expect(solve(split(`
            1 1
            0 
            1
            1
        `))).toEqual("Infinity")
    });
});