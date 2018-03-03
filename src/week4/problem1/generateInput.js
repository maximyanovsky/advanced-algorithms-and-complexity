var fs = require('fs');
var stream = fs.createWriteStream("input.txt");
var c = 1000000;
stream.once('open', function(fd) {
  stream.write(c + " " + c + "\n");
  for (var i = 1; i <= c; i++) {
      stream.write(i + " " + (-i) + "\n")
  }
  stream.end();
});