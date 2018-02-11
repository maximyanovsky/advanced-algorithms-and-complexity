import calc from "./index";
import { split } from "../../utils/index";

describe("Week 1, Problem 1", () => {
    it("returns correct outputs for inputs from problem description", () => {
        console.log = jest.fn();
        expect(calc(split(`
            5 7
            1 2 2
            2 5 5
            1 3 6
            3 4 2
            4 5 1
            3 2 3
            2 4 1
        `))).toBe(6);
        expect(calc(split(`
            4 5
            1 2 10000
            1 3 10000
            2 3 1
            3 4 10000
            2 4 10000
        `))).toBe(20000);
    });
    it("returns 0 where no edges", () => {
        expect(calc(split(`
            2 0
        `))).toBe(0);
    });
});