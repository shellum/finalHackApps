var hulk = require('hulk-hogan');
var app = require('express')();

var dbname = 'nodedb';
var mongodbUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/' + nodedb;
var requestCollection;

require('mongodb').Db.connect(mongodbUri, function (err, db) {
	db.collection('stuff', function (er, collection) {
		requestCollection = collection;
	});
});

var viewDirectory = '/views';
var homePage = 'index.html';
var port = process.env.PORT || 3000;

app.set('views', __dirname + viewDirectory);
app.engine('.html', hulk.__express);

app.post('/:str', function (req, res, next) {
	requestCollection.insert({okay: req.params.str}, function (ee) {
		console.log('err:' + ee);
		res.end();
	});
});

app.get('/', function (req, res, next) {
	requestCollection.find().toArray(function(err, results) {
		res.render(homePage, {time: myTime, count: docCount, text: JSON.stringify(results)});
	});
});

app.listen(port);