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

    it("solves sample 4", () => {
        expect(solve(split(`
            1 1
            30
            1680
            -87
        `))).toEqual("Bounded solution\n0.000000000000000")
    });

    it("solves sample 5", () => {
        expect(solve(split(`
            1 1
            -66
            2645
            52
        `))).toEqual("Infinity")
    });

    it("solves sample 6", () => {
        expect(solve(split(`
            1 2
            21 -37
            3632
            76 18
        `))).toEqual("Infinity")
    });

    it("solves sample 28", () => {
        expect(solve(split(`
            2 3
            52 50 -20
            -90 -98 -30
            2240 -17986
            54 38 83
        `))).toEqual("Infinity")
    });

    it("solves sample 37", () => {
        expect(solve(split(`
            3 1
            -78
            -24
            10
            -4898 -499 -8710
            44
        `))).toEqual("No solution")
    });
    it("solves sample 48", () => {
        expect(solve(split(`
            3 3
            -88 -2 59
            -46 -46 14
            37 49 78
            9662 28703 21007
            16 66 95
        `))).toEqual("Bounded solution\n0.000000000000000 428.714285714285722 0.000000000000000")
    });
    it("solves sample 51", () => {
        expect(solve(split(`
            3 3
            -46 -46 14
            38 -14 -30
            23 100 -86
            -14867 -7071 -10179
            100 -30 -80
        `))).toEqual("Infinity")
    });
    it.skip("solves sample 55", () => {
        expect(solve(split(`
            3 4
            39 13 37 29
            68 2 9 -3
            48 -58 -84 43
            5770 2880 -5182
            -76 -21 15 87        
        `))).toEqual("Bounded solution\n0.000000000000002977 0.000000000000000000 98.929227712937674000 72.745468090389863000")
    });
    it("solves sample 105", () => {
        expect(solve(split(`
            5 5
            -77 71 15 49 -2
            77 -71 37 89 95
            31 88 62 16 -73
            38 -47 6 -42 -68
            59 79 26 -18 -92
            -44048 -6918 -26568 41777 1607
            -87 87 -43 86 13        
        `))).toEqual("No solution")
    });
});