export const split = (input: string) => input
    .trim()
    .split("\n")
    .map(x => x.trim());