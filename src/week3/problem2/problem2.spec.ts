import solve from "./index";
import { split } from "../../utils/index";
import { getResult } from "../util";

describe("week3/problem2", () => {
    it("it solves sample0", () => {
        const result = solve(split(`
            3 2
            1 2
            2 3
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves triangle", () => {
        const result = solve(split(`
            3 3
            1 2
            2 3
            1 3
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves triangle with tail", () => {
        const result = solve(split(`
            4 4
            1 2
            2 3
            1 3
            1 4
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves triangle with two tails", () => {
        const result = solve(split(`
            5 5
            1 2
            2 3
            3 1
            2 4
            3 5
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves square", () => {
        const result = solve(split(`
            4 4
            1 2
            2 3
            3 4
            1 4
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves square with tail", () => {
        const result = solve(split(`
            5 5
            1 2
            2 3
            3 4
            1 4
            1 5
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves square with two tails", () => {
        const result = solve(split(`
            6 6
            1 2
            2 3
            3 4
            1 4
            1 5
            3 6
        `))
        console.log(result);
        expect(getResult(result)).toBe(false);
    });
    it("it solves sliced square", () => {
        const result = solve(split(`
            4 5
            1 2
            2 3
            3 4
            1 4
            1 3
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });
    it("it solves sample1", () => {
        const result = solve(split(`
            5 4
            1 2
            2 3
            3 5
            4 5
        `))
        console.log(result);
        expect(getResult(result)).toBe(true);
    });

    it("it solves sample2", () => {
        const result = solve(split(`
            4 3
            1 2
            1 3
            1 4
        `))
        console.log(result);
        expect(getResult(result)).toBe(false);
    });
    it.skip("it solves 30 0", () => {
        const result = solve(split(`
            30 0
        `))
        console.log(result.substr(0, 30))
        //expect(getResult(result)).toBe(false);
    });

    it.skip("it solves sample3", () => {
        console.log = jest.fn();
        const result = solve(split(`30 80
        1 9
        1 10
        1 16
        1 20
        2 23
        3 7
        3 22
        4 22
        4 30
        5 3
        5 9
        5 18
        5 25
        6 4
        6 22
        6 27
        7 2
        7 20
        7 26
        8 16
        8 26
        9 5
        9 6
        9 13
        10 24
        11 2
        11 16
        11 17
        11 27
        12 8
        12 29
        13 4
        13 6
        13 9
        13 12
        13 15
        13 18
        14 22
        15 6
        15 28
        16 15
        16 18
        17 6
        17 14
        17 22
        18 3
        19 6
        19 12
        19 24
        20 4
        20 7
        20 11
        21 13
        21 14
        22 4
        22 17
        23 4
        23 16
        23 20
        23 29
        24 1
        24 20
        24 27
        24 28
        25 10
        25 18
        26 9
        26 29
        27 10
        27 18
        28 8
        28 11
        28 27
        29 11
        29 17
        29 21
        30 9
        30 11
        30 16
        30 19`))
        console.log(result.substr(0, 50));
        expect(getResult(result)).toBe(true);
    });
});