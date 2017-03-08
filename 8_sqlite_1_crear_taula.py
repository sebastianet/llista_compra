#!/usr/bin/env python
import sqlite3

# http://sebastianraschka.com/Articles/2014_sqlite_in_python_tutorial.html

# name of the sqlite database file
sqlite_file = './my_bbdd/llista_de_la_compra.db'

# name of the table to be created
table_name = 'tbl_llisco'

# Connecting to the database file
conn = sqlite3.connect(sqlite_file)
cur = conn.cursor()

# Create a new table with 2 columns
cur.execute('CREATE TABLE '+ table_name +' (numid integer PRIMARY KEY AUTOINCREMENT, producte text NOT NULL)')

# Commit changes and close the connection to the database file
conn.commit()
conn.close()
