#!/usr/bin/env python
import sqlite3

# http://sebastianraschka.com/Articles/2014_sqlite_in_python_tutorial.html

# name of the sqlite database file
# sqlite_file = '/home/pi/llisco/my_bbdd/llista_de_la_compra.db'
sqlite_file = './my_bbdd/llista_de_la_compra.db'

# name of the table to be created
table_name = 'tbl_llisco'

new_field = 'col_llisco' # name of the column
field_type = 'TEXT'  # column data type

# Connecting to the database file
conn = sqlite3.connect(sqlite_file)
cur = conn.cursor()

# erase if exists
# remove next line if you dont want to "add" contents
# --- cur.execute( "DROP TABLE IF EXISTS "+table_name )

# Creating a new SQLite table with 1 column
# cur.execute('CREATE TABLE {tn} ({nf} {ft})'\
#         .format(tn=table_name, nf=new_field, ft=field_type))

# Create a new table with 2 columns
cur.execute('CREATE TABLE '+table_name+' (numid integer PRIMARY KEY, producte text NOT NULL)')

# do not fill any data
# cur.execute( "INSERT INTO "+table_name+" VALUES (?)", ("1 Kg de patates",) )
# cur.execute( "INSERT INTO "+table_name+" VALUES (?)", ("4 aguacates",) )

# Committing changes and closing the connection to the database file
conn.commit()
conn.close()
