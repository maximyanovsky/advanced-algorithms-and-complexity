export const split = (input: string) => input
    .trim()
    .split("\n")
    .map(x => x.trim());

export function brutForce<T>(arr: T[], count: number): T[][] {
    const res: T[][] = [];
    if (count === 1) {
        res.push(...arr.map(x => [x]));
    } else {
        for (var i = 0; i < arr.length; i++) {
            res.push(...brutForce(arr.slice(i + 1), count - 1).map(x => [arr[i], ...x]));
        }
    }
    return res;
}