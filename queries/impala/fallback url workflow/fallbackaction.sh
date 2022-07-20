#!/bin/bash
hostname
 file=$( echo "filename_$1" )
 echo $file
 hdfs dfs -getmerge "/HiveExports/${file}" "${file}_noheader.txt"
 echo "field1,field2,field3" > "${file}.csv"
 cat "${file}_noheader.txt" | tr "\001" "," >> "${file}.csv"
 rm -f "${file}_noheader.txt"
 echo "Report for $1 is attached." | mutt -a "${file}.csv" -s "Report $1" -- 
bthompson@liveperson.com
 rm -f "${file}.csv"