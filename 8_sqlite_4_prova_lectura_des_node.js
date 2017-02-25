var sqlite3 = require('sqlite3').verbose();
var file = "/home/pi/llisco/my_bbdd/llista_de_la_compra.db";
var db = new sqlite3.Database(file);
db.all("SELECT numid,producte FROM tbl_llisco", function(err, rows) {
        rows.forEach(function (row) {
            console.log( row.numid, row.producte );
        })
    });	
db.close();
