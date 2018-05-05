
var express = require("express");
var path = require('path');
var app = express();
var ejs=require("ejs");
var bodyparser= require("body-parser");
app.use(express.static(path.join(__dirname,'/public')));
app.set("view engine","ejs");
// app.use('/img',express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join(__dirname, "public")));

// app.use('/static', express.static(path.join(__dirname,'/public'));
var timeout = 500;

app.use(bodyparser.urlencoded({
    extended: true
}));
var userID = 5;
var rpcf=require('./rpcFunction');


var webpage=require('./webPage')(app,rpcf,timeout);
var mobilepage=require('./mobilePage')(app,rpcf,timeout);

app.use('',webpage);
app.use('/m',mobilepage);




app.listen(5000,function(){
    console.log("go");
})
