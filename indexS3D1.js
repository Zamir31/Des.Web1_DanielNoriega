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

    let sql = "insert into tbl_telefonos " +
            " (numero, id_persona) " +
            " values (?, ?)";
    
    let parametros = [  req.body.numero, 
                        req.body.id_persona
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

    let sql = " update tbl_telefonos set numero = ?, " +
                " id_persona = ? "+
                " where id_telefono = ? ";

    let parametros = [  req.body.numero, 
                        req.body.id_persona, 
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

app.delete('/api/telefonos/:id', (req, res)=>{

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "registrotel"
    });

    let sql = "delete from tbl_telefonos where id_telefono = ?";

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