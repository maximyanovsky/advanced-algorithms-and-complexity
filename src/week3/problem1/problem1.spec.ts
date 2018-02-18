import solve from "./index";
describe("week3/problem1", () => {
    it("it solves sample 1", () => {
        const data = `
        3 3
        1 2
        2 3
        1 3
        `.trim().split("\n")
        expect(solve(data)).toEqual(`1 1\n1 -1 0`)
    });
});