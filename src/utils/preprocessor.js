const tsc = require("typescript");
const tsConfig = require("../../tsconfig.json");
const babelJest = require("babel-jest");

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      src = tsc.transpile(src, tsConfig.compilerOptions, path, []);
    }
    return babelJest.process(src, "file.js", require("../../package.json").jest);
  },
};