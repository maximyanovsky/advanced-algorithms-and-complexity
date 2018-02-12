import { brutForce } from "./index";

describe("brutForce", () => {
    it("works", () => {
        expect(brutForce(
            [1, 2, 3, 4, 5], 1).length
        ).toBe(5);
        expect(brutForce(
            [1, 2, 3, 4, 5], 2).length
        ).toBe(10);
        expect(brutForce(
            [1, 2, 3, 4, 5], 3).length
        ).toBe(10);
        expect(brutForce(
            [1, 2, 3, 4, 5], 4).length
        ).toBe(5);
        expect(brutForce(
            [1, 2, 3, 4, 5], 5).length
        ).toBe(1);
    });

});