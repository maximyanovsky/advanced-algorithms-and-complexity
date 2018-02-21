import satSolve from "./sat";

export function getResult(result: string) {
    const arr = result.split("\n");
    const [clauses, variables] = arr[0].split(" ").map(Number);
    const res = satSolve(variables, arr.slice(1).map(x => x.split(" ").map(Number).filter(x => x !== 0)))
    return res;
}