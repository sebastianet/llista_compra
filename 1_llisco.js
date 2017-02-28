
//     Aplicacio "llista de la compra"
//     Febrer de 2017.
//     Enrique Sarradell   enricsarra@gmail.com      971.721.514
//     Sebastia Altemir    sebastiasebas@gmail.com   93.639.8522

// per engegar el servidor   :     0_engega_app_llista_compra.sh
// per accedir des un client :     http://192.168.1.123:3535       - des la xarxa de casa meva
//                                 http://IP-EXTERNA:9035          - des el exterior del meu router
//    com saber la meva IP externa ?  https://www.whatismyip.com/ - avui (20170227-00:34) es 81.36.193.172

// Versions ( displayed via 'myVersio')
//     1.1.a - inici del codi amb express
//     1.1.b - set static files directory
//     1.1.c - set HOSTNAME and write initial message, "/enric" has timestamp
//     1.1.d - remove explicit INDEX sending
//     1.2.a - funciona el boto "Ajuda"


"use strict";


// moduls que ens calen
// ====================

var express      = require( 'express' ) ;
var app = express() ;

// les meves variables
     var myVersio        = 'v 1.2.a' ;       // version identifier
     var szOut ;


// configuracio
// ============

     app.set( 'mPort', process.env.PORT || 3535 ) ;           // save port to use in APP var ; shall use 3535
     app.set( 'appHostname', require('os').hostname() ) ;

// tell Express to load static files (if there any) from public folder

//      app.use( express.static( __dirname + '/statics' ) ) ;
     app.use( '/', express.static( __dirname + '/statics' ) ) ;    


// definim algunes funcions
// ========================

Date.prototype.yyyymmdd = function ( ) {                            // nova funcio yyymmdd de Date() - at server

     var yyyy = this.getFullYear().toString();                                    
     var mm   = (this.getMonth()+1).toString(); // getMonth() is zero-based         
     var dd   = this.getDate().toString();
     return yyyy + '/' + (mm[1]?mm:'0'+mm[0]) + '/' + (dd[1]?dd:'0'+dd[0]);

}; // yyyymmdd()

Date.prototype.hhmmss = function () {

     function fixTime(i) {
          return (i < 10) ? "0" + i : i;
     }
     var today = new Date(),
          hh = fixTime( today.getHours() ),
          mm = fixTime( today.getMinutes() ),
          ss = fixTime( today.getSeconds() ) ;
     var myHHMMSS = hh + ':' + mm + ':' + ss ;
     return myHHMMSS ;
} ; // hhmmss


// escriure un missatge inicial a la consola
// =========================================

    console.log( '+++ +++ +++ +++ +++ +++ +++ +++ app LLISCO starts. Versio [%s], HN [%s], TimeStamp [%s-%s].',
        myVersio, app.get( 'appHostname' ), (new Date).yyyymmdd(), (new Date).hhmmss() ) ;




// definim les branques a executar segons els que rebem del browser client
// =======================================================================

app.get( "/enric", function (req, res){
     console.log( ">>> Serve timestamp" ) ;
     szOut = 'Hola Enric. ' + myVersio + ' {' + (new Date).hhmmss() + '}' ;
     res.end( "<h1>" + szOut + "</h1>" ) ;
});


// app.get( "/", function (req, res){
//      console.log( ">>> Serve index.html" ) ;
//      res.sendFile( "index.html" ) ;
// });


// creacio del servidor
// ====================

  var server = app.listen( app.get( 'mPort' ), '192.168.1.123', function () {
//   var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {


     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App LLISCO ('+myVersio+') listening at http://%s:%s', host, port ) ;

} ) ; // server
 
