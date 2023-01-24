var mysqli = require("mysql");
var http = require("http");

http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/json" });

  var q = url.parse(req.url, true);
  var datos = q.query;
  
});
