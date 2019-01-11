oneerror = handleErr;

function handleErr( msg, url, l ) {
   alert( "This page contains some JavaScript" + "\n" +
	  "which unfortunately is not supported by your browser." + "\n" +
	  "We\'ll continue without the fancy graphics." );
   return true;
}

// by Urs Dudli and Peter Gehrig 
// Copyright (c) 2000 Peter Gehrig and Urs Dudli. All rights reserved.
// Additional scripts can be found at http://www.hypergurl.com
// Permission given to use the script provided that this notice remains as is.
// I have modified this accoriding to my conveniance -- Nuruzzaman

var clockid=new Array();
var clockidoutside=new Array();
var i_clock=-1;
var thistime= new Date();
var hours=thistime.getHours();
var minutes=thistime.getMinutes();
var seconds=thistime.getSeconds();
var dnC="PM";
if (eval(hours) <10) {hours="0"+hours}
if (eval(minutes) < 10) {minutes="0"+minutes}
if (seconds < 10) {seconds="0"+seconds}

var thistime = hours+":"+minutes+":"+seconds+" "+dnC;

function writeclock() {
   i_clock++;
   if (document.all || document.getElementById || document.layers) {
      clockid[i_clock]="clock"+i_clock;
      document.write("<span id='"+clockid[i_clock]+"' style='position:relative'>"+thistime+"</span>");
   }
}

function clockon() {
   thistime= new Date();
   hours=thistime.getHours();
   minutes=thistime.getMinutes();
   seconds=thistime.getSeconds();
   if (eval(hours) <10) {hours="0"+hours}
   if (eval(minutes) < 10) {minutes="0"+minutes}
   if (seconds < 10) {seconds="0"+seconds}
    dnC="AM";
    if (hours>=12)
        dnC="PM";
    if (hours>12){
        hours=hours-12;
    }
    if (hours==0)
        hours=12
    thistime = hours+":"+minutes+":"+seconds+" "+dnC;

   if (document.all) {
      for (i=0;i<=clockid.length-1;i++) {
	 var thisclock=eval(clockid[i]);
	 thisclock.innerHTML=thistime;
      }
   }
	
   if (document.getElementById) {
      for (i=0;i<=clockid.length-1;i++) {
	 document.getElementById(clockid[i]).innerHTML=thistime;
      }
   }
   var timer=setTimeout("clockon()",1000);
}

window.onload=clockon;

function toggleDiv( evt, id, flagit ) {

   evt = (evt) ? evt : ( (window.event) ? event : null );

   if( evt ) {

      x = evt.clientX;
      y = evt.clientY;

      if (flagit=="1"){
	     if (document.layers) {
	        tgt = document.layers[id];
	        tgt.style.top = y;
	        tgt.style.left = x + 20;
	        tgt.visibility = "show";
	     }
	     else if (document.all) {
	        tgt = document.all[id];
	        tgt.style.top = y;
	        tgt.style.left = x + 20;
	        tgt.style.visibility = "visible";
	     }
	     else if (document.getElementById) {
	        tgt = document.getElementById(id);
	        tgt.style.top = y;
	        tgt.style.left = x + 20;
	        tgt.style.visibility = "visible";
	     }
      }
      else if (flagit=="0") {
	     if (document.layers) {
	        document.layers[id].visibility = "hide";
	     }
	     else if (document.all) {
	        document.all[id].style.visibility = "hidden";
	     }
	     else if (document.getElementById) {
	        document.getElementById(id).style.visibility = "hidden";
	     }
      }
   }
}

// Script to hide E-mail address from programs which mine pages for addresses.

function write_email() {
   var domain = "jlab.org";
   var name = "nur";
   var address = name + "@" + domain;
   var url = "mailto:" + address;
   document.write( address.link( url ) );
}

// Simple sript to write to the page and also write date.

function sayhi() {
   document.write("Hello World!");
   var now = new Date();
   document.write(now.toLocaleString());
   confirm(now.toLocaleString());
}

// Simple script to write a time appropriate greeting to the page.

function greeting() {
   var now = new Date();
   var hour = now.getHours();
   if( eval(hour) < 12 ) {
      document.write( "Good morning ! " );
   }
   else if( eval(hour) < 18 ) {
      document.write( "Good afternoon ! " );
   }
   else {
      document.write( "Good evening ! " );
   }
}



/*-----------------------------------------
   Today's Date           by Joe Barta
   http://www.pagetutor.com/todaysdate/
 -----------------------------------------*/

var TodaysDateStyle = 17; //pick a style from below

/*---------------------------
Style 1: March 17, 2005
Style 2: Mar 17, 2005

Style 3: 17 March, 2005
Style 4: 17 Mar, 2005

Style 5: Saturday March 17, 2005
Style 6: Sat March 17, 2005
Style 7: Sat Mar 17, 2005

Style 8: Saturday 17 March, 2005
Style 9: Sat 17 March, 2005
Style 10: Sat 17 Mar, 2005

Style 11: 3/17/05
Style 12: 3/17/2005
Style 13: 17/3/05
Style 14: 17/3/2005

Style 15: Saturday March 17
Style 16: Saturday 17 March
Style 17: Saturday, March 17, 2005
----------------------------*/


function WriteTodaysDate(Style) {

var months = new Array();
months[1] = "January";  months[7] = "July";
months[2] = "February"; months[8] = "August";
months[3] = "March";    months[9] = "September";
months[4] = "April";    months[10] = "October";
months[5] = "May";      months[11] = "November";
months[6] = "June";     months[12] = "December";

var months2 = new Array();
months2[1] = "Jan"; months2[7] = "Jul";
months2[2] = "Feb"; months2[8] = "Aug";
months2[3] = "Mar"; months2[9] = "Sep";
months2[4] = "Apr"; months2[10] = "Oct";
months2[5] = "May"; months2[11] = "Nov";
months2[6] = "Jun"; months2[12] = "Dec";

var days = new Array();
days[1] = "Sunday";    days[5] = "Thursday";
days[2] = "Monday";    days[6] = "Friday";
days[3] = "Tuesday";   days[7] = "Saturday";
days[4] = "Wednesday";

var days2 = new Array();
days2[1] = "Sun"; days2[5] = "Thu";
days2[2] = "Mon"; days2[6] = "Fri";
days2[3] = "Tue"; days2[7] = "Sat";
days2[4] = "Wed";

var todaysdate = new Date();
var date  = todaysdate.getDate();
var day  = todaysdate.getDay() + 1;
var month = todaysdate.getMonth() + 1;
var yy = todaysdate.getYear();
var year = (yy < 1000) ? yy + 1900 : yy;
var year2 = year - (2000*1); year2 = (year2 < 10) ? "0" + year2 : year2;

var dateline = new Array();
dateline[1] = months[month] + " " + date + ", " + year;
dateline[2] = months2[month] + " " + date + ", " + year;
dateline[3] = date + " " + months[month] + ", " + year;
dateline[4] = date + " " + months2[month] + ", " + year;
dateline[5] = days[day] + " " + months[month] + " " + date + ", " + year;
dateline[6] = days2[day] + " " + months[month] + " " + date + ", " + year;
dateline[7] = days2[day] + " " + months2[month] + " " + date + ", " + year;
dateline[8] = days[day] + " " + date + " " + months[month] + ", " + year;
dateline[9] = days2[day] + " " + date + " " + months[month] + ", " + year;
dateline[10] = days2[day] + " " + date + " " + months2[month] + ", " + year;
dateline[11] = month + "/" + date + "/" + year2;
dateline[12] = month + "/" + date + "/" + year;
dateline[13] = date + "/" + month + "/" + year2;
dateline[14] = date + "/" + month + "/" + year;
dateline[15] = days[day] + " " + months[month] + " " + date;
dateline[16] = days[day] + " " + date + " " + months[month];
dateline[17] = days[day] + ", " + months[month] + " " + date + ", " + year;

document.write(dateline[Style]);
}


var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")

function getthedate(){
    var mydate=new Date()
    var year=mydate.getYear()
    if (year < 1000)
        year+=1900
        var day=mydate.getDay()
        var month=mydate.getMonth()
        var daym=mydate.getDate()
        if (daym<10)
            daym="0"+daym
            var hours=mydate.getHours()
            var minutes=mydate.getMinutes()
            var seconds=mydate.getSeconds()
            var dn="AM"
            if (hours>=12)
                dn="PM"
                if (hours>12){
                    hours=hours-12
                }
    if (hours==0)
        hours=12
        if (minutes<=9)
            minutes="0"+minutes
            if (seconds<=9)
                seconds="0"+seconds
                //change font size here
                var cdate="<font color='7a7a7a' face='Arial'>"+dayarray[day]+", "+montharray[month]+" "+daym+", "+year+" "+hours+":"+minutes+":"+seconds+" "+dn
                +"</font>"
                if (document.all)
                    document.all.clock.innerHTML=cdate
                    else if (document.getElementById)
                        document.getElementById("clock").innerHTML=cdate
                        else
                            document.write(cdate)
                            }
if (!document.all&&!document.getElementById)
getthedate()
function goforit(){
    if (document.all||document.getElementById)
        setInterval("getthedate()",1000)
        }

