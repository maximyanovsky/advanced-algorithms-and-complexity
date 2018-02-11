const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

module.exports = fs
    .readdirSync("./build")
    .filter((file) => fs.lstatSync("./build/" + file).isDirectory())
    .filter((dir) => /week\d*/.test(dir))
    .map((week) => fs.readdirSync("./build/" + week)
        .filter((file) => fs.lstatSync("./build/" + week + "/" + file).isDirectory())
        .filter((dir) => /problem\d*/.test(dir))
        .map((problem) => ({
            entry: './build/index.js',
            target: 'node',
            output: {
                path: path.resolve(__dirname, "dist", week),
                filename: problem + ".js"
            },
            plugins: [
                new webpack.DefinePlugin({
                    SOLUTION_PATH: JSON.stringify("./" + week + "/" + problem + "/index.js"),
                })
            ]
        }))
    ).reduce((a, b) => a.concat(b));