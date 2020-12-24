

/************************** Adding Requirements for the project ***************************/
/************************** Setting up the project ***************************************/

var express = require('express');
const bodyParser = require("body-parser");
const mysql=require('mysql');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//Config to access mysql database. Edit this as per the config on your machine.
var pool=mysql.createPool({
    host:'localhost',
    database:'stryde',
    user:'******',
    password:'******'
});

/************************* Setting up the express ******************************************/

var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

/****************************** API *******************************************/

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/get_input.html");
});

/********************** API *************************/

app.post("/removeDuplicates",function (req,res) {

    //The following lines receive the input as a string from the frontend and convert it into JSON object
    var inputString=req.body['inputArray'];
    var jsonObj=JSON.parse(inputString);

    //The array is extracted from the JSON object and converted into set.
    //This automatically removes all the duplicates from the input array.
    var unique_elements=new Set(jsonObj['inputArray ']);

    //An empty array is created to store the unique elements of the array
    var uniqueElementsArray=[];

    //All the elements from the set are pushed into the array.
    // There won't be any duplicates in the array.
    unique_elements.forEach(function(value) {
        uniqueElementsArray.push(value);
    });

    //Storing the array in mysql
    pool.getConnection(function (err,connection) {
        let sql="insert into uniquearrays (array) values ('"+uniqueElementsArray+"');";
        connection.query(sql,function (err,result,fields) {
            if(err)
            {
                console.log(err.stack);
            }
        });
        connection.release();
    });

    //The output is displayed in the form of JSON object
    res.send( {"outputArray": uniqueElementsArray});
});

/***************************** Setting up the API to run on port 8000 ***********/


app.listen(8000,function(req,res)
{
    console.log("Server live on port 8000");
});