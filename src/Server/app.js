var express = require('express');
var app = express();
var fs = require('fs');

const bodyParser = require('body-parser')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var server = app.listen('8001', function(){
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/', function(req, res){
    res.send("get call..");
});
app.get('/generateOTP', bodyParser.json(), (req, res)=>{
    console.log(req.query.phone);
    res.status(200).send({"otp": "1234"});
});
app.post('/submit',bodyParser.json(), (req, res)=>{
    console.log(req.body);
    res.status(200).send({"result": "success"});
});

app.get('/getOrphanages', (req, res)=>{
    console.log(req.query.location);
    orphange: [];
    fs.readFile('src/Server/orphanages.json', {encoding: 'utf-8'}, (err, data)=>{
        if (!err) {
            // console.log(JSON.parse(data));
            orphange = JSON.parse(data);
            res.status(200).send({"result": JSON.parse(data)});
        }else{
            console.log(err);
        }
       
    });
});

app.post('/get*data', function(req, res){
    res.send("get call..data fetching...");
});