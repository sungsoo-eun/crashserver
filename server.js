var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('diskdb');
db.connect('data', ['crashs']);

var PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(PORT, function(){
 console.log("Express server has started on port 3000")
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(express.static('public'));

// ./router/main.js 파일의 module.exports한 routing 정보를 router 변수에 담는다.
var router = require('./router/main')(app, db);

