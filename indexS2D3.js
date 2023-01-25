var mysql = require("mysql");
var http = require("http");
var url = require("url");

http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/json" });

  var q = url.parse(req.url, true);
  var datos = q.query;

  var accion = datos.accion;

  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "registrotel",
  });

  let sql = "";
  let parametros = [];

  switch (accion) {
    case "insert":
      sql =
        `insert into tbl_telefonos(numero, id_persona) values (?, ?)`;
      parametros = [datos.numero, datos.id_persona];
      break;
    case "select":
      sql = "select * from tbl_telefonos";
      break;

    default:
      break;
  }

  con.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      con.query(sql, parametros, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.write(JSON.stringify(result));
          res.end();
        }
      });
    }
  });
}).listen(4000);