process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array: string[];
var input_currentline = 0;
console.log = () => undefined;
declare const SOLUTION_PATH: string;

process.stdin.on("data", function (data: any) {
    input_stdin += data;
});

process.stdin.on("end", function () {
    input_stdin_array = input_stdin.trim().split("\n");
    const solution = require(SOLUTION_PATH);
    const result = solution.default(input_stdin_array).toString();
    if (result) {
        process.stdout.write(result + "\n");
    }
});
