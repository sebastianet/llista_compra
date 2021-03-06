
//     Aplicacio "llista de la compra"
//     Febrer de 2017.
//     Enrique Sarradell   enricsarra@gmail.com      971.721.514
//     Sebastia Altemir    sebastiasebas@gmail.com   93.639.8522

// per engegar el servidor   :     0_engega_app_llista_compra.sh o "node 1_llisco.js"
// per accedir des un client :     http://192.168.1.123:3535             - des la xarxa de casa meva
//                                 http://IP-EXTERNA:9035                - des el exterior del meu router
//    com saber la meva IP externa ?  https://www.whatismyip.com/        - avui (20170227-00:34) es 81.36.193.172
//    Amb NO-IP :                     http://myraspiodin.hopto.org:9035/

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
//     1.3.b - rebre JSON(rows)
//     1.3.c - click on LI funciona
//     1.3.d - fer servir HOSTNAME per escollir la IP del nostre servidor
//     1.3.e - modificar afegir per no permetre grabar producte en blanc 
//     1.3.f - modificar afegir per blanquejar el camp despres dun insert
//     1.3.g - donar style a la page afegir
//     1.3.h - remove solapes ESBORRAR and LLIURE
//     1.3.i - delete button erases checked items (in the future)
//     1.3.j - mostrar llista de productes "habituals"
//     1.3.k - la pantalla AFEGIR te autofocus en el camp de "input"
//     1.3.l - no-iP
//         


"use strict";


// moduls que ens calen
// ====================

var express      = require( 'express' ) ;
var app = express() ;

var path         = require( 'path' ) ;
var bodyParser   = require( "body-parser" ) ;                    // npm install body-parser

var sqlite3    = require( 'sqlite3' ).verbose();
var dbfilename = "./my_bbdd/llista_de_la_compra.db";

// les meves variables
     var myVersio        = 'v 1.3.l' ;                           // version identifier
     var dbfilename      = "./my_bbdd/llista_de_la_compra.db";   // nom del fitxer amb la BBDD
     var szOut ;
     

// configuracio
// ============

     app.set( 'mPort', process.env.PORT || 3535 ) ;           // save port to use in APP var ; shall use 3535
     app.set( 'appHostname', require('os').hostname() ) ;

// tell Express to load static files (if there any) from public or static folder

     app.use( express.static( path.join( __dirname + '/statics' ) ) ) ;

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


app.get( "/enric", function (req, res) { // per fer proves ...

var szEnric  = ' ' ;

     console.log( ">>> /enric : send timestamp" ) ;
     szEnric = 'Hola Enric. ' + myVersio + ' {' + (new Date).hhmmss() + '}' ;
     res.end( "<h1>" + szEnric + "</h1>" ) ;

}); // get /enric


app.get( "/mostrar", function (req, res, next) { // read the data from SQLITE database and send it to client as JSON

     console.log( ">>> /mostrar : fer sqlite3 SELECT" ) ;

     var mydb = new sqlite3.Database( dbfilename ) ;

     mydb.all( "SELECT numid,producte FROM tbl_llisco", function(err, rows) { // get data into "rows"

          mydb.close() ;
          if (err) return next(err) ;
          res.json( rows ) ;           // send result as JSON

     }); // select
    
}); // get /mostrar

 
app.post( "/afegir", function (req, res) {

var szDadesAfegir  = 'OK' ;

     console.log( ">>> /afegir : producte a afegir" ) ;
     res.end( szDadesAfegir ) ;

}); // post "/afegir"


app.post( "/insertProducte", function (req, res) {

    var szDadesInsertResult  = 'OK' ;

    console.log( '>>> Insert : body posted ' + JSON.stringify( req.body ) ) ; // dump request body

    var New_Prod_Descript = req.body.new_prod_descr ;
    
    var mydb = new sqlite3.Database( dbfilename ) ;
    
    // insertem el producte a comprar  
    console.log( ">>> Anem a insertar el producte [" + New_Prod_Descript + "]." );

    mydb.run( "INSERT INTO tbl_llisco (producte) VALUES (?)", New_Prod_Descript, function(err) {

        if (err) {
            console.log( "--- Error al insertar " + New_Prod_Descript + '***ERR*** ' + err ) ;
            szDadesInsertResult = '--- Afegir {' + New_Prod_Descript + '} ERROR' ; 
        } else { // err is null if insertion was successful
            console.log( "+++ /insert OK : prod {" + New_Prod_Descript + "} at ID [" + this.lastID + "]." ) ;
            szDadesInsertResult = '+++ Afegir {' + New_Prod_Descript + '} OK' ; 
        };
                   
//        console.log( ">>> Llista de la compra : Dades insertades " + New_Prod_Descript ) ;
//        console.log( ">>> Llista de la compra : Dades al client " + szDadesInsertResult ) ;

        res.end( szDadesInsertResult ) ; // send answer to client

        mydb.close();
                    
    }); // sqlite3 insert

}); // post "/insertProducte"



app.post( "/deleteProducte", function (req, res) {

    var szDadesDeleteResult  = 'OK' ;

    console.log( '>>> Delete body posted ' + JSON.stringify( req.body ) ) ; // dump request body

    var Del_producte_Id    = req.body.del_producte_Id ;
    var Del_producte_Descr = req.body.del_producte_Descr ;
    
    var mydb = new sqlite3.Database( dbfilename ) ;
    
    // esborrem el producte a comprar  
    console.log( ">>> Anem a esborrar el producte amb ID {", Del_producte_Id, "}." );

    mydb.run( "DELETE FROM tbl_llisco where numid = " + Del_producte_Id , function(err) {

        if (err) {
            console.log( "--- Error al esborrar " + Del_producte_Descr + '***ERR*** ' + err ) ;
            szDadesDeleteResult = '--- Esborrar {' + Del_producte_Descr + '} ERROR' ; 
        } else { // err is null if insertion was successful
            console.log( "+++ /delete OK : prod {" + Del_producte_Descr + "} at ID [" + Del_producte_Id + "]." ) ;
            szDadesDeleteResult = '+++ Esborrar {' + Del_producte_Descr + '} OK' ; 
        };
                   
//        console.log( ">>> Llista de la compra : Dades esborrades " + Del_producte_Descr ) ;
//        console.log( ">>> Llista de la compra : Dades al client " + szDadesDeleteResult ) ;

        res.end( szDadesDeleteResult ) ; // send to client

        mydb.close();
                    
    });// sqlite3 delete

}); // post "/deleteProducte"


// app.get( "/", function (req, res) {
//      console.log( ">>> Serve index.html" ) ;
//      res.sendFile( "index.html" ) ;
// });


// creacio del servidor
// ====================

var ip_del_Server ;

    if ( app.get( 'appHostname' ) == 'odin' )
    {
        ip_del_Server = '192.168.1.123'    // Raspberry a Torrelles
    } else {
        ip_del_Server = '127.0.0.1'        // resta del mon - local
    } ;


var server = app.listen( app.get( 'mPort' ), ip_del_Server, function () {

     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App LLISCO ('+myVersio+') listening at http://%s:%s', host, port ) ;

} ) ; // server
 
