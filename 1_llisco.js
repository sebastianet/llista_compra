//     Aplicacio "llista de la compra"
//     Febrer de 2017.
//     Enrique Sarradell <enricsarra@gmail.com>
//     Sebastia Altemir, sebastiasebas@gmail.com

"use strict";

// Moduls que ens calen :
// ======================

var express      = require( 'express' ) ;
var app = express() ;

var session      = require( 'express-session' ) ;    // express session
var bodyParser   = require( "body-parser" ) ;

var path         = require( 'path' ) ;
var logger       = require( 'morgan' ) ;             // logging middleware
var fs           = require( 'fs' ) ;                 // get JPG or PNG


// No sé si s´han de posar
//var gpio         = require( 'rpi-gpio' ) ;           // GPIO pin access
//var PythonShell  = require( 'python-shell' ) ;       // send commands to python


// les meves constants :
// =====================


// les meves variables :
// =====================


// configuracio :
// ==============

     app.set( 'mPort', process.env.PORT || 3000 ) ;      // save port to use in APP var ; shall use 3000 (see docu)




var express = require("express"),
	app = express();

app.get("/", function (req, res){
	res.end("<h1>Hola desde el mini Express!</h1>");
});

app.get("/sendFile",function (req, res){
	
	console.log("__dirname: " + __dirname + "/statics/index.html");
	res.sendFile(__dirname + "/statics/index.html");
});


/*
app.listen(3000);

console.log("mini Express al port 3000");
*/


app.set( 'mPort', process.env.PORT || 3000 ) ; 
console.log("ddddddddddddddddddddddddddddddddddddddd");
var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {

     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App listening at http://%s:%s', host, port ) ;

} ) ; // server
 


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