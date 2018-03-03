import solve from "./index";
import { split } from "../../utils/index";

describe("week4/problem2", () => {
    it("solves sample1", () => {
        expect(solve(split(`1
        1000`))).toEqual("1000");
    });
    it("solves sample2", () => {
        expect(solve(split(`2
        1 2
        1 2`))).toEqual("2");
    });
    it("solves sample3", () => {
        expect(solve(split(`5
        1 5 3 7 5
        5 4
        2 3
        4 2
        1 2`))).toEqual("11");
    });
});