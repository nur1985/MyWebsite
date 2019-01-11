#!/bin/sh
#################################################################
# A shell script to start run for test stand and submit jobs
# to create DSTs
# Nuruzzaman <nur@fnal.gov>, Date Created: 04/22/2016
#
# Please change the about function if you are changing the script.
# Also update the version number.
#################################################################

# Define color and theme for terminal
black='\033[30m'
red='\033[31m'
green='\033[32m'
yellow='\033[33m'
blue='\033[34m'
magenta='\033[35m'
cyan='\033[36m'
white='\033[37m'
reset='\033[39m'
bold='\033[1m'
italic='\033[3m'
underline='\033[4m'
blinking='\x1b[5m'
inverted='\x1b[7m' ## \x1b ~ \033
normal='\033[0m'

USER_NAME=$(whoami)
HOST_NAME=$(hostname)

DEFAULT_FILE="nur_presentations.html"
FILE=${2:-$DEFAULT_FILE}

JLAB_TEMP="nur@login.jlab.org:~/temp"
FNAL_WEB="/publicweb/n/nur"
JLAB_WEB="/userweb/nur/public_html"
#FNAL_WEB="nur@minervagpvm01.fnal.gov:/publicweb/n/nur"
#JLAB_WEB="nur@jlabl1.jlab.org:/userweb/nur/public_html"
COPY_TO_JLAB_TEMP="scp -r *.html $JLAB_TEMP"
COPY_TO_JLAB_WEB="scp -r ~/temp/*.html $JLAB_WEB"
COPY_TO_FNAL_WEB="scp -r $JLAB_TEMP/*.html $FNAL_WEB"
COPY_TO_JLAB_TEMPI="scp ${FILE} $JLAB_TEMP"

echo $USER_NAME@$HOST_NAME


copy_to_jlab_temp_function() {
echo $JLAB_TEMP
echo "Copying files to JLab temp area"
echo $COPY_TO_JLAB_TEMP
$COPY_TO_JLAB_TEMP
}

copy_jlab_temp_to_userweb_function() {
echo "Copying files to JLab web"
echo $COPY_TO_JLAB_WEB
$COPY_TO_JLAB_WEB
}

copy_jlab_temp_to_fermiweb_function() {
echo "Copying files to Fermilab web"
echo $COPY_TO_FNAL_WEB
$COPY_TO_FNAL_WEB
}


copy_to_jlab_temp_function_i() {
echo $JLAB_TEMP
echo "Copying files to JLab temp area"
echo $COPY_TO_JLAB_TEMPI
$COPY_TO_JLAB_TEMPI
}


###########################################
#              Help Function              #
###########################################
help_function() {
clear
echo -e "---------------------------------------------------------------------------"
echo -e "|                      MINERvA Expert Shift Tools                          |"
echo -e "---------------------------------------------------------------------------"
echo -e "A shell script that copy file to web server.";
echo -e "";
echo -e "${underline}[option]${normal}\t${underline}Function${normal}"
echo -e "copy\t\tCopy to JLab temp area"
echo -e "jlab\t\tCopy to JLab userweb area"
echo -e "fnal\t\tCopy to Fermilab web area"
echo -e "copyi\t\tCopy individual file to JLab temp area"
echo -e ""
echo -e "---------------------------------------------------------------------------"
echo -e "source $(basename $BASH_SOURCE) help \t\t# get this help message"
echo -e "source $(basename $BASH_SOURCE) [option] \t# use where appropriate"
echo -e "source $(basename $BASH_SOURCE) copyi FILE_NAME # to copy individual file"
echo -e "---------------------------------------------------------------------------"
echo -e "Please contact ${underline}$EXPERT${normal} for more details and problems."
echo -e "---------------------------------------------------------------------------"
}

###########################################
#          Parameter too execute          #
###########################################
case "$1" in
"help" | "-help" | "--help" | "h" | "-h" | "usage" | "about" | "$nullVariable" )
help_function  # calling function help()
;;
copy)
copy_to_jlab_temp_function
;;
jlab)
copy_jlab_temp_to_userweb_function
;;
fnal)
copy_jlab_temp_to_fermiweb_function
;;
copyi)
copy_to_jlab_temp_function_i
;;
*)
esac
###########################################
