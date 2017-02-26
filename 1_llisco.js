
//     Aplicacio "llista de la compra"
//     Febrer de 2017.
//     Enrique Sarradell <enricsarra@gmail.com>
//     Sebastia Altemir, sebastiasebas@gmail.com

// per engegar el servidor   :     0_engega_app_llista_compra.sh
// per accedir des un client :     http://192.168.1.123:3535       - des la xarxa de casa meva
//                                 http://IP-EXTERNA:9035          - des el exterior del meu router
//    com saber la meva IP externa ?

// Versions ( displayed via 'myVersio')
//     1.1.a - inici del codi amb express


"use strict";

// Moduls que ens calen :
// ======================

var express      = require( 'express' ) ;
var app = express() ;

// les meves variables
     var myVersio        = 'v 1.1.a' ;       // version identifier


var express = require("express"),
	app = express();


// configuracio :
// ==============

     app.set( 'mPort', process.env.PORT || 3535 ) ;      // save port to use in APP var ; shall use 3535 (see docu)

// definim les branques a executar segon els que rebem del browser client

app.get("/", function (req, res){
	res.end("<h1>Hola desde el mini Express!</h1>");
});

app.get("/sendFile",function (req, res){
	
	console.log("__dirname: " + __dirname + "/statics/index.html");
	res.sendFile(__dirname + "/statics/index.html");
});




// creacio del servidor :
// ======================

var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {


     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App listening at http://%s:%s', host, port ) ;

} ) ; // server
 
