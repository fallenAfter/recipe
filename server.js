var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var data = require('./data/tempData');

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vdn.api+json'}));
app.use(methodOverride());


//api routes--------------------------------------------------
app.get('/api/recipe', function(req, res){

	res.json(data);
});


//application-------------------------------------------------
app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

app.listen(8080);

console.log("App Running");