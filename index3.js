var http = require('http');
// const { parse } = require('path/posix');
// const { stringify } = require('querystring');
var url = require('url');

http.createServer(function (req, res) {

var q = url.parse(req.url, true);
var datos = q.query;

res.writeHead(200, { 'Content-Type' : 'text/plain'});
let resultado1 = datos.num1 * datos.num2;
let resultado2 = datos.num1 / datos.num2;
res.write("La multiplicacion es: " + resultado1 + " y la division es: " + resultado2);
res.end();
}).listen(3090);