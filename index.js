var http = require('http');
// const { parse } = require('path/posix');
// const { stringify } = require('querystring');
var url = require('url');

http.createServer(function (req, res) {

var q = url.parse(req.url, true);
var datos = q.query;

res.writeHead(200, { 'Content-Type' : 'text/plain'});

let nombre = String(datos.nombre);
res.write("Bienvenido " + nombre);
res.end();
}).listen(3030);