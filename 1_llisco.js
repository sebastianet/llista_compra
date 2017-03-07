
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
//     1.2.b - fix tabulations in "/mostrar"
//     1.2.c - redisseny pagina, funciona boto "lliure"
//     1.2.d - AFEGIR.HTM
//     1.2.e - posar el menu on era, responsive
//     1.2.f - cal instalar BODYPARSER
//     1.2.g - afegit insertar producte 
//     1.2.h - enviem el ID de la BBDD al client (per poder dir quin vol esborrar)
//     1.3.a - enviar JSON(rows)


"use strict";


// moduls que ens calen
// ====================

var express      = require( 'express' ) ;
var app = express() ;

var path         = require( 'path' ) ;
var bodyParser   = require( "body-parser" ) ;                    // npm install body-parser

var sqlite3 = require('sqlite3').verbose();
var dbfilename = "./my_bbdd/llista_de_la_compra.db";

// les meves variables
     var myVersio        = 'v 1.3.a' ;                           // version identifier
     var dbfilename      = "./my_bbdd/llista_de_la_compra.db";   // nom del fitxer amb la BBDD
     var szOut ;
     

// configuracio
// ============

     app.set( 'mPort', process.env.PORT || 3535 ) ;           // save port to use in APP var ; shall use 3535
     app.set( 'appHostname', require('os').hostname() ) ;

// tell Express to load static files (if there any) from public or static folder

     app.use( express.static( path.join( __dirname + '/statics' ) ) ) ;
//     app.use( express.static( __dirname + '/statics' ) ) ;
//     app.use( '/', express.static( __dirname + '/statics' ) ) ;    

// body parse
     app.use( bodyParser.urlencoded( { extended:true } ) ) ;

// log
// by now     app.use( logger( 'dev' ) ) ;                         // tiny (minimal), dev (developer), common (apache)


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

} ; // hhmmss()


// escriure un missatge inicial a la consola
// =========================================

    console.log( '+++ +++ +++ +++ +++ +++ +++ +++ app LLISCO starts. Versio [%s], HN [%s], TimeStamp [%s-%s].',
        myVersio, app.get( 'appHostname' ), (new Date).yyyymmdd(), (new Date).hhmmss() ) ;


// definim les branques a executar segons els que rebem del browser client
// =======================================================================


app.get( "/enric", function (req, res) {

var szEnric  = ' ' ;

     console.log( ">>> /enric : send timestamp" ) ;
     szEnric = 'Hola Enric. ' + myVersio + ' {' + (new Date).hhmmss() + '}' ;
     res.end( "<h1>" + szEnric + "</h1>" ) ;

}); // get /enric


app.get( "/mostrar", function (req, res) {

// read the data from SQLITE database and send some data to client

// cada element de la llista de la compra es posa en un element de una llista, on cadascun es de l'estil :
//     <li> <a href="#" id="containing_element"> Content <input type="hidden" id="key" value="value" /> </a> </li>
// see http://stackoverflow.com/questions/2772103/storing-arbitrary-data-in-html

     console.log( ">>> /mostrar : fer sqlite3 SELECT" ) ;

     var mydb = new sqlite3.Database( dbfilename ) ;

     mydb.all( "SELECT numid,producte FROM tbl_llisco", function(err, rows) { // get data into "rows"

          mydb.close() ;
          if (err) return next(err) ;
          res.json( rows ) ;

     }); // select
    
}); // get /mostrar

 
app.post( "/afegir", function (req, res) {

var szDadesAfegir  = 'OK' ;

     console.log( ">>> /afegir : producte a afegir" ) ;
     res.end( szDadesAfegir ) ;

}); // branca "/afegir"


app.post( "/insertProducte", function (req, res) {

    var szDadesInsertResult  = 'OK' ;

    console.log( '>>> Body posted ' + JSON.stringify( req.body ) ) ; // dump request body

    var New_Prod_Descript = req.body.new_prod_descr ;
    
    var mydb = new sqlite3.Database( dbfilename ) ;
    
    // insertem el producte a comprar  
    console.log( ">>> Anem a insertar el producte" );

    mydb.run( "INSERT INTO tbl_llisco (producte) VALUES (?)", New_Prod_Descript, function(err) {

        if (err) {
            console.log( "Error al insertar " + New_Prod_Descript + '***ERR*** ' + err ) ;
            szDadesInsertResult = '--- Afegir ' + New_Prod_Descript + 'ERROR' ; 
        } else { // err is null if insertion was successful
            console.log( ">>> /insert OK : prod {" + New_Prod_Descript + "} at ID [" + this.lastID + "]." ) ;
            szDadesInsertResult = '+++ Afegir ' + New_Prod_Descript + ' OK' ; 
        };
                   
        console.log( ">>> Llista de la compra : Dades insertades " + New_Prod_Descript ) ;
        console.log( ">>> Llista de la compra : Dades al client " + szDadesInsertResult ) ;

        res.end( szDadesInsertResult ) ; // send to client

        mydb.close();
                    
    });// insert

}); // branca "/insertProducte"


// app.get( "/", function (req, res) {
//      console.log( ">>> Serve index.html" ) ;
//      res.sendFile( "index.html" ) ;
// });


// creacio del servidor
// ====================

// var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {
     var server = app.listen( app.get( 'mPort' ), '192.168.1.123', function () {

     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App LLISCO ('+myVersio+') listening at http://%s:%s', host, port ) ;

} ) ; // server
 
