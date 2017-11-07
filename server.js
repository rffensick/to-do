var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var server;


var store = {
	name: {
		id: 0,
		name: 'Eduard',
		rank: 'Middle',
		score: '300'
	},
};

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index');
});


server = app.listen(3000, function() {
	console.error('Server connected');
});