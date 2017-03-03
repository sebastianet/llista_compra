
// =============================================================================
// proves de lectura de dades de una base de dades a nodejs
// despres, posarem les dades en una pagina HTML
// Origen : http://www.w3resource.com/node.js/nodejs-sqlite.php
//          https://docs.cozy.io/en/hack/getting-started/first-app.html

// run it with "node 8_sqlite_4_prova_lectura_des_node.js"
// client access : http://192.168.1.123:4545

// =============================================================================
// define our VARS 

var szDades  = '<p>' ;

var express      = require('express');
var app          = express();

var bodyParser   = require( "body-parser" ) ;

     app.set( 'mPort', process.env.PORT || 4545 ) ; 
     app.use( bodyParser.urlencoded( { extended:true } ) ) ;

// =============================================================================
// read the data from SQLITE database
console.log("abans require sqlite3");

var sqlite3 = require('sqlite3').verbose();
// console.log("sqlite3" + sqlite3);
var dbfilename = "/home/pi/llisco/my_bbdd/llista_de_la_compra.db";
var mydb = new sqlite3.Database(dbfilename);

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

    console.log( '=== send data ' + szDades );
    res.status( 200 ).send( szDades ) ; 
});


// Posar a la BBDD
// URL al client : http://192.168.1.123:4545/posar/nou_producte="AAA BBB"
// Aqui rebem === ADD data +++ add ("AAA BBB").

app.get( '/posar/nou_producte=:res_nou_prod', function (req, res) { 

var Producte_Nou = req.params.res_nou_prod ;

var szAdd = '+++ add (' + Producte_Nou + '). ' ;
    console.log( '=== ADD data ' + szAdd ) ;

    res.status( 200 ).send( "posar OK" ) ;  ;

});

// =============================================================================
// start the server

var server = app.listen( app.get( 'mPort' ), '192.168.1.123', function () {
// var server = app.listen( app.get( 'mPort' ), '127.0.0.1', function () {

     var host = server.address().address ;
     var port = server.address().port ;
     console.log( '>>> App listening at http://%s:%s', host, port ) ;

} ) ; // server
