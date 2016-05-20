'use strict';

var express     = require('express');
var path        = require('path');
var serveStatic = require('serve-static');
var bodyParser  = require('body-parser');
var nodemailer  = require('nodemailer');
var stylus      = require('stylus');
var nib         = require('nib');

var app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/css', stylus.middleware({
	src: __dirname + '/stylus',
	dest: __dirname + '/public/css',
	compile: function (str, path) {
		return stylus(str)
			.set('filename', path)
			.set('compress', false)
			.use(nib());
	}
}));

app.use(serveStatic(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index', {
		title: 'Simple Express Site'
	});
});

app.listen(3333);
console.log('Server is running on port 3333...');
