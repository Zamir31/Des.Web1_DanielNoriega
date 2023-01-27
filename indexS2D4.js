var mysql = require("mysql");
var http = require("http");
var url = require("url");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/json" });
    var q = url.parse(req.url, true);
    var datos = q.query;

    var accion = datos.accion;

    let con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "biblioteca",
    });

    let sql = "";
    let parametros = [];

    let tabla = datos.tabla;

    if (tabla == "alumnos") {
      switch (accion) {
        case "insert":
          sql =
            "insert into alumnos " +
            " ( numero_cuenta, nombre_alumno, apellido_alumno) " +
            " values  " +
            " (?, ?, ?) ";
          parametros = [
            datos.numero_cuenta,
            datos.nombre_alumno,
            datos.apellido_alumno,
          ];
          break;
        case "select":
          sql = "select * from alumnos ";
          break;
        case "update":
          sql =
            " update alumnos " +
            " set nombre_alumno = ? , " +
            " apellido_alumno = ? " +
            " where numero_cuenta = ?";
          parametros = [
            datos.numero_cuenta,
            datos.nombre_alumno,
            datos.apellido_alumno,
          ];

          break;
        case "delete":
          sql = "delete from alumnos where numero_cuenta = ?";
          parametros = [datos.numero_cuenta];
          break;
        default:
          sql = "";
          break;
      }
    }

    if (tabla == "libros") {
      switch (accion) {
        case "select":
          sql = "select * from libros";
          break;
        case "insert":
          sql =
            "insert into libros " +
            " ( nombre_libro, genero_libro, fecha_lanzamiento, autor) " +
            " values " +
            " ( ?, ?, ?, ?) ";
          parametros = [
            datos.nombre_libro,
            datos.genero_libro,
            datos.fecha_lanzamiento,
            datos.autor,
          ];
          break;

        case "update":
          sql =
            "update libros " +
            " set nombre_libro = ?," +
            "genero_libro = ?, " +
            " fecha_lanzamiento = ? " +
            "autor = ?" +
            " where id_libro = ? "; 
            parametros = [
                datos.nombre_libro,
                datos.genero_libro,
                datos.fecha_lanzamiento,
                datos.autor,
                datos.id_libro
              ];
        case "delete":
          sql = "delete from libros where id_libro = ?";
          parametros = [datos.id_libro];
          break;
        default:
          break;
      }
    }

    if (tabla == "prestamos_libros") {
      switch (accion) {
        case "select":
          sql = "select * from prestamos_libros";
          break;
        case "insert":
          sql =
            "insert into prestamos_libros " +
            " ( id_libro, numero_cuenta, fecha_prestamo) " +
            " values " +
            " ( ?, ?, ?) ";
          parametros = [datos.id_libro, datos.numero_cuenta, datos.fecha_prestamo];
          break;

        case "update":
          sql =
            " update  prestamos_libros " +
            " set fecha_prestamo = ?" +
            " where id_prestamo = ? ";
          parametros = [datos.fecha_prestamo, datos.id_prestamo];
        case "delete":
          sql = "delete from prestamos_libros where id_prestamo = ?";
          parametros = [datos.id_prestamo];
          break;
        default:
          break;
      }
    }

    if (sql != "") {
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
    } else {
      let retorno = { mensaje: "Metodo no encontrado" };

      res.write(JSON.stringify(retorno));
      res.end();
    }
  })
  .listen(5000);
