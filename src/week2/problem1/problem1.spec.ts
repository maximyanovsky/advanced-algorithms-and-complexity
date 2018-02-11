import solve from "./index";
import { split } from "../../utils/index";

describe("Week 2, Problem 1", () => {
    it("sample 1", () => {
        expect(solve(split(`
            0
        `))).toBe("");
    });
    it("sample 2", () => {
        expect(solve(split(`
            2
            1 1 3
            2 3 7
        `))).toBe("2.000000 1.000000");
    });
    it("sample 3", () => {
        expect(solve(split(`
            4
            1 0 0 0 1
            0 1 0 0 5
            0 0 1 0 4
            0 0 0 1 3
        `))).toBe("1.000000 5.000000 4.000000 3.000000");
    });
    it("sample 4", () => {
        expect(solve(split(`
            2
            5 -5 -1
            -1 -2 -1
        `))).toBe("0.200000 0.400000");
    });

    it("sample 5", () => {
        expect(solve(split(`
            1
            5 -1
        `))).toBe("-0.200000");
    });
    describe.skip("generated", () => {
        const generateCase = (n: number, maxValue: number) => [
            n.toString(),
            ...Array.from({ length: n }, (v, row) => Array.from({ length: n + 1 }, (v, column) => {
                return Math.floor(Math.random() * 2 *  maxValue - maxValue);
            }).join(" "))
        ];
        const n = 3;
        for (var i = 0; i < 100; i++) {
            it("generated case #" + i, () => {
                const result = solve(generateCase(n, 100));
                expect(result).toBeDefined();
                expect(result.split(" ").length).toBe(n);
            });
        }
    });

    it("sample 6", () => {
        expect(solve(split(`
            2
            3 4 10
            5 -7 3
        `))).toBe("2.000000 1.000000");
    });

    it("sample 7", () => {
        expect(solve(split(`
            3
            1 2 -3 -4
            2 5 -4 0
            -3 1 3 5
        `))).toBe("2.050000 1.700000 3.150000");
    });

    it("sample 8", () => {
        expect(solve(split(`
            4
            3 2 1 1 -2
            1 -1 4 -1 -1
            -2 -2 -3 1 9
            1 5 -1 2 4
        `))).toBe("-3.000000 -1.000000 2.000000 7.000000");
    });

    it("sample 9", () => {
        expect(solve(split(`
            4
            3 2 1 1 -2
            1 -1 4 -1 -1
            -2 -2 -3 1 9
            1 5 -1 2 4
        `))).toBe("-3.000000 -1.000000 2.000000 7.000000");
    });
});