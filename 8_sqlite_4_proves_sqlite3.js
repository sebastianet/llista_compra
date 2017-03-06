
// =============================================================================
// proves de operacions amb una base de dades sqlite3 des nodejs
// despres, posarem les dades en una pagina HTML
// Origen : http://www.w3resource.com/node.js/nodejs-sqlite.php
//          https://docs.cozy.io/en/hack/getting-started/first-app.html

// run it with "node 8_sqlite_4_prova_lectura_des_node.js"
// client access : 
//     display       http://192.168.1.123:4545
//     add           http://192.168.1.123:4545/posar/nou_producte="AAA BBB"
//     delete        http://192.168.1.123:4545/borra/id_producte=4

// sqlite3 api doc : https://github.com/mapbox/node-sqlite3/wiki/API

// =============================================================================
// define our VARS 

var szDades  = '<p>' ;

var express      = require('express');
var app          = express();

var bodyParser   = require( "body-parser" ) ;

var sqlite3 = require('sqlite3').verbose();
var dbfilename = "/home/pi/llisco/my_bbdd/llista_de_la_compra.db";

     app.set( 'mPort', process.env.PORT || 4545 ) ; 
     app.use( bodyParser.urlencoded( { extended:true } ) ) ;

// =============================================================================
// read the data from SQLITE database

console.log( ">>> Anem a fer SELECT");

var mydb = new sqlite3.Database( dbfilename ) ;

mydb.all( "SELECT numid,producte FROM tbl_llisco", function(err, rows) {
        rows.forEach( function (row) {
            console.log( row.numid, row.producte );
            console.log( '=== numid    [' + row.numid + ']' );
            console.log( '=== producte [' + row.producte + ']' );
            szDades += row.producte + '<br>' ;
            console.log( '=== read data [' + szDades + ']' );
        }) ;
    });	
mydb.close();

// =============================================================================
// set the branches to execute depending on client request

// At the root of your website, we show the index.html page
app.get('/', function(req, res) {

//  res.sendfile('./public/index.html')

    console.log( '=== send last data we did read ' + szDades );
    res.status( 200 ).send( szDades ) ; 
});


// ----------------------------------------------------------------------------
// Posar a la BBDD
// URL al client : http://192.168.1.123:4545/posar/nou_producte="AAA BBB"
//                 http://192.168.1.123:4545/posar/nou_producte=patates%20amb%20suc
// Aqui rebem >>> ADD data +++ add ("AAA BBB").

app.get( '/posar/nou_producte=:res_nou_prod', function (req, res) { 

var Producte_Nou = req.params.res_nou_prod ;

    console.log( '>>> afegir (' + Producte_Nou + ').' ) ;

var szRC = '' ;

var my_db = new sqlite3.Database( dbfilename ) ;

my_db.run( "INSERT into tbl_llisco ( producte ) VALUES( ? )", Producte_Nou, function(err) {

    if (err) {
        szRC = '--- insert ERROR' ;
    } else { // err is null if insertion was successful
        szRC = '+++ insert OK - new id is {' + this.lastID + '}' ; // autoincremented
    } ;

    console.log( szRC ) ;

var szOut = 'Hem posat {' + Producte_Nou + '}, status [' + szRC + ']' ;
    res.status( 200 ).send( szOut ) ;

} ) ; // insert

my_db.close();

}); // posar a la BBDD


// ----------------------------------------------------------------------------
// esborrar de la BBDD
// entrada : index
// URL al client : http://192.168.1.123:4545/borra/id_producte=4
// sample : https://docs.cozy.io/en/hack/getting-started/first-app.html

app.get( '/borra/id_producte=:res_id_prod', function (req, res) { 

var id_Producte_esborrar = req.params.res_id_prod ;

    console.log( ">>> esborrar el producte de ID (" + id_Producte_esborrar + ")." ) ;

var szRC = '' ;

var my_db = new sqlite3.Database( dbfilename ) ;

my_db.run( "DELETE FROM tbl_llisco WHERE numid=(?)", [id_Producte_esborrar], function(err) {

    if (err) {
//        console.log(err) ;
        szRC = '--- delete ERROR' ;
    } else {
        szRC = '+++ delete OK' ;
    } ;
    console.log( szRC ) ;

} ) ; // delete

my_db.close();

var szOut = "Hem esborrat el producte de ID {" + id_Producte_esborrar + "}"
    res.status( 200 ).send( szOut ) ;  ;

}); // borra

// =============================================================================
// start the server

var server = app.listen( app.get( 'mPort' ), '192.168.1.123', function () {
// var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {

     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App listening at http://%s:%s', host, port ) ;

} ) ; // server
