process.stdin.resume();
process.stdin.setEncoding('ascii');

console.log = () => undefined;
declare const SOLUTION_PATH: string;

let stdinInput = "";
process.stdin.on("data", function (data: string) {
    stdinInput += data;
});

process.stdin.on("end", function () {
    let input = stdinInput.trim().split("\n");
    const solution = require(SOLUTION_PATH);
    const result = solution.default(input).toString();
    if (result) {
        process.stdout.write(result + "\n");
    }
});
