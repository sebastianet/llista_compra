//     Aplicacio "llista de la compra"
//     Febrer de 2017.
//     Enrique Sarradell <enricsarra@gmail.com>
//     Sebastia Altemir, sebastiasebas@gmail.com

"use strict";

var express = require("express"),
	app = express();

app.get("/", function (req, res){
	res.end("<h1>Hola desde el mini Express!</h1>");
});

app.listen(3000);

console.log("mini Express al port 3000");


/*
	
	No entenc el '192.168.1.123' que crec que es el [hostname] ni el   [backlock]
	
	app.listen(port, [hostname], [backlog], [callback])
	-------------------------------------------------------------
	
	app.set( 'mPort', process.env.PORT || 3000 ) ;      
var server = app.listen( app.get( 'mPort' ), '192.168.1.123', function () {

    var host = server.address().address ;
    var port = server.address().port ;
    console.log( '>>> App listening at http://%s:%s', host, port ) ;
*/