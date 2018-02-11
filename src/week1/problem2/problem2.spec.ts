import calc from "./index";
import { split } from "../../utils/index";

describe("Week 1, Problem 2", () => {
    console.log = jest.fn();
    it("returns correct outputs for inputs from problem description", () => {
        expect(calc(split(`
            3 4
            1 1 0 1
            0 1 0 0
            0 0 0 0
        `))).toBe("1 2 -1");
        expect(calc(split(`
            2 2
            1 1
            1 0
        `))).toBe("2 1");
    });
});