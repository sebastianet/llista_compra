
//     Aplicacio "llista de la compra"
//     Febrer de 2017.
//     Enrique Sarradell   enricsarra@gmail.com      971.721.514
//     Sebastia Altemir    sebastiasebas@gmail.com   93.639.8522

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
     var szOut ;


// configuracio :
// ==============

     app.set( 'mPort', process.env.PORT || 3535 ) ;      // save port to use in APP var ; shall use 3535


// definim les branques a executar segon els que rebem del browser client

app.get("/enric", function (req, res){
     szOut = 'Hola. ' + myVersio ;
     res.end( "<h1>" + szOut + "</h1>" ) ;
});

app.get("/",function (req, res){
     console.log("__dirname: " + __dirname + "/statics/index.html");
     res.sendFile(__dirname + "/statics/index.html");
});



// creacio del servidor :
// ======================

var server = app.listen( app.get( 'mPort' ), '192.168.1.123', function () {
// var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {


     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App listening at http://%s:%s', host, port ) ;

} ) ; // server
 
