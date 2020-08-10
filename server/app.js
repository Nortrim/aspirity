const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });

const indexRouter = require('./routes/index');
const trainingsRouter = require('./routes/trainings');

const app = express();
app.disable('etag');

client.connect(function(err, client){
    if(err) return console.log(err);
    app.locals.collection = client.db("bestrunner").collection("trainings");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', indexRouter);
app.use('/api/trainings', trainingsRouter);

module.exports = app;