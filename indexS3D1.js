const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/telefonos/', (req, res)=>{


    /*Lo que yo programe acá sera la logica 
    que se ejecutara cuando se consuma el WS con el metodo get 
    a la ruta  http://localohost:3000/api/persona/  */


    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "registrotel"
    });

    let sql = "select * from tbl_telefonos";

    con.connect(function(err){

        if (err){
            res.send(err);
        }else{
            con.query(sql, function(err, result){

                if (err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            });
        }
    } );

});

app.get('/api/telefonos/:id', (req,res)=>{


    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "registrotel"
    });

    let sql = "select * from tbl_telefonos where id_telefono = ?";
    let parametros = [req.params.id];

    con.connect(function(err){

        if (err){
            res.send(err);
        }else{
            con.query(sql, parametros, function(err, result){
                if (err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            });
        }
    });

});

app.post('/api/telefonos/', (req, res)=>{

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "registrotel"
    });

    let sql = "insert into tbl_persona " +
            " (nombre_persona, apellido_persona, fecha_nacimiento) " +
            " values (?, ?, ?)";
    
    let parametros = [  req.body.nombre_persona, 
                        req.body.apellido_persona, 
                        req.body.fecha_nacimiento
                    ];

    con.connect(function(err){

        if (err){
            res.send(err);
        }else{
            con.query(sql, parametros, function(err, result){
                if (err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            });
        }
    });
} );

app.put('/api/telefonos/:id', (req, res)=>{


    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "registrotel"
    });

    let sql = " update tbl_persona set nombre_persona = ?, " +
                " apellido_persona = ?,  "+
                " fecha_nacimiento = ? "+
                " where id_persona = ? ";

    let parametros = [  req.body.nombre_persona, 
                        req.body.apellido_persona, 
                        req.body.fecha_nacimiento, 
                        req.params.id];

    con.connect(function(err){

        if (err){
            res.send(err);
        }else{
            con.query(sql, parametros, function(err, result){
                if (err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            });
        }
    });

});

app.delete('/api/persona/:id', (req, res)=>{

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "registrotel"
    });

    let sql = "delete from tbl_persona where id_persona = ?";

    let parametros = [req.params.id];

    con.connect(function(err){

        if (err){
            res.send(err);
        }else{
            con.query(sql, parametros, function(err, result){
                if (err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            });
        }
    });

});

app.listen(3000);