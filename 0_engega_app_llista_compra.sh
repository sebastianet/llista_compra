#!/bin/bash

netstat -ano | grep 3535

mydate=`date +"y%Y/m%m/d%d"`
mytime=`date +"h%H:m%M"`

logFN=/home/pi/logs/llisco.log
szTxt="("$mydate"-"$mytime") +++ +++ +++ LLISCO starts, logging to ("$logFN")."
logger  -i   -p user.info  $szTxt

sudo  /usr/bin/node  /home/pi/llisco/1_llisco.js    >>  $logFN   2>&1   &
echo "LOG at ../logs/llisco.log"
