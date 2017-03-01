#!/usr/bin/env python
import sqlite3

# conn=sqlite3.connect( '/home/pi/llisco/my_bbdd/llista_de_la_compra.db' )
conn=sqlite3.connect( './my_bbdd/llista_de_la_compra.db' )

curs=conn.cursor()

print "\nEntire database contents, table tbl_llisco:\n"
for row in curs.execute("SELECT * FROM tbl_llisco"):
    print row

conn.close()
